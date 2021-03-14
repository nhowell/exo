import { useCurrentUserInfo } from "./hooks/useCurrentUserInfo";

export function UserInfo() {
	const { isLoading, isError, error, data: userInfo } = useCurrentUserInfo();

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
