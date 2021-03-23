import { NavLink } from "react-router-dom";
import { useUserInfo } from "../../spacetraders-api/users/getUserInfo";
import { useShips } from "../../spacetraders-api/users/ships/getShips";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { loansPath, shipyardPath } from "../routes";

export function Home() {
	const currentUser = useCurrentUser();
	const { data: userInfo } = useUserInfo(currentUser.username);
	const { data: ships } = useShips(currentUser.username);

	return (
		<>
			{ships?.length === 0 ? (
				<>
					<p>Welcome to SpaceTraders, {currentUser.username}!</p>
					<p>
						To get started{" "}
						{userInfo?.credits === 0 ? (
							<>
								<NavLink to={loansPath}>take out a loan</NavLink>, then
							</>
						) : null}{" "}
						<NavLink to={shipyardPath}>purchase a ship</NavLink>.
					</p>
					<p>
						Next, fuel up your ship and explore. Buy and sell goods to earn more
						credits. Soon, you'll be expanding your fleet and paying off your
						loan.
					</p>
				</>
			) : (
				<p>Welcome back, {currentUser.username}!</p>
			)}
		</>
	);
}
