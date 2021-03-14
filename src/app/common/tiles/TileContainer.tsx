import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./TileContainer.module.css";

interface IOwnProps {
	children: ReactNode;
	center?: boolean;
}

export function TileContainer(props: IOwnProps) {
	return (
		<div
			className={classNames(
				styles.tileContainer,
				props.center && styles.center,
			)}
		>
			{props.children}
		</div>
	);
}
