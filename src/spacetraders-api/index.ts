import axios from "axios";
import { isAxiosError } from "../utilities/isAxiosError";
import { IFailureResponse } from "./types";

const BASE_URL = "https://api.spacetraders.io";

export const unauthenticatedSpaceTradersApi = axios.create({
	baseURL: BASE_URL,
});

unauthenticatedSpaceTradersApi.interceptors.response.use(
	undefined,
	errorInterceptor,
);

export const spaceTradersApi = axios.create({
	baseURL: BASE_URL,
});

spaceTradersApi.interceptors.response.use(undefined, errorInterceptor);

function errorInterceptor(error: any) {
	if (isAxiosError(error) && error.response?.data) {
		if (typeof error.response.data === "string") {
			return Promise.reject(error.response.data);
		} else if (isStandardFailureResponse(error.response?.data)) {
			return Promise.reject(error.response.data.error.message);
		}
	}

	return Promise.reject("Something went wrong.");
}

function isStandardFailureResponse(
	response: any,
): response is IFailureResponse {
	return (
		response?.error !== undefined &&
		response.error.code &&
		response.error.message
	);
}

export function setAuthorizationHeader(token: string) {
	spaceTradersApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
	spaceTradersApi.defaults.headers.common["Authorization"] = undefined;
}

export interface IError {
	code?: number;
	message: string;
}
