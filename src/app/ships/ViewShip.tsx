import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { t } from "../../helpers/translate";
import { useShip } from "../../spacetraders-api/hooks/users/ships/useShip";
import styles from "./ViewShip.module.css";
import { ShipStatus } from "./ShipStatus";
import { numberFormat } from "../../helpers/numberFormat";
import { Table } from "../../core/table/Table";
import { IShipCargo } from "../../spacetraders-api/api/users/ships/types";
import { ITableColumnHeader } from "../../core/table/types";
import { Tile } from "../common/tiles/Tile";
import { Tag } from "../common/Tag";

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
					<aside className={styles.info}>
						<Tile>
							<strong>{t("Speed")}:</strong> {ship.speed}
							<br />
							<strong>{t("Max Cargo")}:</strong> {numberFormat(ship.maxCargo)}
							<br />
							<strong>{t("Weapons")}:</strong> {ship.weapons}
							<br />
							<strong>{t("Plating")}:</strong> {ship.plating}
						</Tile>
					</aside>

					<h1>
						{ship.manufacturer} {ship.class} <Tag text={ship.type} />
					</h1>

					<p>
						<ShipStatus
							location={ship.location}
							flightPlanId={ship.flightPlanId}
						/>
						.
					</p>

					<h2>{t("Cargo")}</h2>
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
