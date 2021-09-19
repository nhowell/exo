import { produce } from "immer";
import { MY_SHIPS_QUERY_KEY } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipQueryDataForAllShips } from "./useShip";
import { IGetMyShipsResponse, IMyShip } from "../../../api/my/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { isEqual } from "lodash";

export function useShips() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		MY_SHIPS_QUERY_KEY,
		() => spaceTradersApi.my.ships.getShips(),
		{
			onSuccess: (data) => updateRelatedQueryData(data.ships),
		},
	);
}

export function setShipsQueryData(ships: IMyShip[]) {
	let shouldInvalidateUserShips = false;

	spaceTradersQueryClient.setQueryData<IGetMyShipsResponse>(
		MY_SHIPS_QUERY_KEY,
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

			updateRelatedQueryData(newShips);

			return { ships: newShips };
		},
	);

	if (shouldInvalidateUserShips) {
		spaceTradersQueryClient.invalidateQueries(MY_SHIPS_QUERY_KEY, {
			exact: true,
		});
	}
}

export function setShipInShipsQueryData(ship: IMyShip) {
	const data = spaceTradersQueryClient.getQueryData<IGetMyShipsResponse>(
		MY_SHIPS_QUERY_KEY,
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
		spaceTradersQueryClient.setQueryData<IGetMyShipsResponse>(
			MY_SHIPS_QUERY_KEY,
			newData,
		);
	}
}

// The list of ships and the individual ship endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(ships: IMyShip[]) {
	setShipQueryDataForAllShips(ships);
}
