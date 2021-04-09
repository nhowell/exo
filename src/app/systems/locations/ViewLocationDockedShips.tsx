import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { mergeSymbols } from "../../../helpers/mergeSymbols";
import { t } from "../../../helpers/translate";
import { useLocationDockedShips } from "../../../spacetraders-api/hooks/game/locations/useLocationDockedShips";
import { LocationName } from "./LocationName";
import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import { IDockedShip } from "../../../spacetraders-api/api/game/locations/types";
import { sortBy } from "lodash";

interface IRouteParams {
	systemSymbol: string;
	locationSymbol: string;
}

const dockedShipsColumnDefinitions: ITableColumnHeader<IDockedShip>[] = [
	{
		keyname: "shipId",
		label: "Ship ID",
	},
	{
		keyname: "username",
		label: "Username",
	},
	{
		keyname: "shipType",
		label: "Ship Type",
	},
];

export function ViewLocationDockedShips(): ReactElement {
	const { systemSymbol, locationSymbol } = useParams<IRouteParams>();

	const symbol = mergeSymbols(systemSymbol, locationSymbol);

	const { isLoading, isError, error, data } = useLocationDockedShips(symbol);

	const sortedShips = useMemo(() => {
		if (data === undefined) {
			return [];
		}

		return sortShips(data.location.ships);
	}, [data]);

	return (
		<>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<>
					<header>
						<h1>
							{t("Ships Docked at")}{" "}
							<LocationName
								name={data.location.name}
								symbol={data.location.symbol}
							/>
						</h1>
					</header>

					{sortedShips.length === 0 ? (
						<p>{t("No ships are docked.")}</p>
					) : (
						<Table<IDockedShip>
							keyField="shipId"
							columnDefinitions={dockedShipsColumnDefinitions}
							tableData={sortedShips}
							striped
						/>
					)}
				</>
			)}
		</>
	);
}

function sortShips(ships: readonly IDockedShip[]): IDockedShip[] {
	return sortBy(ships, [(x) => x.username.toLowerCase(), (x) => x.shipType]);
}
