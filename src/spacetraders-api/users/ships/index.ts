import { userPath, userQueryKey } from "..";

export function userShipQueryKey(username: string, shipId: string): string[] {
	return [...userShipsQueryKey(username), shipId];
}

export function userShipsQueryKey(username: string): string[] {
	return [...userQueryKey(username), "ships"];
}

export function userShipPath(username: string, shipId: string) {
	return `${userShipsPath(username)}/${shipId}`;
}

export function userShipsPath(username: string) {
	return `${userPath(username)}/ships`;
}
