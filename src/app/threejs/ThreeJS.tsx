import { MapControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import { t } from "../../helpers/translate";
import { useLocationsInSystem } from "../../spacetraders-api/hooks/systems/useLocationsInSystem";
import { STARTER_SYSTEM } from "../systems/useVisitedSystems";
import { Sphere } from "./Sphere";

export function ThreeJS(): ReactElement {
	const { isLoading, isError, error, data } =
		useLocationsInSystem(STARTER_SYSTEM);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : (
		<Canvas>
			<PerspectiveCamera
				makeDefault
				zoom={1}
				position={[0, 200, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				far={100000}
			/>
			<color attach="background" args={["black"]} />
			<polarGridHelper args={[120, 8, 12, 64, "#0d1c3c", "#0d1c3c"]} />
			<ambientLight intensity={0.05} />
			<pointLight position={[0, 0, 0]} />
			<Stars
				radius={10000}
				depth={5000}
				count={5000}
				factor={150}
				saturation={0.5}
			/>
			{data.locations.map((location) => (
				<Sphere key={location.symbol} position={[location.x, 0, -location.y]} />
			))}
			<MapControls
				maxPolarAngle={Math.PI / 2}
				minDistance={5}
				maxDistance={300}
			/>
		</Canvas>
	);
}
