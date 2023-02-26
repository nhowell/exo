import { NavLink } from "react-router-dom";

import { Tile } from "@/components/tiles/Tile";
import { TileContainer } from "@/components/tiles/TileContainer";
import { useMyShips } from "@/spacetraders-api/hooks/my/ships/useMyShips";
import { useMyAccountInfo } from "@/spacetraders-api/hooks/my/useMyAccountInfo";

import { APP_NAME } from "../constants";
import { generateViewSystemPath, loansPath } from "../routes";
import { STARTER_SYSTEM } from "../systems/useVisitedSystems";
import { SystemTabKey } from "../systems/ViewSystem";

import { NetWorthLeaderboard } from "./NetWorthLeaderboard";

export function Dashboard() {
	const { isLoading: isMyAccountInfoLoading, data: myAccountInfoResponse } =
		useMyAccountInfo();
	const { isLoading: isMyShipsLoading, data: shipsResponse } = useMyShips();

	if (isMyAccountInfoLoading || isMyShipsLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{shipsResponse?.ships.length === 0 ? (
				<>
					<p>Welcome to {APP_NAME}!</p>
					<p>
						To get started{" "}
						{myAccountInfoResponse?.user.credits === 0 ? (
							<>
								<NavLink to={loansPath}>take out a loan</NavLink>, then
							</>
						) : null}{" "}
						<NavLink
							to={`${generateViewSystemPath(STARTER_SYSTEM)}#${
								SystemTabKey.AvailableShips
							}`}
						>
							purchase a ship
						</NavLink>
						.
					</p>
					<p>
						Next, fuel up your ship and explore. Buy and sell goods to earn more
						credits. Soon, you&apos;ll be expanding your fleet and paying off
						your loan.
					</p>
				</>
			) : (
				<TileContainer>
					<Tile>
						<NetWorthLeaderboard />
					</Tile>
				</TileContainer>
			)}
		</>
	);
}
