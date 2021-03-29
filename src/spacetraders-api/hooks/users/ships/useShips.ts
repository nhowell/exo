import { produce } from "immer";
import { userShipsQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipQueryDataForAllShips } from "./useShip";
import {
	IGetUserShipsResponse,
	IUserShip,
} from "../../../api/users/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { isEqual } from "lodash";

export function useShips() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		userShipsQueryKey(spaceTradersApi.getUsername()),
		() => spaceTradersApi.users.ships.getShips(),
		{
			onSuccess: (data) => {
				console.log("useShips onSuccess", data);

				updateRelatedQueryData(spaceTradersApi.getUsername(), data.ships);
			},
		},
	);
}

export function setShipsQueryData(username: string, ships: IUserShip[]) {
	const queryKey = userShipsQueryKey(username);
	let shouldInvalidateUserShips = false;

	spaceTradersQueryClient.setQueryData<IGetUserShipsResponse>(
		queryKey,
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
							const previousShip = old.ships.find((x) => x.id === ship.id);
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

			return { ships: newShips };
		},
	);

	if (shouldInvalidateUserShips) {
		spaceTradersQueryClient.invalidateQueries(queryKey, {
			exact: true,
		});
	}
}

export function setShipInShipsQueryData(username: string, ship: IUserShip) {
	const queryKey = userShipsQueryKey(username);

	const data = spaceTradersQueryClient.getQueryData<IGetUserShipsResponse>(
		queryKey,
	) ?? { ships: [] };

	const newData = produce(data, (draft) => {
		const index = draft.ships.findIndex((x) => x.id === ship.id);

		if (index === -1) {
			draft.ships.push(ship);
		} else {
			draft.ships[index] = ship;
		}
	});

	if (!isEqual(data, newData)) {
		console.log("setShipInShipsQueryData", ship, data, newData);

		spaceTradersQueryClient.setQueryData<IGetUserShipsResponse>(
			queryKey,
			newData,
		);
	}
}

// The list of ships and the individual ship endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(username: string, ships: IUserShip[]) {
	setShipQueryDataForAllShips(username, ships);
}
