import { ReactElement, useMemo } from "react";
import { t } from "../../../helpers/translate";
import { useDockedShipsAtLocation } from "../../../spacetraders-api/hooks/locations/useDockedShipsAtLocation";
import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import { IDockedShip } from "../../../spacetraders-api/api/locations/types";
import { sortBy } from "lodash";

interface IOwnProps {
	locationSymbol: string;
}

const dockedShipsColumnDefinitions: ITableColumnHeader<IDockedShip>[] = [
	{
		keyname: "username",
		label: t("Username"),
	},
	{
		keyname: "shipType",
		label: t("Ship Type"),
	},
];

export function LocationDockedShips(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useDockedShipsAtLocation(
		props.locationSymbol,
	);

	const sortedShips = useMemo(() => {
		if (data === undefined) {
			return [];
		}

		return sortShips(data.ships);
	}, [data]);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : sortedShips.length === 0 ? (
		<p>{t("No ships are docked.")}</p>
	) : (
		<Table<IDockedShip>
			keyField="shipId"
			columnDefinitions={dockedShipsColumnDefinitions}
			tableData={sortedShips}
			striped
		/>
	);
}

function sortShips(ships: readonly IDockedShip[]): IDockedShip[] {
	return sortBy(ships, [(x) => x.username.toLowerCase(), (x) => x.shipType]);
}
