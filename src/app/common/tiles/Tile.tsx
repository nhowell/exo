import { ReactNode } from "react";
import styles from "./Tile.module.css";

interface IOwnProps {
	children: ReactNode;
	padding?: "small";
	width?: string;
}

export function Tile(props: IOwnProps) {
	return (
		<div className={styles.tile} style={{ width: props.width }}>
			{props.children}
		</div>
	);
}
