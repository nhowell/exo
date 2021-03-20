import React, { ReactElement, useMemo } from "react";
import { IAllStringKeyProps, ITableColumnHeader } from "./types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableCell } from "./TableCell";
import { creditFormat } from "../../helpers/creditFormat";
import { numberFormat } from "../../helpers/numberFormat";
import styles from "./Table.module.css";
import { typedMemo } from "../../utilities/types";
import { LoadingSpinner } from "../../app/common/loading/LoadingSpinner";
import { t } from "../../helpers/translate";

export interface ITableProps<T> {
	columnDefinitions: ITableColumnHeader<T>[];
	tableData: T[];
	noTableDataMessage?: string;
	keyField: Extract<keyof T, string>;
	loading?: boolean;
	errorMessage?: string;
	striped?: boolean;
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
							<TableHeaderCell key={column.keyname} align={column.align}>
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
								key={rowData[props.keyField]}
								rowData={rowData}
								keyField={props.keyField}
								columnDefinitions={props.columnDefinitions}
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
}

// Memoize each row to save on re-render performance.
const StandardRow = typedMemo(function StandardRow<
	T extends IAllStringKeyProps
>(props: IStandardRowProps<T>): ReactElement {
	return (
		<TableRow>
			{props.columnDefinitions.map((column) => {
				return (
					<TableCell key={column.keyname} align={column.align}>
						{column.customElementFormat
							? column.customElementFormat(props.rowData)
							: column.customFormat
							? column.customFormat(props.rowData)
							: column.format !== undefined
							? formatValue(column.format, props.rowData[column.keyname])
							: props.rowData[column.keyname]}
					</TableCell>
				);
			})}
		</TableRow>
	);
});

function formatValue(format: ITableColumnHeader<any>["format"], value: any) {
	switch (format) {
		case "credits":
			return creditFormat(value);

		case "number":
			return numberFormat(value);

		// TODO: handle date formatting.

		default:
			return value;
	}
}
