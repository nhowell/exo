import { LocationType, LocationTrait } from "../enums";

export interface IGetLocationResponse {
	location: ILocationDetails;
}

export interface ILocationDetails extends ILocation {
	dockedShips: number;
}

export interface ILocation {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
	allowsConstruction: boolean;
	traits: LocationTrait[];
	messages?: string[];
}

export interface IGetLocationDockedShipsResponse {
	ships: IDockedShip[];
}

export interface IDockedShip {
	shipId: string;
	username: string;
	shipType: string;
}
