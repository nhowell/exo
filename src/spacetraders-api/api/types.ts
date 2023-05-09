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
	Conflict = 409,
	TooManyRequests = 429,
}

export interface IGameStatusResponse {
	status: string;
}

export interface IClaimUsernameResponse {
	token: string;
	user: IUser;
}

interface IUser {
	username: string;
	credits: number;
}

export enum SpaceTradersErrorCode {
	InvalidToken = 40101,
}
