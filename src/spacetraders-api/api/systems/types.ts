import { IAllStringKeyProps } from "@/types";

import { LocationType, ShipClass } from "../enums";
import { IDockedShip, ILocation } from "../locations/types";
import { IFlightPlanBase } from "../my/flight-plans/types";
import { IShipType } from "../types/types";

export interface ISystemResponse {
	system: ISystem;
}

interface ISystem {
	symbol: string;
	name: string;
}

export interface IGetLocationsInSystemParams extends IAllStringKeyProps {
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

export interface IGetAvailableShipsInSystemParams extends IAllStringKeyProps {
	/**
	 * The class of ship to filter by, e.g. "MK-I".
	 */
	class?: ShipClass;
}

export interface ISystemAvailableShipsResponse {
	shipListings: IAvailableShip[];
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

export interface IGetFlightPlansInSystemResponse {
	flightPlans: IFlightPlan[];
}

interface IFlightPlan extends IFlightPlanBase {
	username: string;
	shipType: string;
}
