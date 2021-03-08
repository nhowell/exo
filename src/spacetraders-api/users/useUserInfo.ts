import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { IError, spaceTradersApi } from "..";
import { isAxiosError } from "../../utilities/isAxiosError";
import { IFailureResponse } from "../types";
import { IUser } from "./types";

export function useUserInfo(username: string) {
	return useQuery<ISuccessResponse, IError>([USERS_QUERY_KEY, "info"], () =>
		getUserInfo(username),
	);
}

export async function getUserInfo(username: string) {
	// Normally axios encodes things for us, but in the edge case that the
	// username has a space at the end, axios trims off the space instead of
	// encoding it. When we manually encode it we can avoid this.
	const encodedUsername = encodeURIComponent(username);

	try {
		const response = await spaceTradersApi.get<ISuccessResponse>(
			`/users/${encodedUsername}`,
		);

		return response.data;
	} catch (error) {
		const result: IError = {
			message: "Failed to fetch user info.",
		};
		if (isAxiosError<IFailureResponse>(error)) {
			if (error.response?.data) {
				result.code = error.response.data.error.code;
				result.message = error.response.data.error.message;
			} else {
				result.message = error.message;
			}
		}
		return Promise.reject(result);
	}
}

interface ISuccessResponse {
	user: IUser;
}
