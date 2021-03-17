import { useQuery } from "react-query";
import { userShipsPath, userShipsQueryKey } from ".";
import { spaceTradersApi } from "../..";
import { IError } from "../../types";
import { IUserShip } from "./types";

export function useShips(username: string) {
	return useQuery<IUserShip[], IError>(userShipsQueryKey(username), () =>
		getShips(username),
	);
}

async function getShips(username: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		userShipsPath(username),
	);

	return response.data.ships;
}

interface ISuccessResponse {
	ships: IUserShip[];
}
