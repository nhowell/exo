import {
	Good,
	LoanType,
	LocationType,
	LocationTrait,
	ShipClass,
	StructureType,
	ShipType,
} from "../enums";

export interface IGetAvailableLoanTypesResponse {
	loans: IAvailableLoan[];
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}

export interface IGetGoodTypesResponse {
	goods: IGoodType[];
}

export interface IGoodType {
	name: string;
	symbol: Good;
	volumePerUnit: number;
}

export interface IGetShipTypesResponse {
	ships: IShipType[];
}

export interface IShipType {
	type: ShipType;
	class: ShipClass;
	maxCargo: number;
	loadingSpeed: number;
	speed: number;
	manufacturer: string;
	plating: number;
	weapons: number;
	restrictedGoods?: Good[];
}

export interface IGetStructureTypesResponse {
	structures: IStructureType[];
}

export interface IStructureType {
	type: StructureType;
	name: string;
	price: number;
	allowedLocationTypes: LocationType[];
	allowedPlanetTraits: LocationTrait[];
	consumes: Good[];
	produces: Good[];
}
