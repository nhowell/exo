import { useFrame, Vector3 } from "@react-three/fiber";
import { ReactElement, useRef, useState } from "react";
import { Mesh } from "three";

interface IOwnProps {
	position: Vector3;
}

export function Box(props: IOwnProps): ReactElement {
	// This reference will give us direct access to the mesh
	const mesh = useRef<Mesh>(null!);

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1 : 0.5}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<sphereGeometry args={[1, 40, 30]} />
			<meshToonMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
