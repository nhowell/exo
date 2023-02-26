import { produce } from "immer";
import { isEqual } from "lodash";

import { IGetMyShipsResponse, IMyShip } from "../../../api/my/ships/types";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

import { setShipQueryDataForAllShips } from "./useMyShip";

import { MY_SHIPS_QUERY_KEY } from ".";

export function useMyShips() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		MY_SHIPS_QUERY_KEY,
		spaceTradersApi.my.ships.getShips,
		{
			onSuccess: (data) => updateRelatedQueryData(data.ships),
		},
	);
}

export function setShipInShipsQueryData(ship: IMyShip) {
	const data =
		spaceTradersQueryClient.getQueryData<IGetMyShipsResponse>(
			MY_SHIPS_QUERY_KEY,
		);

	if (data === undefined) {
		return;
	}

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

export function removeShipFromShipsQueryData(shipId: string) {
	const data =
		spaceTradersQueryClient.getQueryData<IGetMyShipsResponse>(
			MY_SHIPS_QUERY_KEY,
		);

	if (data === undefined) {
		return;
	}

	// Since we're modifying the original, we must do it immutably.
	const newData = produce(data, (draft) => {
		draft.ships = draft.ships.filter((x) => x.id !== shipId);
	});

	spaceTradersQueryClient.setQueryData<IGetMyShipsResponse>(
		MY_SHIPS_QUERY_KEY,
		newData,
	);
}
