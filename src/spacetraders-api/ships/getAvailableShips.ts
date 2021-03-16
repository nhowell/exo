import { useQuery } from "react-query";
import { SHIPS_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";
import { IError } from "../types";
import { IAvailableShip } from "./types";

const getAvailableShipsQueryKey = SHIPS_QUERY_KEY;

export function useAvailableShips() {
	return useQuery<IAvailableShip[], IError>(
		getAvailableShipsQueryKey,
		() => getAvailableShips(),
		{
			staleTime: 30_000,
		},
	);
}

async function getAvailableShips() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/ships");

	return response.data.ships;
}

interface ISuccessResponse {
	ships: IAvailableShip[];
}
