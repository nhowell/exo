import { GAME_QUERY_KEY } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

export function useNetWorthLeaderboard() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		[GAME_QUERY_KEY, "leaderboard"],
		() => spaceTradersApi.game.getNetWorthLeaderboard(),
		{
			staleTime: 0,
		},
	);
}
