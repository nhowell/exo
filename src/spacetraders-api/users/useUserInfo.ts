import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { IError, spaceTradersApi } from "..";
import { isAxiosError } from "../../utilities/isAxiosError";

export function useUserInfo(username: string) {
	return useQuery<ISuccessResponse, IError>([USERS_QUERY_KEY, "info"], () =>
		getUserInfo(username),
	);
}

async function getUserInfo(username: string) {
	try {
		const response = await spaceTradersApi.get<ISuccessResponse>(
			`/users/${username}`,
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
	user: ISuccessUserResponse;
}

interface ISuccessUserResponse {
	username: string;
	credits: number;
	ships: unknown[];
	loans: unknown[];
}

interface IFailureResponse {
	error: IFailureErrorResponse;
}

interface IFailureErrorResponse {
	code: number;
	message: string;
}
