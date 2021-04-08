import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableShip } from "./AvailableShip";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";
import { useAvailableShips } from "../../spacetraders-api/hooks/game/ships/useAvailableShips";
import { IAvailableShip } from "../../spacetraders-api/api/game/ships/types";
import { sortBy } from "lodash";
import { useMemo } from "react";

export function AvailableShips() {
	const { isLoading, isError, error, data } = useAvailableShips();

	const sortedShips = useMemo(() => {
		if (data === undefined) {
			return;
		}

		return sortShips(data.ships);
	}, [data]);

	return (
		<>
			<h1>{t("Available Ships")}</h1>
			{isLoading ? (
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
			)}
		</>
	);
}

function sortShips(ships: readonly IAvailableShip[]): IAvailableShip[] {
	return sortBy(ships, (x) => x.purchaseLocations[0].price);
}
