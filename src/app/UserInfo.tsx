import { useContext } from "react";
import { numberFormat } from "../helpers/numberFormat";
import { CurrentUserContext } from "./CurrentUserProvider";

export function UserInfo() {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<h1>User Info</h1>
			<p>
				<strong>Username:</strong> {currentUser.username}
				<br />
				<strong>Credits:</strong> {numberFormat(currentUser.credits)}
				<br />
				<strong>Ships:</strong> {currentUser.ships.length}
			</p>
		</>
	);
}
