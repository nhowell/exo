import { produce } from "immer";
import { userShipQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipInShipsQueryData } from "./useShips";
import {
	IGetUserShipResponse,
	IUserShip,
} from "../../../api/users/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { isEqual } from "lodash";

export function useShip(shipId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		userShipQueryKey(spaceTradersApi.getUsername(), shipId),
		() => spaceTradersApi.users.ships.getShip(shipId),
		{
			onSuccess: (data) =>
				updateRelatedQueryData(spaceTradersApi.getUsername(), data.ship),
		},
	);
}

export function setShipQueryData(
	username: string,
	shipResponse: IGetUserShipResponse,
	shouldUpdateShipsQueryData = true,
) {
	const data = spaceTradersQueryClient.getQueryData<IGetUserShipResponse>(
		userShipQueryKey(username, shipResponse.ship.id),
	);

	if (data !== undefined && isEqual(data, shipResponse)) {
		return;
	}

	let shouldInvalidateShip = false;

	spaceTradersQueryClient.setQueryData<IGetUserShipResponse>(
		userShipQueryKey(username, shipResponse.ship.id),
		(old) => {
			const newData = produce(shipResponse, (draft) => {
				if (
					old !== undefined &&
					draft.ship.location === undefined &&
					draft.ship.flightPlanId === undefined
				) {
					// The get user info endpoint returns the ships without
					// their flight plan IDs, so we want to make sure we don't lose the
					// flight plan IDs if we already have them.
					if (old.ship.flightPlanId !== undefined) {
						draft.ship.flightPlanId = old.ship.flightPlanId;
					}
				}

				if (shouldInvalidateShipQuery(draft.ship)) {
					shouldInvalidateShip = true;
				}
			});

			if (shouldUpdateShipsQueryData) {
				updateRelatedQueryData(username, newData.ship);
			}

			return newData;
		},
	);

	if (shouldInvalidateShip) {
		invalidateShipQuery(username, shipResponse.ship.id);
	}
}

export function setShipArrival(
	username: string,
	shipId: string,
	flightPlanId: string,
	location: string,
) {
	const data = spaceTradersQueryClient.getQueryData<IGetUserShipResponse>(
		userShipQueryKey(username, shipId),
	);

	if (
		data === undefined ||
		(data.ship.flightPlanId !== flightPlanId &&
			data.ship.flightPlanId !== undefined)
	) {
		return;
	}

	// Since we're modifying the original, we must do it immutably.
	const newData = produce(data, (draft) => {
		delete draft.ship.flightPlanId;
		draft.ship.location = location;
	});

	setShipQueryData(username, newData);
}

export function setShipQueryDataForAllShips(
	username: string,
	ships: IUserShip[],
) {
	for (const ship of ships) {
		setShipQueryData(username, { ship: ship }, false);
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
