import { useContext } from "react";
import { numberFormat } from "../helpers/numberFormat";
import { useUserInfo } from "../spacetraders-api/users/getUserInfo";
import { CurrentUserContext } from "./CurrentUserProvider";

export function UserInfo() {
	const currentUser = useContext(CurrentUserContext);
	const { isLoading, isError, error, data: userInfo } = useUserInfo(
		currentUser.username,
	);

	return (
		<>
			<h1>User Info</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : isError || userInfo === undefined ? (
				<p>{error ?? "Something went wrong."}</p>
			) : (
				<p>
					<strong>Username:</strong> {currentUser.username}
					<br />
					<strong>Credits:</strong> {numberFormat(userInfo.credits)}
					<br />
					<strong>Ships:</strong> {userInfo.ships.length}
				</p>
			)}
		</>
	);
}
