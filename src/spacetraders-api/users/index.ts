import { spaceTradersApiUsername } from "..";

export const USERS_QUERY_KEY = "users";

export function currentUserPath() {
	return `/users/${spaceTradersApiUsername}`;
}
