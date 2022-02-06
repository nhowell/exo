import { MapControls, OrthographicCamera, Stars } from "@react-three/drei";
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
			<OrthographicCamera makeDefault zoom={4} position={[0, 0, 500]} />
			<gridHelper args={[200, 10, `white`, `gray`]} />
			<axesHelper />
			<ambientLight intensity={0.1} />
			<pointLight position={[10, 10, 10]} />
			<Stars />
			{data.locations.map((location) => (
				<Sphere key={location.symbol} position={[location.x, location.y, 0]} />
			))}
			<MapControls />
		</Canvas>
	);
}
