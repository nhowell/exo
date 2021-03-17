import { useMutation } from "react-query";
import { userPath } from ".";
import { unauthenticatedSpaceTradersApi } from "..";
import { IError } from "../types";

export function useClaimUsernameAndGetToken() {
	return useMutation<ISuccessResponse, IError, string>(
		claimUsernameAndGetToken,
	);
}

async function claimUsernameAndGetToken(username: string) {
	const response = await unauthenticatedSpaceTradersApi.post<ISuccessResponse>(
		`${userPath(username)}/token`,
	);
	return response.data;
}

interface ISuccessResponse {
	token: string;
	user: ISuccessUserResponse;
}

interface ISuccessUserResponse {
	id: string;
	username: string;
	picture: unknown | null;
	email: string | null;
	credits: number;
	createdAt: string;
	updatedAt: string;
}
