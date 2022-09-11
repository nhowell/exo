import { ReactElement } from "react";
import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import { boolToHumanDisplay } from "../../../helpers/boolToHumanDisplay";
import { createNumberFormatter } from "../../../helpers/numberFormat";
import { titleCase } from "../../../helpers/titleCase";
import { t } from "../../../helpers/translate";
import {
	IStructure,
	IStructureMaterial,
} from "../../../spacetraders-api/api/structures/types";

interface IOwnProps {
	structure: IStructure;
}

const materialsColumnDefinitions: ITableColumnHeader<IStructureMaterial>[] = [
	{
		keyname: "good",
		label: t("Good"),
		customFormat: (item) => t(titleCase(item.good)),
	},
	{
		keyname: "quantity",
		label: t("Quantity"),
		align: "right",
		format: "number",
	},
	{
		keyname: "targetQuantity",
		label: t("Target Quantity"),
		align: "right",
		format: "number",
	},
];

const stabilityPercentFormat = createNumberFormatter({
	style: "percent",
	decimalPlaces: 3,
});

export function Structure(props: IOwnProps): ReactElement {
	return (
		<>
			<h3>{t(props.structure.name)}</h3>

			<dl>
				<div>
					<dt>{t("Completed")}:</dt>
					<dd>{boolToHumanDisplay(props.structure.completed)}</dd>
				</div>
				<div>
					<dt>{t("Stability")}:</dt>
					<dd>{stabilityPercentFormat(props.structure.stability)}</dd>
				</div>
			</dl>

			<h4>{t("Materials")}</h4>

			<Table<IStructureMaterial>
				keyField="good"
				columnDefinitions={materialsColumnDefinitions}
				tableData={props.structure.materials}
				striped
			/>
		</>
	);
}
