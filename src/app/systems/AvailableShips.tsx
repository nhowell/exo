import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableShip } from "./AvailableShip";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { useAvailableShipsInSystem } from "../../spacetraders-api/hooks/systems/useAvailableShipsInSystem";
import { IAvailableShip } from "../../spacetraders-api/api/systems/types";

interface IOwnProps {
	systemSymbol: string;
}

export function AvailableShips(props: IOwnProps) {
	const { isLoading, isError, error, data } = useAvailableShipsInSystem(
		props.systemSymbol,
	);

	const sortedShips = useMemo(() => {
		if (data === undefined) {
			return;
		}

		return sortShips(data.shipListings);
	}, [data]);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || sortedShips === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : sortedShips.length === 0 ? (
		<p>{t("There are no available ships.")}</p>
	) : (
		<TileContainer>
			{sortedShips.map((ship) => (
				<Tile key={ship.type} width="28.5rem">
					<AvailableShip ship={ship} />
				</Tile>
			))}
		</TileContainer>
	);
}

function sortShips(ships: readonly IAvailableShip[]): IAvailableShip[] {
	return sortBy(ships, (x) => x.purchaseLocations[0].price);
}
