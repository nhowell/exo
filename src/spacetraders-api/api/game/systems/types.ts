import { ILocation } from "../../locations/types";

export interface ISystemsResponse {
	systems: ISystem[];
}

export interface ISystem {
	symbol: string;
	name: string;
	locations: ILocation[];
}
