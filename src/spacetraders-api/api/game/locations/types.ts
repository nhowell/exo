import { Good, LocationType } from "../../enums";

interface IBaseLocation {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
}

export interface IGetLocationResponse {
	location: ILocationDetails;
	dockedShips: number;
}

export interface ILocation extends IBaseLocation {
	messages?: string[];
}

export interface ILocationDetails extends ILocation {
	structures: IStructure[];
}

export interface IGetLocationDockedShipsResponse {
	location: ILocationDockedShips;
}

export interface ILocationDockedShips extends IBaseLocation {
	ships: IDockedShip[];
}

export interface IDockedShip {
	shipId: string;
	username: string;
	shipType: string;
}

export interface IStructure {
	id: string;
	name: string;
	completed: boolean;
	materials: IStructureMaterial[];
	stability: number;
}

export interface IStructureMaterial {
	good: Good;
	quantity: number;
	targetQuantity: number;
}
