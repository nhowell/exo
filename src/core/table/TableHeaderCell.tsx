import { ReactElement } from "react";
import { ITableColumnHeader } from "./types";
import coreStyles from "../core.module.css";
import classNames from "classnames";
import tableCellStyles from "./TableCell.module.css";
import styles from "./TableHeaderCell.module.css";

interface IOwnProps extends Pick<ITableColumnHeader<any>, "align"> {
	children: ReactElement;
}

export function TableHeaderCell({
	align = "left",
	children,
}: IOwnProps): ReactElement {
	return (
		<th
			className={classNames(
				styles.headerCell,
				tableCellStyles.padding,
				align === "left" && coreStyles.textAlignLeft,
				align === "right" && coreStyles.textAlignRight,
				align === "center" && coreStyles.textAlignCenter,
			)}
		>
			{children}
		</th>
	);
}
