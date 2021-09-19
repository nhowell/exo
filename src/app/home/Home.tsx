import { NavLink } from "react-router-dom";
import { useMyAccountInfo } from "../../spacetraders-api/hooks/my/useMyAccountInfo";
import { useShips } from "../../spacetraders-api/hooks/my/ships/useShips";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { loansPath, shipyardPath } from "../routes";

export function Home() {
	const currentUser = useCurrentUser();
	const { data: myAccountInfoResponse } = useMyAccountInfo();
	const { data: shipsResponse } = useShips();

	return (
		<>
			{shipsResponse?.ships.length === 0 ? (
				<>
					<p>Welcome to SpaceTraders, {currentUser.username}!</p>
					<p>
						To get started{" "}
						{myAccountInfoResponse?.user.credits === 0 ? (
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
