export interface IFailureResponse {
	error: IFailureErrorResponse;
}

export interface IFailureErrorResponse {
	code: number;
	message: string;
}
