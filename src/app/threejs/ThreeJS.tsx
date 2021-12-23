import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import { Box } from "./Box";

export function ThreeJS(): ReactElement {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-1.2, 0, 0]} />
			<Box position={[1.2, 0, 0]} />
		</Canvas>
	);
}
