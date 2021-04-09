import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { t } from "../../helpers/translate";
import { useShip } from "../../spacetraders-api/hooks/users/ships/useShip";
import { ShipStatus } from "./ShipStatus";
import { numberFormat } from "../../helpers/numberFormat";
import { Table } from "../../core/table/Table";
import { IShipCargo } from "../../spacetraders-api/api/users/ships/types";
import { ITableColumnHeader } from "../../core/table/types";
import { Tile } from "../common/tiles/Tile";
import { Tag } from "../common/Tag";
import commonStyles from "../common/common.module.css";

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

	const { isLoading, isError, error, data } = useShip(shipId);

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
							<dl>
								<div>
									<dt>{t("Max Cargo")}:</dt>
									<dd>{numberFormat(ship.maxCargo)}</dd>
								</div>
								<div>
									<dt>{t("Speed")}:</dt>
									<dd>{ship.speed}</dd>
								</div>
								<div>
									<dt>{t("Weapons")}:</dt>
									<dd>{ship.weapons}</dd>
								</div>
								<div>
									<dt>{t("Plating")}:</dt>
									<dd>{ship.plating}</dd>
								</div>
							</dl>
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
