import { useMutation } from "react-query";
import { currentUserPath } from "..";
import { spaceTradersApi } from "../..";
import { LoanType } from "../../loans/types";
import { IGetUserInfoResponse, setUserInfoQueryData } from "../getUserInfo";
import { IUser } from "../types";

export function useAcceptLoan() {
	return useMutation<IUser, string, IAcceptLoanRequest>(acceptLoan, {
		onSuccess: (data) => {
			// Since accepting a loan returns the entire user object, we can update
			// the user query with the new data to prevent an extra query.
			setUserInfoQueryData(data);
		},
	});
}

interface IAcceptLoanRequest {
	username: string;
	type: LoanType;
}

async function acceptLoan({ username, ...payload }: IAcceptLoanRequest) {
	const response = await spaceTradersApi.post<IGetUserInfoResponse>(
		`${currentUserPath(username)}/loans`,
		payload,
	);
	return response.data.user;
}
