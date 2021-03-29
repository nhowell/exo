import { userQueryKey } from "..";

export function userShipQueryKey(username: string, shipId: string): string[] {
	return [...userShipsQueryKey(username), shipId];
}

export function userShipsQueryKey(username: string): string[] {
	return [...userQueryKey(username), "ships"];
}
