import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserProvider";
import { useUserInfo } from "../spacetraders-api/users/useUserInfo";

export function UserInfo() {
	const currentUser = useContext(CurrentUserContext);
	const { isLoading, isError, data, error } = useUserInfo(currentUser.username);

	return (
		<p>
			{isLoading ? (
				"Loading..."
			) : isError ? (
				error?.message ?? "Failed to fetch user info."
			) : (
				<>
					<strong>Username:</strong> {data?.user.username}
					<br />
					<strong>Credits:</strong> {data?.user.credits}
				</>
			)}
		</p>
	);
}
