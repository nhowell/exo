import { SpaceTradersApi } from "../../api";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { GAME_QUERY_KEY } from ".";

export function useGameStatus() {
	return useSpaceTradersQuery(
		[GAME_QUERY_KEY, "status"],
		() => SpaceTradersApi.getGameStatus(),
		{
			staleTime: 30_000,
			refetchInterval: 30_000,
		},
	);
}
