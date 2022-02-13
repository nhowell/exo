import { MapControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import { LocationType } from "../../../spacetraders-api/api/enums";
import { ILocation } from "../../../spacetraders-api/api/locations/types";
import { useLocationsInSystem } from "../../../spacetraders-api/hooks/systems/useLocationsInSystem";
import { Sphere } from "./objects/Sphere";
import { Planet } from "./objects/Planet";
import { Moon } from "./objects/Moon";
import { GasGiant } from "./objects/GasGiant";
import { Asteroid } from "./objects/Asteroid";
import { Wormhole } from "./objects/Wormhole";
import { QueryResultHandler } from "../../common/QueryResultHandler";

interface IOwnProps {
	systemSymbol: string;
}

export function SystemMap(props: IOwnProps): ReactElement {
	const result = useLocationsInSystem(props.systemSymbol);

	return (
		<QueryResultHandler queryResult={result}>
			{(data) => (
				<Canvas>
					<PerspectiveCamera
						makeDefault
						zoom={1}
						position={[0, 200, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
						far={100000}
					/>
					<color attach="background" args={["black"]} />
					<polarGridHelper args={[120, 8, 12, 64, "#030712", "#030712"]} />
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
					{data.locations.map(renderLocation)}
				</Canvas>
			)}
		</QueryResultHandler>
	);
}

function renderLocation(location: ILocation) {
	switch (location.type) {
		case LocationType.Asteroid:
			return (
				<Asteroid
					key={location.symbol}
					position={[location.x, 0, -location.y]}
				/>
			);

		case LocationType.GasGiant:
			return (
				<GasGiant
					key={location.symbol}
					position={[location.x, 0, -location.y]}
				/>
			);

		case LocationType.Moon:
			return (
				<Moon key={location.symbol} position={[location.x, 0, -location.y]} />
			);

		case LocationType.Planet:
			return (
				<Planet key={location.symbol} position={[location.x, 0, -location.y]} />
			);

		case LocationType.Wormhole:
			return (
				<Wormhole
					key={location.symbol}
					position={[location.x, 0, -location.y]}
				/>
			);

		default:
			return (
				<Sphere key={location.symbol} position={[location.x, 0, -location.y]} />
			);
	}
}
