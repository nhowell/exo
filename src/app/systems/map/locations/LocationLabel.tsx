import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ReactElement, useRef } from "react";
import { Mesh } from "three";

import { Tag } from "@/components/Tag";

interface IOwnProps {
	radius: number;
	symbol: string;
	name: string;
}

export function LocationLabel(props: IOwnProps): ReactElement {
	// This reference will give us direct access to the mesh
	const mesh = useRef<Mesh>(null);

	useFrame(({ camera }) => {
		if (!mesh.current) return;
		// Make text face the camera
		mesh.current.quaternion.copy(camera.quaternion);
	});

	return (
		<mesh ref={mesh}>
			<Html scale={0.7} position={[0, props.radius + 1, 0]} transform occlude>
				<h2 style={{ textAlign: "center", margin: 0 }}>
					<Tag text={props.symbol} />
					<br />
					{props.name}
				</h2>
			</Html>
		</mesh>
	);
}
