import { useUserInfo } from "../../spacetraders-api/users/getUserInfo";
import { useCurrentUser } from "./useCurrentUser";

export function useCurrentUserInfo() {
	const currentUser = useCurrentUser();
	return useUserInfo(currentUser.username);
}
