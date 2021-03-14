import { useUserInfo } from "../spacetraders-api/users/getUserInfo";
import { useCurrentUser } from "./hooks/useCurrentUser";

export function UserInfo() {
	const currentUser = useCurrentUser();
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
					<strong>Ships:</strong> {userInfo.ships.length}
				</p>
			)}
		</>
	);
}
