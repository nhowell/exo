import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Tile.module.css";

interface IOwnProps {
	children: ReactNode;
	padding?: "small";
	width?: string;
	linkTo?: string;
}

export function Tile(props: IOwnProps) {
	if (props.linkTo) {
		return (
			<NavLink
				to={props.linkTo}
				className={styles.tile}
				style={{ width: props.width }}
			>
				{props.children}
			</NavLink>
		);
	}

	return (
		<div className={styles.tile} style={{ width: props.width }}>
			{props.children}
		</div>
	);
}
