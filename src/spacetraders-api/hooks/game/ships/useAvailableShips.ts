import { GAME_SHIPS_QUERY_KEY } from ".";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function useAvailableShips() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(GAME_SHIPS_QUERY_KEY, () =>
		spaceTradersApi.game.ships.getAvailableShips(),
	);
}
