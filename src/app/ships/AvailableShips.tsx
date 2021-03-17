import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableShip } from "./AvailableShip";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";
import { useAvailableShips } from "../../spacetraders-api/game/ships/getAvailableShips";

export function AvailableShips() {
	const {
		isLoading,
		isError,
		error,
		data: availableShips,
	} = useAvailableShips();

	return (
		<>
			<h1>{t("Available Ships")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || availableShips === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : availableShips.length === 0 ? (
				<p>{t("There are no available ships.")}</p>
			) : (
				<TileContainer>
					{availableShips.map((ship) => (
						<Tile key={ship.type}>
							<AvailableShip ship={ship} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}
