import { userQueryKey } from "..";

export function userLoansQueryKey(username: string): string[] {
	return [...userQueryKey(username), "loans"];
}
