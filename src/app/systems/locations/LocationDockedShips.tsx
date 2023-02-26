import { sortBy } from "lodash";
import { ReactElement } from "react";

import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import {
	IDockedShip,
	IGetDockedShipsAtLocationResponse,
} from "../../../spacetraders-api/api/locations/types";
import { useDockedShipsAtLocation } from "../../../spacetraders-api/hooks/locations/useDockedShipsAtLocation";
import { t } from "../../../utils/translate";
import { TransformedQueryResultHandler } from "../../common/TransformedQueryResultHandler";

interface IOwnProps {
	locationSymbol: string;
}

const dockedShipsColumnDefinitions: ITableColumnHeader<IDockedShip>[] = [
	{
		keyName: "username",
		label: t("Username"),
	},
	{
		keyName: "shipType",
		label: t("Ship Type"),
	},
];

export function LocationDockedShips(props: IOwnProps): ReactElement {
	const result = useDockedShipsAtLocation(props.locationSymbol);

	return (
		<TransformedQueryResultHandler
			queryResult={result}
			transformData={transformData}
		>
			{(ships) =>
				ships.length === 0 ? (
					<p>{t("No ships are docked.")}</p>
				) : (
					<Table<IDockedShip>
						keyField="shipId"
						columnDefinitions={dockedShipsColumnDefinitions}
						tableData={ships}
						striped
					/>
				)
			}
		</TransformedQueryResultHandler>
	);
}

function transformData(data: IGetDockedShipsAtLocationResponse): IDockedShip[] {
	return sortShips(data.ships);
}

function sortShips(ships: IDockedShip[]): IDockedShip[] {
	return sortBy(ships, [(x) => x.username.toLowerCase(), (x) => x.shipType]);
}
