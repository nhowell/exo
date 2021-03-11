import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from ".";
import { IError, spaceTradersApi } from "..";
import { IUser } from "./types";

export function useUserInfo(username: string, initialData?: IUser) {
	return useQuery<ISuccessResponse, IError>(
		[USERS_QUERY_KEY, "info"],
		() => getUserInfo(username),
		{
			initialData: initialData ? { user: initialData } : undefined,
			refetchOnMount: initialData === undefined,
		},
	);
}

export async function getUserInfo(username: string) {
	// Normally axios encodes things for us, but in the edge case that the
	// username has a space at the end, axios trims off the space instead of
	// encoding it. When we manually encode it we can avoid this.
	const encodedUsername = encodeURIComponent(username);

	const response = await spaceTradersApi.get<ISuccessResponse>(
		`/users/${encodedUsername}`,
	);

	return response.data;
}

interface ISuccessResponse {
	user: IUser;
}
