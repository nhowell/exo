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
	location: string;
	manufacturer: string;
	maxCargo: number;
	plating: number;
	spaceAvailable: number;
	speed: number;
	weapons: number;
}

interface IShipCargo {
	good: string;
	quantity: number;
}

export interface IUserLoan {
	id: string;
	due: string;
	repaymentAmount: number;
	status: LoanStatus;
	type: LoanType;
}
