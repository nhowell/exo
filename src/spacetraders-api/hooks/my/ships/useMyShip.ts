import { produce } from "immer";
import { myShipQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipInShipsQueryData } from "./useMyShips";
import { IGetMyShipResponse, IMyShip } from "../../../api/my/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { isEqual } from "lodash";
import { Good } from "../../../api/enums";

export function useMyShip(shipId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		myShipQueryKey(shipId),
		() => spaceTradersApi.my.ships.getShip(shipId),
		{
			onSuccess: (data) => updateRelatedQueryData(data.ship),
		},
	);
}

function getShipQueryData(shipId: string) {
	return spaceTradersQueryClient.getQueryData<IGetMyShipResponse>(
		myShipQueryKey(shipId),
	);
}

export function setShipQueryData(
	ship: IMyShip,
	shouldUpdateShipsQueryData = true,
) {
	const data = getShipQueryData(ship.id);

	if (data !== undefined && isEqual(data.ship, ship)) {
		return;
	}

	spaceTradersQueryClient.setQueryData<IGetMyShipResponse>(
		myShipQueryKey(ship.id),
		{ ship: ship },
	);

	if (shouldUpdateShipsQueryData) {
		updateRelatedQueryData(ship);
	}
}

export function setShipDeparture(
	shipId: string,
	flightPlanId: string,
	fuelConsumed: number,
) {
	const data = getShipQueryData(shipId);

	if (
		data === undefined ||
		(data.ship.flightPlanId !== flightPlanId &&
			data.ship.flightPlanId !== undefined)
	) {
		return;
	}

	// Since we're modifying the original, we must do it immutably.
	let newShip = produce(data.ship, (draft) => {
		delete draft.location;
		draft.flightPlanId = flightPlanId;
	});

	if (fuelConsumed > 0) {
		const fuel = data.ship.cargo.find((x) => x.good === Good.Fuel);

		if (fuel !== undefined) {
			newShip = setGoodQuantity(
				newShip,
				Good.Fuel,
				fuel.quantity - fuelConsumed,
			);
		}
	}

	setShipQueryData(newShip);
}

export function setShipArrival(
	shipId: string,
	flightPlanId: string,
	location: string,
) {
	const data = getShipQueryData(shipId);

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

export function setShipGoodQuantity(
	shipId: string,
	good: Good,
	quantity: number,
) {
	const data = getShipQueryData(shipId);

	if (data === undefined) {
		return;
	}

	const newShip = setGoodQuantity(data.ship, good, quantity);

	setShipQueryData(newShip);
}

function setGoodQuantity(ship: IMyShip, good: Good, quantity: number): IMyShip {
	return produce(ship, (draft) => {
		const existingGoodIndex = draft.cargo.findIndex((x) => x.good === good);

		if (existingGoodIndex !== -1) {
			const prevQuantity = draft.cargo[existingGoodIndex].quantity;
			const volumePerUnit =
				draft.cargo[existingGoodIndex].totalVolume / prevQuantity;

			draft.spaceAvailable += (prevQuantity - quantity) * volumePerUnit;

			if (quantity > 0) {
				draft.cargo[existingGoodIndex].quantity = quantity;
				draft.cargo[existingGoodIndex].totalVolume = quantity * volumePerUnit;
			} else {
				draft.cargo.splice(existingGoodIndex, 1);
			}
		}
	});
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
