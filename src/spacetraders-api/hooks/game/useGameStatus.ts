import { GAME_QUERY_KEY } from ".";
import { SpaceTradersApi } from "../../api";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

export function useGameStatus() {
	return useSpaceTradersQuery(
		[GAME_QUERY_KEY, "status"],
		() => SpaceTradersApi.getGameStatus(),
		{
			staleTime: 15_000,
			refetchInterval: 15_000,
		},
	);
}
