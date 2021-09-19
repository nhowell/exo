import { produce } from "immer";
import { myShipQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipInShipsQueryData } from "./useShips";
import { IGetMyShipResponse, IMyShip } from "../../../api/my/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { isEqual } from "lodash";

export function useShip(shipId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		myShipQueryKey(shipId),
		() => spaceTradersApi.my.ships.getShip(shipId),
		{
			onSuccess: (data) => updateRelatedQueryData(data.ship),
		},
	);
}

export function setShipQueryData(
	ship: IMyShip,
	shouldUpdateShipsQueryData = true,
) {
	const data = spaceTradersQueryClient.getQueryData<IGetMyShipResponse>(
		myShipQueryKey(ship.id),
	);

	if (data !== undefined && isEqual(data.ship, ship)) {
		return;
	}

	let shouldInvalidateShip = false;

	spaceTradersQueryClient.setQueryData<IGetMyShipResponse>(
		myShipQueryKey(ship.id),
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
					if (old.ship.flightPlanId !== undefined) {
						draft.flightPlanId = old.ship.flightPlanId;
					}
				}

				if (shouldInvalidateShipQuery(draft)) {
					shouldInvalidateShip = true;
				}
			});

			if (shouldUpdateShipsQueryData) {
				updateRelatedQueryData(newShip);
			}

			return { ship: newShip };
		},
	);

	if (shouldInvalidateShip) {
		invalidateShipQuery(ship.id);
	}
}

export function setShipArrival(
	shipId: string,
	flightPlanId: string,
	location: string,
) {
	const data = spaceTradersQueryClient.getQueryData<IGetMyShipResponse>(
		myShipQueryKey(shipId),
	);

	if (
		data === undefined ||
		(data.ship.flightPlanId !== flightPlanId &&
			data.ship.flightPlanId !== undefined)
	) {
		return;
	}

	// Since we're modifying the original, we must do it immutably.
	const newShip = produce(data.ship, (draft) => {
		delete draft.flightPlanId;
		draft.location = location;
	});

	setShipQueryData(newShip);
}

export function setShipQueryDataForAllShips(ships: IMyShip[]) {
	for (const ship of ships) {
		setShipQueryData(ship, false);
	}
}

// The list of ships and the individual ship endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(ship: IMyShip) {
	setShipInShipsQueryData(ship);
}

// If the ship doesn't have either a location or a flightPlanId, then we
// will have to fetch the data again properly.
function shouldInvalidateShipQuery(ship: IMyShip) {
	return ship.location === undefined && ship.flightPlanId === undefined;
}

function invalidateShipQuery(shipId: string) {
	spaceTradersQueryClient.invalidateQueries(myShipQueryKey(shipId), {
		exact: true,
	});
}
