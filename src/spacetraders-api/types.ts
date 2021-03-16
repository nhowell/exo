export interface IFailureResponse {
	error: IFailureErrorResponse;
}

export interface IFailureErrorResponse {
	code: number;
	message: string;
	data?: unknown;
}

export interface IError {
	statusCode?: number;
	message: string;
	code?: number;
}

export enum HttpStatusCode {
	TooManyRequests = 429,
}
