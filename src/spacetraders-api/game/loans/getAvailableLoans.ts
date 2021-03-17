import { useQuery } from "react-query";
import { GAME_LOANS_PATH, GAME_LOANS_QUERY_KEY } from ".";
import { spaceTradersApi } from "../..";
import { IError } from "../../types";
import { IAvailableLoan } from "./types";

export function useAvailableLoans() {
	return useQuery<IAvailableLoan[], IError>(GAME_LOANS_QUERY_KEY, () =>
		getAvailableLoans(),
	);
}

async function getAvailableLoans() {
	const response = await spaceTradersApi.get<ISuccessResponse>(GAME_LOANS_PATH);

	return response.data.loans;
}

interface ISuccessResponse {
	loans: IAvailableLoan[];
}
