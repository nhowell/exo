import { userLoansQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import {
	IGetUserLoansResponse,
	IUserLoan,
} from "../../../api/users/loans/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function useLoans() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		userLoansQueryKey(spaceTradersApi.getUsername()),
		() => spaceTradersApi.users.loans.getLoans(),
	);
}

export function setLoansQueryData(username: string, loans: IUserLoan[]) {
	spaceTradersQueryClient.setQueryData<IGetUserLoansResponse>(
		userLoansQueryKey(username),
		{ loans: loans },
	);
}
