import { Key, ReactElement, ReactNode, useMemo } from "react";

import { LoadingSpinner } from "../../app/common/loading/LoadingSpinner";
import { IAllStringKeyProps, typedMemo } from "../../types";
import { creditFormat } from "../../utils/creditFormat";
import { numberFormat } from "../../utils/numberFormat";
import { t } from "../../utils/translate";

import styles from "./Table.module.css";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableRow } from "./TableRow";
import { ITableColumnHeader } from "./types";

export interface ITableProps<T> {
	columnDefinitions: ITableColumnHeader<T>[];
	tableData: T[];
	noTableDataMessage?: string;
	keyField: Extract<keyof T, string>;
	loading?: boolean;
	errorMessage?: string;
	striped?: boolean;
	highlightRow?: (row: T) => boolean;
}

export function Table<T extends IAllStringKeyProps>(
	props: ITableProps<T>,
): ReactElement {
	const tableHeader = useMemo(() => {
		return (
			<TableHeader>
				<TableRow>
					{props.columnDefinitions.map((column) => {
						return (
							<TableHeaderCell key={column.keyName} align={column.align}>
								<>{column.label}</>
							</TableHeaderCell>
						);
					})}
				</TableRow>
			</TableHeader>
		);
	}, [props.columnDefinitions]);

	return (
		<table className={styles.table}>
			{tableHeader}

			<TableBody striped={props.striped}>
				{props.loading ? (
					<TableRow>
						<TableCell colspan={props.columnDefinitions.length}>
							<LoadingSpinner />
						</TableCell>
					</TableRow>
				) : props.errorMessage ? (
					<TableRow>
						<TableCell colspan={props.columnDefinitions.length}>
							<>{props.errorMessage}</>
						</TableCell>
					</TableRow>
				) : props.tableData.length === 0 ? (
					<TableRow>
						<TableCell colspan={props.columnDefinitions.length}>
							<>{props.noTableDataMessage ?? t("No data.")}</>
						</TableCell>
					</TableRow>
				) : (
					props.tableData.map((rowData) => {
						return (
							<StandardRow<T>
								key={rowData[props.keyField] as Key}
								rowData={rowData}
								keyField={props.keyField}
								columnDefinitions={props.columnDefinitions}
								highlight={props.highlightRow?.(rowData)}
							/>
						);
					})
				)}
			</TableBody>
		</table>
	);
}

interface IStandardRowProps<T>
	extends Pick<ITableProps<T>, "keyField" | "columnDefinitions"> {
	rowData: T;
	highlight?: boolean;
}

// Memoize each row to save on re-render performance.
const StandardRow = typedMemo(function StandardRow<
	T extends IAllStringKeyProps,
>(props: IStandardRowProps<T>): ReactElement {
	return (
		<TableRow highlight={props.highlight}>
			{props.columnDefinitions.map((column) => {
				return (
					<TableCell key={column.keyName} align={column.align}>
						{column.customElementFormat
							? column.customElementFormat(props.rowData)
							: column.customFormat
							? column.customFormat(props.rowData)
							: column.format !== undefined
							? formatValue(column.format, props.rowData[column.keyName])
							: (props.rowData[column.keyName] as ReactNode)}
					</TableCell>
				);
			})}
		</TableRow>
	);
});

function formatValue(
	format: ITableColumnHeader<unknown>["format"],
	value: unknown,
): ReactNode {
	if (typeof value === "number") {
		if (format === "credits") {
			return creditFormat(value);
		}
		if (format === "number") {
			return numberFormat(value);
		}
	}

	// TODO: handle date formatting.

	return value as ReactNode;
}
