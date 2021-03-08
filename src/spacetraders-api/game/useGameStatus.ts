import { useQuery } from "react-query";
import { GAME_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";

export function useGameStatus() {
	const query = useQuery<ISuccessResponse>(
		[GAME_QUERY_KEY, "status"],
		getGameStatus,
		{
			staleTime: 15_000,
			refetchInterval: 15_000,
		},
	);

	return query;
}

async function getGameStatus() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/status");
	return response.data;
}

interface ISuccessResponse {
	status: string;
}
