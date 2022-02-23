import { ReactElement } from "react";
import { Html } from "@react-three/drei";
import { Tag } from "../../../common/Tag";

interface IOwnProps {
	radius: number;
	symbol: string;
	name: string;
}

export function LocationLabel(props: IOwnProps): ReactElement {
	return (
		<mesh>
			<Html
				scale={0.7}
				rotation={[0, 0, 0]}
				position={[0, props.radius + 0.7, 0]}
				transform
				occlude
			>
				<h2 style={{ textAlign: "center" }}>
					<Tag text={props.symbol} />
					<br />
					{props.name}
				</h2>
			</Html>
		</mesh>
	);
}
