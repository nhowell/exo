import { LoanType } from "../loans/types";
import { LoanStatus } from "./loans/types";

export interface IUser {
	username: string;
	credits: number;
	ships: IUserShip[];
	loans: IUserLoan[];
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
	location?: string;
	flightPlanId?: string;
}

interface IShipCargo {
	good: string;
	quantity: number;
	totalVolume: number;
}

export interface IUserLoan {
	id: string;
	due: string;
	repaymentAmount: number;
	status: LoanStatus;
	type: LoanType;
}
