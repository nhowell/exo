import { ReactElement, useState } from "react";

import { LinkButton } from "@/core/buttons/LinkButton";
import { Table } from "@/core/table/Table";
import { ITableColumnHeader } from "@/core/table/types";
import {
	IStructure,
	IStructureMaterial,
} from "@/spacetraders-api/api/structures/types";
import { boolToHumanDisplay } from "@/utils/boolToHumanDisplay";
import { createNumberFormatter } from "@/utils/numberFormat";
import { titleCase } from "@/utils/titleCase";
import { t } from "@/utils/translate";

import { ActionButtons } from "../../common/ActionButtons";

import { DepositGoods } from "./DepositGoods";

interface IOwnProps {
	structure: IStructure;
	locationSymbol: string;
}

const materialsColumnDefinitions: ITableColumnHeader<IStructureMaterial>[] = [
	{
		keyName: "good",
		label: t("Good"),
		customFormat: (item) => t(titleCase(item.good)),
	},
	{
		keyName: "quantity",
		label: t("Quantity"),
		align: "right",
		format: "number",
	},
	{
		keyName: "targetQuantity",
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
	const [showDepositGoods, setShowDepositGoods] = useState(false);

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

			{showDepositGoods ? (
				<DepositGoods
					structure={props.structure}
					locationSymbol={props.locationSymbol}
					onCancel={() => setShowDepositGoods(false)}
				/>
			) : (
				<ActionButtons>
					<LinkButton onClick={() => setShowDepositGoods(true)}>
						{t("Deposit goods")}
					</LinkButton>
				</ActionButtons>
			)}
		</>
	);
}
