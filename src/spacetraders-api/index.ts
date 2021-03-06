import axios from "axios";

export const spaceTradersApi = axios.create({
	baseURL: "https://api.spacetraders.io",
});

export function setAuthorizationHeader(token: string) {
	spaceTradersApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
	spaceTradersApi.defaults.headers.common["Authorization"] = undefined;
}
