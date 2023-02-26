import { LoanType } from "../../../api/enums";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { setCreditsQueryData } from "../useMyAccountInfo";

import { addNewLoanToQueryData } from "./useMyLoans";

export function useAcceptLoan() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(type: LoanType) => spaceTradersApi.my.loans.acceptLoan(type),
		{
			onSuccess: (data) => {
				// Since accepting a loan returns the user's credits, we can update
				// the account info query with the new credits to prevent an extra query.
				setCreditsQueryData(data.credits);

				// Since accepting a loan returns the new loan, we can update
				// the loans query with the new data to prevent an extra query.
				addNewLoanToQueryData(data.loan);
			},
		},
	);
}
