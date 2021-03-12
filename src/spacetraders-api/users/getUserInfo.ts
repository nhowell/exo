import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { spaceTradersApi, spaceTradersApiUsername } from "..";
import { IUser } from "./types";

export const getUserInfoQueryKey = [USERS_QUERY_KEY, "info"];

export function useUserInfo(initialData?: IUser) {
	return useQuery<IUser, string>(getUserInfoQueryKey, () => getUserInfo(), {
		initialData: initialData,
		refetchOnMount: initialData === undefined,
	});
}

export async function getUserInfo() {
	// Normally axios encodes things for us, but in the edge case that the
	// username has a space at the end, axios trims off the space instead of
	// encoding it. When we manually encode it we can avoid this.
	const encodedUsername = encodeURIComponent(spaceTradersApiUsername);

	const response = await spaceTradersApi.get<IGetUserInfoResponse>(
		`/users/${encodedUsername}`,
	);

	return response.data.user;
}

export interface IGetUserInfoResponse {
	user: IUser;
}
