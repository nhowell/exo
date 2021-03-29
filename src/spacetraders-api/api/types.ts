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
	user: INewUser;
}

export interface INewUser {
	id: string;
	username: string;
	picture: unknown | null;
	email: string | null;
	credits: number;
	createdAt: string;
	updatedAt: string;
}
