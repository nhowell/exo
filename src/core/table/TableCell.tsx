import { ReactElement, ReactNode } from "react";
import { ITableColumnHeader } from "./types";
import coreStyles from "../core.module.css";
import classNames from "classnames";
import styles from "./TableCell.module.css";

interface IOwnProps extends Pick<ITableColumnHeader<unknown>, "align"> {
	children: ReactNode;
	colspan?: number;
}

export function TableCell({
	align = "left",
	...props
}: IOwnProps): ReactElement {
	return (
		<td
			colSpan={props.colspan}
			className={classNames(
				styles.padding,
				align === "left" && coreStyles.textAlignLeft,
				align === "center" && coreStyles.textAlignCenter,
				align === "right" && coreStyles.textAlignRight,
			)}
		>
			{props.children}
		</td>
	);
}
