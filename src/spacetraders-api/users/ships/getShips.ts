import { produce } from "immer";
import { useQuery } from "react-query";
import { userShipsPath, userShipsQueryKey } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "../..";
import { IError } from "../../types";
import { setShipQueryDataForAllShips } from "./getShip";
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

	updateRelatedQueryData(username, response.data.ships);

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
			const newShips = produce(ships, (draft) => {
				if (old !== undefined) {
					for (const ship of draft) {
						if (
							ship.location === undefined &&
							ship.flightPlanId === undefined
						) {
							// The get user info endpoint returns the ships without
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

			updateRelatedQueryData(username, newShips);

			return newShips;
		},
	);

	if (shouldInvalidateUserShips) {
		spaceTradersQueryClient.invalidateQueries(userShipsQueryKey(username), {
			exact: true,
		});
	}
}

export function setShipInShipsQueryData(username: string, ship: IUserShip) {
	const ships =
		spaceTradersQueryClient.getQueryData<IUserShip[]>(
			userShipsQueryKey(username),
		) ?? [];

	const newShips = produce(ships, (draft) => {
		const index = draft.findIndex((x) => x.id === ship.id);

		if (index === -1) {
			draft.push(ship);
		} else {
			draft[index] = ship;
		}
	});

	spaceTradersQueryClient.setQueryData<IUserShip[]>(
		userShipsQueryKey(username),
		newShips,
	);
}

// The list of ships and the individual ship endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(username: string, ships: IUserShip[]) {
	setShipQueryDataForAllShips(username, ships);
}
