import { MapControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import { LocationType } from "../../../spacetraders-api/api/enums";
import { ILocation } from "../../../spacetraders-api/api/locations/types";
import { useLocationsInSystem } from "../../../spacetraders-api/hooks/systems/useLocationsInSystem";
import { Unknown } from "./locations/Unknown";
import { Planet } from "./locations/Planet";
import { Moon } from "./locations/Moon";
import { GasGiant } from "./locations/GasGiant";
import { Asteroid } from "./locations/Asteroid";
import { Wormhole } from "./locations/Wormhole";

interface IOwnProps {
	systemSymbol: string;
}

export function SystemMap(props: IOwnProps): ReactElement {
	const result = useLocationsInSystem(props.systemSymbol);

	return (
		<Canvas style={{ zIndex: 1 }}>
			<PerspectiveCamera
				makeDefault
				zoom={1}
				position={[0, 60, 190]}
				far={100000}
			/>
			<color attach="background" args={["black"]} />
			<polarGridHelper args={[120, 8, 12, 64, 0x101f48, 0x101f48]} />
			<ambientLight intensity={0.1} />
			<pointLight position={[0, 0, 0]} />
			<Stars
				radius={10000}
				depth={5000}
				count={5000}
				factor={150}
				saturation={0.5}
			/>
			<MapControls
				maxPolarAngle={Math.PI / 2}
				minDistance={5}
				maxDistance={300}
			/>

			{result.data?.locations.map(renderLocation)}
		</Canvas>
	);
}

function renderLocation(location: ILocation) {
	const LocationComponent = getLocationTypeComponent(location.type);

	return (
		<LocationComponent
			key={location.symbol}
			position={[location.x, 0, -location.y]}
			symbol={location.symbol}
			name={location.name}
		/>
	);
}

function getLocationTypeComponent(locationType: LocationType) {
	switch (locationType) {
		case LocationType.Asteroid:
			return Asteroid;

		case LocationType.GasGiant:
			return GasGiant;

		case LocationType.Moon:
			return Moon;

		case LocationType.Planet:
			return Planet;

		case LocationType.Wormhole:
			return Wormhole;

		default:
			return Unknown;
	}
}
