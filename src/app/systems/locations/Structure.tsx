import { ReactElement } from "react";
import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import { createNumberFormatter } from "../../../helpers/numberFormat";
import { t } from "../../../helpers/translate";
import {
	IStructure,
	IStructureMaterial,
} from "../../../spacetraders-api/api/game/locations/types";

interface IOwnProps {
	structure: IStructure;
}

const materialsColumnDefinitions: ITableColumnHeader<IStructureMaterial>[] = [
	{
		keyname: "good",
		label: "Good",
	},
	{
		keyname: "quantity",
		label: "Quantity",
		align: "right",
		format: "number",
	},
	{
		keyname: "targetQuantity",
		label: "Target Quantity",
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
			<h3>{props.structure.name}</h3>

			<dl>
				<div>
					<dt>{t("Completed")}:</dt>
					<dd>{props.structure.completed ? t("Yes") : t("No")}</dd>
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
