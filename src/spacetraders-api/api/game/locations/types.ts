import { GoodType } from "../../types/types";

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

export enum LocationType {
	Anomaly = "ANOMALY",
	Asteroid = "ASTEROID",
	GasGiant = "GAS_GIANT",
	Moon = "MOON",
	Nebula = "NEBULA",
	Planet = "PLANET",
	Wormhole = "WORMHOLE",
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
	good: GoodType;
	quantity: number;
	targetQuantity: number;
}
