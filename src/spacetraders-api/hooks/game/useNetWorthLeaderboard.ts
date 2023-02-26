import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { GAME_QUERY_KEY } from ".";

export function useNetWorthLeaderboard() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		[GAME_QUERY_KEY, "leaderboard"],
		spaceTradersApi.game.getNetWorthLeaderboard,
		{
			staleTime: 600_000, // 10 minutes
		},
	);
}
