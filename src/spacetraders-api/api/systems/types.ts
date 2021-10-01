import { LocationType } from "../enums";
import { ILocation } from "../locations/types";

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