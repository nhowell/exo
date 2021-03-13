export const USERS_QUERY_KEY = "users";

export function currentUserPath(username: string) {
	return `/users/${username}`;
}
