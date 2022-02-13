import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableShip } from "./AvailableShip";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";
import { sortBy } from "lodash";
import { useAvailableShipsInSystem } from "../../spacetraders-api/hooks/systems/useAvailableShipsInSystem";
import {
	IAvailableShip,
	ISystemAvailableShipsResponse,
} from "../../spacetraders-api/api/systems/types";
import { TransformedQueryResultHandler } from "../common/TransformedQueryResultHandler";

interface IOwnProps {
	systemSymbol: string;
}

export function AvailableShips(props: IOwnProps) {
	const result = useAvailableShipsInSystem(props.systemSymbol);

	return (
		<TransformedQueryResultHandler
			queryResult={result}
			transformData={transformData}
		>
			{(ships) =>
				ships.length === 0 ? (
					<p>{t("There are no available ships.")}</p>
				) : (
					<TileContainer>
						{ships.map((ship) => (
							<Tile key={ship.type} width="28.5rem">
								<AvailableShip ship={ship} />
							</Tile>
						))}
					</TileContainer>
				)
			}
		</TransformedQueryResultHandler>
	);
}

function transformData(data: ISystemAvailableShipsResponse): IAvailableShip[] {
	return sortShips(data.shipListings);
}

function sortShips(ships: IAvailableShip[]): IAvailableShip[] {
	return sortBy(ships, (x) => x.purchaseLocations[0].price);
}
