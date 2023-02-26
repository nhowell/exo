import { produce } from "immer";

import { IGetMyLoansResponse, IMyLoan } from "../../../api/my/loans/types";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

import { MY_LOANS_QUERY_KEY } from ".";

export function useMyLoans() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		MY_LOANS_QUERY_KEY,
		spaceTradersApi.my.loans.getLoans,
	);
}

export function setMyLoansQueryData(loans: IMyLoan[]) {
	spaceTradersQueryClient.setQueryData<IGetMyLoansResponse>(
		MY_LOANS_QUERY_KEY,
		{ loans: loans },
	);
}

export function addNewLoanToQueryData(loan: IMyLoan) {
	const loans =
		spaceTradersQueryClient.getQueryData<IGetMyLoansResponse>(
			MY_LOANS_QUERY_KEY,
		);

	// If the query hasn't been loaded yet, don't do anything.
	if (loans === undefined) {
		return;
	}

	const newLoans = produce(loans, (draft) => {
		draft.loans.push(loan);
	});

	spaceTradersQueryClient.setQueryData<IGetMyLoansResponse>(
		MY_LOANS_QUERY_KEY,
		newLoans,
	);
}
