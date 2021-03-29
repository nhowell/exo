import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ILoginForm } from "../layout/login/LoginForm";
import { spaceTradersQueryClient } from "../../spacetraders-api/hooks/spaceTradersQueryClient";
import { checkCredentials } from "../../spacetraders-api/hooks/users/useUserInfo";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";
import { useHistory, useLocation } from "react-router";
import { homePath, loginPath } from "../routes";

interface IAuthState {
	activeUsername: string | null;
	accounts: { [username: string]: IUserCredentials };
}

export interface IUserCredentials {
	username: string;
	token: string;
}

export interface ICurrentUser {
	username: string;
	token: string;
	otherUsernames: string[];
}

export interface IAuth {
	isAutoLoginLoading: boolean;
	login: (values: ILoginForm) => Promise<string | undefined>;
	currentUser: ICurrentUser | undefined;
	logout: () => void;
}

export function useProvideAuth(): IAuth {
	const [localStorageAuth, setLocalStorageAuth] = useLocalStorage<
		IAuthState | undefined
	>(LocalStorageKey.Auth, undefined);

	const [isAutoLoginLoading, setIsAutoLoginLoading] = useState<boolean>(
		localStorageAuth !== undefined && localStorageAuth.activeUsername !== null,
	);

	const { replace: replaceHistory } = useHistory();

	const location = useLocation();

	useLayoutEffect(() => {
		if (
			localStorageAuth === undefined ||
			localStorageAuth.activeUsername === null ||
			!isAutoLoginLoading
		) {
			return;
		}

		const activeUserAuth =
			localStorageAuth.accounts[localStorageAuth.activeUsername];

		async function asyncTask() {
			if (activeUserAuth === undefined) {
				return;
			}

			try {
				await checkCredentials(activeUserAuth.username, activeUserAuth.token);
			} catch {
				// Don't do anything and let the app go to the login page.
			}

			setIsAutoLoginLoading(false);

			if (location.pathname === loginPath) {
				replaceHistory(homePath);
			}
		}

		asyncTask();
	}, [isAutoLoginLoading, localStorageAuth, location.pathname, replaceHistory]);

	const login = useCallback(
		async (values: ILoginForm): Promise<string | undefined> => {
			try {
				await checkCredentials(values.username, values.token);
			} catch (error) {
				// Return the error message to be displayed on the login form.
				return error.message;
			}

			if (localStorageAuth === undefined) {
				setLocalStorageAuth({
					activeUsername: values.username,
					accounts: {
						[values.username]: {
							username: values.username,
							token: values.token,
						},
					},
				});
			} else {
				setLocalStorageAuth({
					activeUsername: values.username,
					accounts: {
						...localStorageAuth.accounts,
						[values.username]: {
							username: values.username,
							token: values.token,
						},
					},
				});
			}

			replaceHistory("/");
		},
		[localStorageAuth, replaceHistory, setLocalStorageAuth],
	);

	const logout = useCallback(() => {
		spaceTradersQueryClient.clear();

		if (localStorageAuth !== undefined) {
			setLocalStorageAuth(undefined);
		}

		// Clear any other items out of local storage.
		window.localStorage.clear();

		replaceHistory(loginPath);
	}, [localStorageAuth, replaceHistory, setLocalStorageAuth]);

	const currentUser = useMemo((): ICurrentUser | undefined => {
		if (
			localStorageAuth === undefined ||
			localStorageAuth.activeUsername === null
		) {
			return;
		}

		return {
			username: localStorageAuth.activeUsername,
			token: localStorageAuth.accounts[localStorageAuth.activeUsername].token,
			otherUsernames: Object.keys(localStorageAuth.accounts)
				.filter((x) => x !== localStorageAuth.activeUsername)
				.sort(),
		};
	}, [localStorageAuth]);

	return { isAutoLoginLoading, login, currentUser, logout };
}
