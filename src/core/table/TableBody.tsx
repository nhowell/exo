import classNames from "classnames";
import { ReactElement } from "react";
import { ITableProps } from "./Table";
import styles from "./TableBody.module.css";

interface IOwnProps extends Pick<ITableProps<unknown>, "striped"> {
	children: ReactElement | ReactElement[];
}

export function TableBody(props: IOwnProps): ReactElement {
	return (
		<tbody className={classNames(props.striped && styles.striped)}>
			{props.children}
		</tbody>
	);
}
