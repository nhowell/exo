import { useQuery } from "react-query";
import { LOANS_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";
import { IAvailableLoan } from "./types";

export function useAvailableLoans() {
	return useQuery<IAvailableLoan[], string>([LOANS_QUERY_KEY], () =>
		getAvailableLoans(),
	);
}

export async function getAvailableLoans() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/loans");

	return response.data.loans;
}

interface ISuccessResponse {
	loans: IAvailableLoan[];
}
