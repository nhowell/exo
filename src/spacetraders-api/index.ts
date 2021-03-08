import axios from "axios";

const BASE_URL = "https://api.spacetraders.io";

export const unauthenticatedSpaceTradersApi = axios.create({
	baseURL: BASE_URL,
});

export const spaceTradersApi = axios.create({
	baseURL: BASE_URL,
});

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
