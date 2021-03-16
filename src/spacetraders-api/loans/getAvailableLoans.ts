import { useQuery } from "react-query";
import { LOANS_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";
import { IError } from "../types";
import { IAvailableLoan } from "./types";

const getAvailableLoansQueryKey = LOANS_QUERY_KEY;

export function useAvailableLoans() {
	return useQuery<IAvailableLoan[], IError>(getAvailableLoansQueryKey, () =>
		getAvailableLoans(),
	);
}

async function getAvailableLoans() {
	const response = await spaceTradersApi.get<ISuccessResponse>("/game/loans");

	return response.data.loans;
}

interface ISuccessResponse {
	loans: IAvailableLoan[];
}
