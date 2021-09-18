import { ShipClass } from "../../enums";
import { IShipType } from "../../types/types";

export interface IGetAvailableShipsParams {
	/**
	 * The class of ship to filter by, e.g. "MK-I".
	 */
	class?: ShipClass;
}

export interface IAvailableShipsResponse {
	ships: IAvailableShip[];
}

export interface IAvailableShip extends IShipType {
	purchaseLocations: IShipPurchaseLocation[];
}

interface IShipPurchaseLocation {
	system: string;
	location: string;
	price: number;
}
