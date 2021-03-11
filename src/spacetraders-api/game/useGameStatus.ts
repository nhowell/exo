import { useQuery } from "react-query";
import { GAME_QUERY_KEY } from ".";
import { unauthenticatedSpaceTradersApi } from "..";

export function useGameStatus() {
	const query = useQuery<string, string>(
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
	const response = await unauthenticatedSpaceTradersApi.get<ISuccessResponse>(
		"/game/status",
	);
	return response.data.status;
}

interface ISuccessResponse {
	status: string;
}
