import { userQueryKey } from ".";
import { spaceTradersQueryClient } from "../spaceTradersQueryClient";
import { setLoansQueryData } from "./loans/useLoans";
import { setShipsQueryData } from "./ships/useShips";
import { IGetUserInfoResponse, IUser } from "../../api/users/types";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { SpaceTradersApi } from "../../api";

function getUserInfoQueryKey(username: string): string[] {
	return [...userQueryKey(username), "info"];
}

export function useUserInfo() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		getUserInfoQueryKey(spaceTradersApi.getUsername()),
		() => spaceTradersApi.users.getUserInfo(),
		{
			onSuccess: (data) => updateRelatedQueryData(data.user),
		},
	);
}

export async function checkCredentials(
	username: string,
	token: string,
): Promise<void> {
	const data = await spaceTradersQueryClient.fetchQuery(
		getUserInfoQueryKey(username),
		() => SpaceTradersApi.checkCredentials(username, token),
	);

	updateRelatedQueryData(data.user);
}

export function setUserInfoQueryData(userInfoResponse: IGetUserInfoResponse) {
	spaceTradersQueryClient.setQueryData<IGetUserInfoResponse>(
		getUserInfoQueryKey(userInfoResponse.user.username),
		userInfoResponse,
	);

	updateRelatedQueryData(userInfoResponse.user);
}

// Since the user info endpoint returns the user's loans and ships, we can
// optimistically update those query's data as well.
function updateRelatedQueryData(userInfo: IUser) {
	setLoansQueryData(userInfo.username, userInfo.loans);
	setShipsQueryData(userInfo.username, userInfo.ships);
}
