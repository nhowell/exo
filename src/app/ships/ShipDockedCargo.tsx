import { ReactElement, useMemo } from "react";
import { Table } from "../../core/table/Table";
import { ITableColumnHeader } from "../../core/table/types";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { Good } from "../../spacetraders-api/api/enums";
import { IMarketplaceListing } from "../../spacetraders-api/api/locations/types";
import {
	IMyDockedShip,
	IShipCargo,
} from "../../spacetraders-api/api/my/ships/types";
import { useMarketplaceAtLocation } from "../../spacetraders-api/hooks/locations/useMarketplaceAtLocation";

interface IOwnProps {
	ship: IMyDockedShip;
}

interface IGrid extends Partial<IMarketplaceListing> {
	good: Good;
	quantityOwned?: number;
	totalVolume?: number;
}

const cargoColumnDefinitions: ITableColumnHeader<IGrid>[] = [
	{
		keyname: "good",
		label: t("Good"),
		customFormat: (x) => t(titleCase(x.good)),
	},
	{
		keyname: "purchasePricePerUnit",
		label: t("Purchase Price per Unit"),
		align: "right",
		format: "credits",
	},
	{
		keyname: "quantityAvailable",
		label: t("Quantity Available"),
		align: "right",
		format: "number",
	},
	{
		keyname: "sellPricePerUnit",
		label: t("Sell Price per Unit"),
		align: "right",
		format: "credits",
	},
	{
		keyname: "quantityOwned",
		label: t("Quantity Owned"),
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

export function ShipDockedCargo(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useMarketplaceAtLocation(
		props.ship.location,
	);

	const grid = useMemo(
		() => (data ? mapToGrid(props.ship.cargo, data.marketplace) : []),
		[data, props.ship.cargo],
	);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : grid.length === 0 ? (
		<p>{t("Cargo hold is empty and no marketplace listings available.")}</p>
	) : (
		<Table<IGrid>
			keyField="good"
			columnDefinitions={cargoColumnDefinitions}
			tableData={grid}
			striped
		/>
	);
}

function mapToGrid(
	cargo: IShipCargo[],
	marketplaceListings: IMarketplaceListing[],
): IGrid[] {
	const rows = marketplaceListings.map<IGrid>((x) => ({
		...x,
		good: x.symbol,
	}));

	for (const cargoItem of cargo) {
		const existingRow = rows.find((x) => x.symbol === cargoItem.good);

		if (existingRow === undefined) {
			rows.push({
				...cargoItem,
				volumePerUnit: cargoItem.totalVolume / cargoItem.quantity,
			});
		} else {
			existingRow.quantityOwned = cargoItem.quantity;
			existingRow.totalVolume = cargoItem.totalVolume;
			existingRow.volumePerUnit = cargoItem.totalVolume / cargoItem.quantity;
		}
	}

	return rows;
}
