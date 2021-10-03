import { ReactElement, useMemo } from "react";
import { Table } from "../../core/table/Table";
import { ITableColumnHeader } from "../../core/table/types";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IMyShip, IShipCargo } from "../../spacetraders-api/api/my/ships/types";

interface IOwnProps {
	ship: IMyShip;
}

interface ICargoGrid extends IShipCargo {
	volumePerUnit: number;
}

const columnDefinitions: ITableColumnHeader<ICargoGrid>[] = [
	{
		keyname: "good",
		label: t("Good"),
		customFormat: (x) => t(titleCase(x.good)),
	},
	{
		keyname: "quantity",
		label: t("Quantity"),
		align: "right",
		format: "number",
	},
	{
		keyname: "volumePerUnit",
		label: t("Volume per Unit"),
		align: "right",
		format: "number",
	},
	{
		keyname: "totalVolume",
		label: t("Total Volume"),
		align: "right",
		format: "number",
	},
];

export function ShipInFlightCargo(props: IOwnProps): ReactElement {
	const cargoGrid = useMemo(
		() => (props.ship ? mapCargoToCargoGrid(props.ship.cargo) : []),
		[props.ship],
	);

	return cargoGrid.length === 0 ? (
		<p>{t("Cargo hold is empty.")}</p>
	) : (
		<Table<ICargoGrid>
			keyField="good"
			columnDefinitions={columnDefinitions}
			tableData={cargoGrid}
			striped
		/>
	);
}

function mapCargoToCargoGrid(cargo: IShipCargo[]): ICargoGrid[] {
	return cargo.map((x) => ({
		...x,
		volumePerUnit: x.totalVolume / x.quantity,
	}));
}
