import { userPath, userQueryKey } from "..";

export function userLoansQueryKey(username: string): string[] {
	return [...userQueryKey(username), "loans"];
}

export function userLoansPath(username: string) {
	return `${userPath(username)}/loans`;
}
