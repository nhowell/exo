import { useContext } from "react";
import { CurrentUserContext } from "../App";
import { useUserInfo } from "../spacetraders-api/users/useUserInfo";

export function UserInfo() {
	const currentUser = useContext(CurrentUserContext);

	const userInfo = useUserInfo(currentUser.username);

	return <div>Credits: {userInfo.data?.user.credits}</div>;
}
