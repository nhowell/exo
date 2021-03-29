import { IUserLoan } from "./loans/types";
import { IUserShip } from "./ships/types";

export interface IGetUserInfoResponse {
	user: IUser;
}

export interface IUser {
	username: string;
	credits: number;
	ships: IUserShip[];
	loans: IUserLoan[];
}
