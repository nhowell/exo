import { produce } from "immer";
import { useQuery } from "react-query";
import { userShipsPath, userShipsQueryKey } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "../..";
import { IError } from "../../types";
import { IUserShip } from "./types";

export function useShips(username: string) {
	return useQuery<IUserShip[], IError>(userShipsQueryKey(username), () =>
		getShips(username),
	);
}

async function getShips(username: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		userShipsPath(username),
	);

	return response.data.ships;
}

interface ISuccessResponse {
	ships: IUserShip[];
}

export function setShipsQueryData(username: string, ships: IUserShip[]) {
	let shouldInvalidateUserShips = false;

	spaceTradersQueryClient.setQueryData<IUserShip[]>(
		userShipsQueryKey(username),
		(old) => {
			return produce(ships, (draft) => {
				if (old !== undefined) {
					for (const ship of draft) {
						if (
							ship.location === undefined &&
							ship.flightPlanId === undefined
						) {
							// The get user info, and other endpoints, return the ships without
							// their flight plan IDs, so we want to make sure we don't lose the
							// flight plan IDs if we already have them.
							const previousShip = old.find((x) => x.id === ship.id);
							if (
								previousShip !== undefined &&
								previousShip.flightPlanId !== undefined
							) {
								ship.flightPlanId = previousShip.flightPlanId;
							}
						}
					}
				}

				// If a ship doesn't have either a location or a flightPlanId, then we
				// will have to fetch the data again properly.
				if (
					draft.some(
						(x) => x.location === undefined && x.flightPlanId === undefined,
					)
				) {
					shouldInvalidateUserShips = true;
				}
			});
		},
	);

	if (shouldInvalidateUserShips) {
		spaceTradersQueryClient.invalidateQueries(userShipsQueryKey(username), {
			exact: true,
		});
	}
}

export function setShipArrival(
	username: string,
	shipId: string,
	flightPlanId: string,
	location: string,
) {
	const ships = spaceTradersQueryClient.getQueryData<IUserShip[]>(
		userShipsQueryKey(username),
	);

	if (ships === undefined) {
		return;
	}

	spaceTradersQueryClient.setQueryData<IUserShip[]>(
		userShipsQueryKey(username),
		(old) => {
			if (old === undefined) {
				return [];
			}

			// Since we're modifying the original, we must do it immutably.
			return produce(old, (draft) => {
				const ship = draft.find(
					(x) =>
						x.id === shipId &&
						(x.flightPlanId === flightPlanId || x.flightPlanId === undefined),
				);

				if (ship !== undefined) {
					delete ship.flightPlanId;
					ship.location = location;
				}
			});
		},
	);
}
