import { ReactElement } from "react";

import styles from "./TableRow.module.css";

interface IOwnProps {
	children: ReactElement | ReactElement[];
	highlight?: boolean;
}

export function TableRow(props: IOwnProps): ReactElement {
	return (
		<tr className={props.highlight ? styles.highlight : undefined}>
			{props.children}
		</tr>
	);
}
