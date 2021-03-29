import { setUserInfoQueryData } from "../useUserInfo";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";

export function usePayOffLoan() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(loanId: string) => spaceTradersApi.users.loans.payOffLoan(loanId),
		{
			onSuccess: (data) => {
				// Since paying off a loan returns the entire user object, we can update
				// the user query with the new data to prevent an extra query.
				setUserInfoQueryData(data);
			},
		},
	);
}
