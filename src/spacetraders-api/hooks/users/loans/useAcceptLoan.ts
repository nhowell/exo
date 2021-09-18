import { setUserInfoQueryData } from "../useUserInfo";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { LoanType } from "../../../api/types/types";

export function useAcceptLoan() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(type: LoanType) => spaceTradersApi.users.loans.acceptLoan(type),
		{
			onSuccess: (data) => {
				// Since accepting a loan returns the entire user object, we can update
				// the user query with the new data to prevent an extra query.
				setUserInfoQueryData(data);
			},
		},
	);
}
