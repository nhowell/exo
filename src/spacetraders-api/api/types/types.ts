import {
	Good,
	LoanType,
	LocationType,
	PlanetTrait,
	ShipClass,
	StructureType,
} from "../enums";

export interface GetAvailableLoanTypesResponse {
	loans: IAvailableLoan[];
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}

export interface GetGoodTypesResponse {
	goods: IGoodType[];
}

export interface IGoodType {
	name: string;
	symbol: Good;
	volumePerUnit: number;
}

export interface GetShipTypesResponse {
	ships: IShipType[];
}

export interface IShipType {
	type: string;
	class: ShipClass;
	maxCargo: number;
	loadingSpeed: number;
	speed: number;
	manufacturer: string;
	plating: number;
	weapons: number;
	restrictedGoods?: Good[];
}

export interface GetStructureTypesResponse {
	structures: IStructureType[];
}

export interface IStructureType {
	type: StructureType;
	name: string;
	price: number;
	allowedLocationTypes: LocationType[];
	allowedPlanetTraits: PlanetTrait[];
	consumes: Good[];
	produces: Good[];
}
