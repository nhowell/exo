import { useMutation } from "react-query";
import { currentUserPath } from "..";
import { spaceTradersApi } from "../..";
import { queryClient } from "../../../app/App";
import { getAvailableLoansQueryKey } from "../../loans/getAvailableLoans";
import { LoanType } from "../../loans/types";
import { getUserInfoQueryKey, IGetUserInfoResponse } from "../getUserInfo";
import { IUser } from "../types";

export function useAcceptLoan() {
	return useMutation<IUser, string, LoanType>(acceptLoan, {
		onSuccess: () => {
			queryClient.invalidateQueries(getUserInfoQueryKey);
			queryClient.invalidateQueries(getAvailableLoansQueryKey);
		},
	});
}

interface IAcceptLoadRequest {
	type: LoanType;
}

async function acceptLoan(loanType: LoanType) {
	const payload: IAcceptLoadRequest = {
		type: loanType,
	};

	const response = await spaceTradersApi.post<IGetUserInfoResponse>(
		`${currentUserPath()}/loans`,
		payload,
	);
	return response.data.user;
}
