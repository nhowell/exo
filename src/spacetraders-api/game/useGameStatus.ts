import { useQuery } from "react-query";
import { GAME_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";

export function useGameStatus() {
	return useQuery<ISuccessResponse>([GAME_QUERY_KEY, "status"], getGameStatus);
}

async function getGameStatus() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/status");
	return response.data;
}

interface ISuccessResponse {
	status: string;
}
