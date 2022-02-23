import { useFrame } from "@react-three/fiber";
import { ReactElement, useRef, useState } from "react";
import { Mesh } from "three";
import { LocationLabel } from "./LocationLabel";
import { ILocationProps } from "./types";

export function Unknown(props: ILocationProps): ReactElement {
	// This reference will give us direct access to the mesh
	const mesh = useRef<Mesh>(null!);

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame(() => (mesh.current.rotation.y += 0.01));

	const radius = 1;

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<group position={props.position}>
			<mesh
				ref={mesh}
				scale={active ? 1.2 : 1}
				onClick={() => setActive(!active)}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
			>
				<sphereGeometry args={[radius, 20, 15]} />
				<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
			</mesh>
			<LocationLabel radius={radius} symbol={props.symbol} name={props.name} />
		</group>
	);
}
