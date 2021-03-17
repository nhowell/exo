export function userQueryKey(username: string): string[] {
	return ["users", username];
}

export function userPath(username: string) {
	return `/users/${username}`;
}
