import { userQueryKey } from "..";

export function userFlightPlansQueryKey(username: string): string[] {
	return [...userQueryKey(username), "flight-plans"];
}
