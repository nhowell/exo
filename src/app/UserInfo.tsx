import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserProvider";

export function UserInfo() {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<h1>User Info</h1>
			<p>
				<strong>Username:</strong> {currentUser.username}
				<br />
				<strong>Credits:</strong> {currentUser.credits}
				<br />
				<strong>Loans:</strong> {currentUser.loans.length}
				<br />
				<strong>Ships:</strong> {currentUser.ships.length}
			</p>
		</>
	);
}
