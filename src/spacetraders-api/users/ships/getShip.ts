import { produce } from "immer";
import { useQuery } from "react-query";
import { userShipQueryKey, userShipPath } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "../..";
import { IError } from "../../types";
import { setShipInShipsQueryData } from "./getShips";
import { IUserShip } from "./types";

export function useShip(username: string, shipId: string) {
	return useQuery<IUserShip, IError>(userShipQueryKey(username, shipId), () =>
		getShip(username, shipId),
	);
}

async function getShip(username: string, shipId: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		userShipPath(username, shipId),
	);

	updateRelatedQueryData(username, response.data.ship);

	return response.data.ship;
}

interface ISuccessResponse {
	ship: IUserShip;
}

export function setShipQueryData(username: string, ship: IUserShip) {
	let shouldInvalidateShip = false;

	spaceTradersQueryClient.setQueryData<IUserShip>(
		userShipQueryKey(username, ship.id),
		(old) => {
			const newShip = produce(ship, (draft) => {
				if (
					old !== undefined &&
					draft.location === undefined &&
					draft.flightPlanId === undefined
				) {
					// The get user info endpoint returns the ships without
					// their flight plan IDs, so we want to make sure we don't lose the
					// flight plan IDs if we already have them.
					if (old.flightPlanId !== undefined) {
						draft.flightPlanId = old.flightPlanId;
					}
				}

				if (shouldInvalidateShipQuery(draft)) {
					shouldInvalidateShip = true;
				}
			});

			updateRelatedQueryData(username, newShip);

			return newShip;
		},
	);

	if (shouldInvalidateShip) {
		invalidateShipQuery(username, ship.id);
	}
}

export function setShipArrival(
	username: string,
	shipId: string,
	flightPlanId: string,
	location: string,
) {
	const ship = spaceTradersQueryClient.getQueryData<IUserShip>(
		userShipQueryKey(username, shipId),
	);

	if (
		ship === undefined ||
		(ship.flightPlanId !== flightPlanId && ship.flightPlanId !== undefined)
	) {
		return;
	}

	// Since we're modifying the original, we must do it immutably.
	const newShip = produce(ship, (draft) => {
		delete draft.flightPlanId;
		draft.location = location;
	});

	setShipQueryData(username, newShip);
}

export function setShipQueryDataForAllShips(
	username: string,
	ships: IUserShip[],
) {
	for (const ship of ships) {
		spaceTradersQueryClient.setQueryData<IUserShip>(
			userShipQueryKey(username, ship.id),
			ship,
		);

		if (shouldInvalidateShipQuery(ship)) {
			invalidateShipQuery(username, ship.id);
		}
	}
}

// The list of ships and the individual ship endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(username: string, ship: IUserShip) {
	setShipInShipsQueryData(username, ship);
}

// If the ship doesn't have either a location or a flightPlanId, then we
// will have to fetch the data again properly.
function shouldInvalidateShipQuery(ship: IUserShip) {
	return ship.location === undefined && ship.flightPlanId === undefined;
}

function invalidateShipQuery(username: string, shipId: string) {
	spaceTradersQueryClient.invalidateQueries(
		userShipQueryKey(username, shipId),
		{
			exact: true,
		},
	);
}
