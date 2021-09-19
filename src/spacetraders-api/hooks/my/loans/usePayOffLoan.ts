import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { setCreditsQueryData } from "../useMyAccountInfo";
import { setMyLoansQueryData } from "./useMyLoans";

export function usePayOffLoan() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(loanId: string) => spaceTradersApi.my.loans.payOffLoan(loanId),
		{
			onSuccess: (data) => {
				// Since paying off a loan returns the user's credits, we can update
				// the account info query with the new credits to prevent an extra query.
				setCreditsQueryData(data.credits);

				// Since paying off a loan returns all loans, we can update
				// the loans query with the new data to prevent an extra query.
				setMyLoansQueryData(data.loans);
			},
		},
	);
}
