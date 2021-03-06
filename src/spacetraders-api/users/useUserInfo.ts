import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { spaceTradersApi } from "..";

export function useUserInfo(username: string) {
	return useQuery<ISuccessResponse, IFailureResponse>(
		[USERS_QUERY_KEY, "info"],
		() => getUserInfo(username),
	);
}

async function getUserInfo(username: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		`/users/${username}`,
	);
	return response.data;
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
