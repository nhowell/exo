import { useAuth } from "./useAuth";

export function useCurrentUser() {
	const auth = useAuth();

	if (auth.currentUser === undefined) {
		throw new Error(
			"Attempting to access currentUser in a scope where it doesn't exist.",
		);
	}

	return auth.currentUser;
}
