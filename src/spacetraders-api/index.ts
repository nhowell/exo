import axios from "axios";
import { QueryClient } from "react-query";
import { IUserCredentials } from "../app/hooks/useProvideAuth";
import { isAxiosError } from "../utilities/isAxiosError";
import { HttpStatusCode, IError, IFailureResponse } from "./types";

export const spaceTradersQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Default to a long cache and stale time, so this will force caching
			// by default. When a particular query doesn't want it's data cached,
			// it should override this.
			cacheTime: 60_000 * 60, // 60 minutes
			staleTime: Infinity,
			retry: (failureCount, error) => {
				if (isStandardError(error) && error.statusCode !== undefined) {
					if (error.statusCode === HttpStatusCode.TooManyRequests) {
						// We should retry if we hit the request limit.
						return true;
					} else if (error.statusCode >= 400 && error.statusCode < 500) {
						// Never retry other client side errors.
						return false;
					}
				}

				return failureCount < 3;
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
	},
});

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
	const result: IError = {
		message: "Something went wrong.",
	};

	if (isAxiosError(error)) {
		result.statusCode = error.response?.status;
		if (error.response?.data) {
			if (typeof error.response.data === "string") {
				result.message = error.response.data;
			} else if (isStandardFailureResponse(error.response?.data)) {
				result.message = error.response.data.error.message;
				result.code = error.response.data.error.code;
			}
		}
	}

	return Promise.reject(result);
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

function isStandardError(error: any): error is IError {
	return error != null && typeof error.message === "string";
}

export function setAuthorizationHeader(auth: IUserCredentials) {
	spaceTradersApi.defaults.headers.common[
		"Authorization"
	] = `Bearer ${auth.token}`;
}

export function removeAuthorizationHeader() {
	spaceTradersApi.defaults.headers.common["Authorization"] = undefined;
}
