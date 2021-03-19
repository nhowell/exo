import { useQuery } from "react-query";
import { userPath, userQueryKey } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "..";
import { IError } from "../types";
import { setLoansQueryData } from "./loans/getLoans";
import { setShipsQueryData } from "./ships/getShips";
import { IUser } from "./types";

export function getUserInfoQueryKey(username: string): string[] {
	return [...userQueryKey(username), "info"];
}

export function useUserInfo(username: string) {
	return useQuery<IUser, IError>(getUserInfoQueryKey(username), () =>
		fetchUserInfo(username),
	);
}

export async function getUserInfo(username: string) {
	const userInfo = await spaceTradersQueryClient.fetchQuery(
		getUserInfoQueryKey(username),
		() => fetchUserInfo(username),
	);

	updateRelatedQueryData(userInfo);

	return userInfo;
}

async function fetchUserInfo(username: string) {
	// Normally axios encodes things for us, but in the edge case that the
	// username has a space at the end, axios trims off the space instead of
	// encoding it. When we manually encode it we can avoid this.
	const encodedUsername = encodeURIComponent(username);

	const response = await spaceTradersApi.get<IGetUserInfoResponse>(
		userPath(encodedUsername),
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

	updateRelatedQueryData(userInfo);
}

// Since the user info endpoint returns the user's loans and ships, we can
// optimistically update those query's data as well.
function updateRelatedQueryData(userInfo: IUser) {
	setLoansQueryData(userInfo.username, userInfo.loans);
	setShipsQueryData(userInfo.username, userInfo.ships);
}
