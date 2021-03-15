import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "..";
import { IUser } from "./types";

export function getUserInfoQueryKey(username: string) {
	return [USERS_QUERY_KEY, username, "info"];
}

export function useUserInfo(username: string) {
	return useQuery<IUser, string>(
		getUserInfoQueryKey(username),
		() => fetchUserInfo(username),
		{
			staleTime: 60_000,
		},
	);
}

export async function getUserInfo(username: string) {
	return await spaceTradersQueryClient.fetchQuery(
		getUserInfoQueryKey(username),
		() => fetchUserInfo(username),
		{ staleTime: 5_000 },
	);
}

async function fetchUserInfo(username: string) {
	// Normally axios encodes things for us, but in the edge case that the
	// username has a space at the end, axios trims off the space instead of
	// encoding it. When we manually encode it we can avoid this.
	const encodedUsername = encodeURIComponent(username);

	const response = await spaceTradersApi.get<IGetUserInfoResponse>(
		`/users/${encodedUsername}`,
	);

	return response.data.user;
}

export interface IGetUserInfoResponse {
	user: IUser;
}

export function setUserInfoQueryData(userInfo: IUser) {
	spaceTradersQueryClient.setQueryData<IUser>(
		getUserInfoQueryKey(userInfo.username),
		userInfo,
	);
}
