import { userPath, userQueryKey } from "..";

export function userFlightPlansQueryKey(username: string): string[] {
	return [...userQueryKey(username), "flight-plans"];
}

export function userFlightPlansPath(username: string) {
	return `${userPath(username)}/flight-plans`;
}
