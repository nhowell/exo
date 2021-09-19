import { Good } from "../../enums";

export interface IPurchaseShipRequest {
	location: string;
	type: string;
}

export interface IPurchaseShipResponse {
	credits: number;
	ship: IUserShip;
}

export interface IGetUserShipsResponse {
	ships: IUserShip[];
}

export interface IGetUserShipResponse {
	ship: IUserShip;
}

export interface IUserShip {
	id: string;
	class: string;
	type: string;
	cargo: IShipCargo[];
	manufacturer: string;
	maxCargo: number;
	plating: number;
	spaceAvailable: number;
	speed: number;
	weapons: number;
	x: number;
	y: number;
	location?: string;
	flightPlanId?: string;
}

export interface IShipCargo {
	good: Good;
	quantity: number;
	totalVolume: number;
}
