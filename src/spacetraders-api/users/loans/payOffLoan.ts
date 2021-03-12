import { useMutation } from "react-query";
import { currentUserPath } from "..";
import { spaceTradersApi } from "../..";
import { queryClient } from "../../../app/App";
import { getUserInfoQueryKey, IGetUserInfoResponse } from "../getUserInfo";
import { IUser } from "../types";

export function usePayOffLoan() {
	return useMutation<IUser, string, string>(payOffLoan, {
		onSuccess: () => {
			queryClient.invalidateQueries(getUserInfoQueryKey);
		},
	});
}

async function payOffLoan(loanId: string) {
	const response = await spaceTradersApi.put<IGetUserInfoResponse>(
		`${currentUserPath()}/loans/${loanId}`,
	);
	return response.data.user;
}
