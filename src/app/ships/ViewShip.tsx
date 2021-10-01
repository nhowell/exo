import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { t } from "../../helpers/translate";
import { useMyShip } from "../../spacetraders-api/hooks/my/ships/useMyShip";
import { ShipStatus } from "./ShipStatus";
import { Table } from "../../core/table/Table";
import { IShipCargo } from "../../spacetraders-api/api/my/ships/types";
import { ITableColumnHeader } from "../../core/table/types";
import { Tile } from "../common/tiles/Tile";
import { Tag } from "../common/Tag";
import commonStyles from "../common/common.module.css";
import { ShipAttributes } from "./ShipAttributes";
import { titleCase } from "../../helpers/titleCase";

interface IRouteParams {
	shipId: string;
}

interface ICargoGrid extends IShipCargo {
	volumePerUnit: number;
}

const cargoColumnDefinitions: ITableColumnHeader<ICargoGrid>[] = [
	{
		keyname: "good",
		label: "Good",
		customFormat: (x) => t(titleCase(x.good)),
	},
	{
		keyname: "volumePerUnit",
		label: "Volume per Unit",
		align: "right",
		format: "number",
	},
	{
		keyname: "totalVolume",
		label: "Total Volume",
		align: "right",
		format: "number",
	},
	{
		keyname: "quantity",
		label: "Quanity",
		align: "right",
		format: "number",
	},
];

export function ViewShip(): ReactElement {
	const { shipId } = useParams<IRouteParams>();

	const { isLoading, isError, error, data } = useMyShip(shipId);

	const ship = data?.ship;

	const cargoGrid = useMemo(
		() => (ship ? mapCargoToCargoGrid(ship.cargo) : []),
		[ship],
	);

	return (
		<>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || ship === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<>
					<header>
						<h1>
							{ship.manufacturer} {ship.class} <Tag text={ship.type} />
						</h1>
					</header>

					<aside className={commonStyles.floatRight}>
						<Tile>
							<ShipAttributes ship={ship} />
						</Tile>
					</aside>

					<p>
						<ShipStatus
							location={ship.location}
							flightPlanId={ship.flightPlanId}
						/>
						.
					</p>

					<h2 className={commonStyles.clear}>{t("Cargo")}</h2>
					{cargoGrid.length === 0 ? (
						<p>{t("Cargo hold is empty.")}</p>
					) : (
						<Table<ICargoGrid>
							keyField="good"
							columnDefinitions={cargoColumnDefinitions}
							tableData={cargoGrid}
							striped
						/>
					)}
				</>
			)}
		</>
	);
}

function mapCargoToCargoGrid(cargo: IShipCargo[]): ICargoGrid[] {
	return cargo.map((x) => ({
		...x,
		volumePerUnit: x.totalVolume / x.quantity,
	}));
}
