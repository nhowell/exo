import { useQuery } from "react-query";
import { spaceTradersApi } from ".";

const BASE_QUERY_KEY = "game";

export function useGameStatus() {
	return useQuery([BASE_QUERY_KEY, "status"], async () => {
		const response = await spaceTradersApi.get<IGameStatusResponse>(
			"/game/status",
		);
		return response.data;
	});
}

interface IGameStatusResponse {
	status: string;
}
