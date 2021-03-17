import { userPath, userQueryKey } from "..";

export function userShipsQueryKey(username: string): string[] {
	return [...userQueryKey(username), "ships"];
}

export function userShipsPath(username: string) {
	return `${userPath(username)}/ships`;
}
