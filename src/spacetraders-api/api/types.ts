import { IUser } from "./users/types";

export interface IFailureResponse {
	error: IFailureError;
}

export interface IFailureError {
	code: number;
	message: string;
	data?: unknown;
}

export class SpaceTradersError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public code?: number,
	) {
		super(message);
	}
}

export enum HttpStatusCode {
	TooManyRequests = 429,
}

export interface IGameStatusResponse {
	status: string;
}

export interface IClaimUsernameResponse {
	token: string;
	user: IUser;
}
