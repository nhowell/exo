import { useQuery } from "react-query";
import { LOANS_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";
import { IAvailableLoan } from "./types";

const getAvailableLoansQueryKey = LOANS_QUERY_KEY;

export function useAvailableLoans() {
	return useQuery<IAvailableLoan[], string>(
		getAvailableLoansQueryKey,
		() => getAvailableLoans(),
		{
			staleTime: 30_000,
		},
	);
}

async function getAvailableLoans() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/loans");

	return response.data.loans;
}

interface ISuccessResponse {
	loans: IAvailableLoan[];
}
