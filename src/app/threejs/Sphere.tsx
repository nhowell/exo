import { useFrame, Vector3 } from "@react-three/fiber";
import { ReactElement, useRef, useState } from "react";
import { Mesh } from "three";

interface IOwnProps {
	position: Vector3;
}

export function Sphere(props: IOwnProps): ReactElement {
	// This reference will give us direct access to the mesh
	const mesh = useRef<Mesh>(null!);

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (mesh.current.rotation.y += 0.01));

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.2 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<sphereGeometry args={[1, 20, 15]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
