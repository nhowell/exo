import { useQuery } from "react-query";
import { GAME_SHIPS_PATH, GAME_SHIPS_QUERY_KEY } from ".";
import { spaceTradersApi } from "../..";
import { IError } from "../../types";
import { IAvailableShip } from "./types";

export function useAvailableShips() {
	return useQuery<IAvailableShip[], IError>(GAME_SHIPS_QUERY_KEY, () =>
		getAvailableShips(),
	);
}

async function getAvailableShips() {
	const response = await spaceTradersApi.get<ISuccessResponse>(GAME_SHIPS_PATH);

	return response.data.ships;
}

interface ISuccessResponse {
	ships: IAvailableShip[];
}
