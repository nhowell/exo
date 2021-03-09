import { useMutation } from "react-query";
import { unauthenticatedSpaceTradersApi } from "..";
import { isAxiosError } from "../../utilities/isAxiosError";

export function useClaimUsernameAndGetToken() {
	return useMutation<ISuccessResponse, string, string>(
		claimUsernameAndGetToken,
	);
}

async function claimUsernameAndGetToken(username: string) {
	try {
		const response = await unauthenticatedSpaceTradersApi.post<ISuccessResponse>(
			`/users/${username}/token`,
		);
		return response.data;
	} catch (error) {
		if (isAxiosError<string>(error) && error.response?.data) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject("Something went wrong.");
	}
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
