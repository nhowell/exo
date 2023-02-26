import classNames from "classnames";
import { ReactElement } from "react";

import coreStyles from "../shared.module.css";

import tableCellStyles from "./TableCell.module.css";
import styles from "./TableHeaderCell.module.css";
import { ITableColumnHeader } from "./types";

interface IOwnProps extends Pick<ITableColumnHeader<unknown>, "align"> {
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
