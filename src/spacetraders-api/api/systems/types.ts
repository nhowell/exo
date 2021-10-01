import { LocationType, ShipClass } from "../enums";
import { IDockedShip, ILocation } from "../locations/types";
import { IShipType } from "../types/types";

export interface ISystemResponse {
	system: ISystem;
}

interface ISystem {
	symbol: string;
	name: string;
}

export interface IGetLocationsInSystemParams {
	/**
	 * The type of location to filter by, e.g. "PLANET".
	 */
	type?: LocationType;
	/**
	 * Filter on whether the location allows construction or not.
	 */
	allowsConstruction?: boolean;
}

export interface ISystemLocationsResponse {
	locations: ILocation[];
}

export interface IGetAvailableShipsInSystemParams {
	/**
	 * The class of ship to filter by, e.g. "MK-I".
	 */
	class?: ShipClass;
}

export interface ISystemAvailableShipsResponse {
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

export interface IGetDockedShipsInSystemResponse {
	ships: IDockedShip[];
}
