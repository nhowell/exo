import { useQuery } from "react-query";
import { userLoansPath, userLoansQueryKey } from ".";
import { spaceTradersApi } from "../..";
import { IError } from "../../types";
import { IUserLoan } from "./types";

export function useLoans(username: string) {
	return useQuery<IUserLoan[], IError>(userLoansQueryKey(username), () =>
		getLoans(username),
	);
}

async function getLoans(username: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		userLoansPath(username),
	);

	return response.data.loans;
}

interface ISuccessResponse {
	loans: IUserLoan[];
}
