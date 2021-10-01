import { Good } from "../../enums";
import { IShipType } from "../../types/types";

export interface IPurchaseShipRequest {
	location: string;
	type: string;
}

export interface IPurchaseShipResponse {
	credits: number;
	ship: IMyShip;
}

export interface IGetMyShipsResponse {
	ships: IMyShip[];
}

export interface IGetMyShipResponse {
	ship: IMyShip;
}

export interface IMyShip extends IShipType {
	id: string;
	cargo: IShipCargo[];
	spaceAvailable: number;
	loadingSpeed: number;
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

export interface ITransferCargoRequest {
	toShipId: string;
	good: Good;
	quantity: number;
}

export interface ITransferCargoResponse {
	fromShip: IMyShip;
	toShip: IMyShip;
}

export interface IJettisonCargoRequest {
	good: Good;
	quantity: number;
}

export interface IJettisonCargoResponse {
	good: Good;
	quantityRemaining: number;
	shipId: string;
}
