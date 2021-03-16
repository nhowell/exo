import { useMutation } from "react-query";
import { currentUserPath } from "..";
import { spaceTradersApi } from "../..";
import { IError } from "../../types";
import { IGetUserInfoResponse, setUserInfoQueryData } from "../getUserInfo";
import { IUser } from "../types";

export function usePayOffLoan() {
	return useMutation<IUser, IError, IPayOffLoanRequest>(payOffLoan, {
		onSuccess: (data) => {
			// Since paying off a loan returns the entire user object, we can update
			// the user query with the new data to prevent an extra query.
			setUserInfoQueryData(data);
		},
	});
}

interface IPayOffLoanRequest {
	username: string;
	loanId: string;
}

async function payOffLoan({ username, loanId }: IPayOffLoanRequest) {
	const response = await spaceTradersApi.put<IGetUserInfoResponse>(
		`${currentUserPath(username)}/loans/${loanId}`,
	);
	return response.data.user;
}
