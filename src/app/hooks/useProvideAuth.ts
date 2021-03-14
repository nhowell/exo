import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ILoginForm } from "../layout/login/LoginForm";
import {
	removeAuthorizationHeader,
	setAuthorizationHeader,
	spaceTradersQueryClient,
} from "../../spacetraders-api";
import { getUserInfo } from "../../spacetraders-api/users/getUserInfo";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";
import { useHistory } from "react-router";
import { loginPath } from "../routes";

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
		localStorageAuth !== undefined,
	);

	const { replace: replaceHistory } = useHistory();

	const setAuthorizationHeaderAndGetUserInfo = useCallback(
		async (auth: IUserCredentials) => {
			// We need to set the Authorization header before attempting to get the user info.
			setAuthorizationHeader(auth);

			try {
				// If we can successfully get user info, it means the username and token are valid.
				await getUserInfo(auth.username);
			} catch (error) {
				// Since the username or token are invalid, we should remove the Authorization header.
				removeAuthorizationHeader();

				throw error;
			}
		},
		[],
	);

	useLayoutEffect(() => {
		if (
			localStorageAuth === undefined ||
			localStorageAuth.activeUsername === null
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
				await setAuthorizationHeaderAndGetUserInfo(activeUserAuth);
			} catch {
				// Don't do anything and let the app go to the login page.
			}

			setIsAutoLoginLoading(false);

			replaceHistory("/");
		}

		asyncTask();
	}, [localStorageAuth, replaceHistory, setAuthorizationHeaderAndGetUserInfo]);

	const login = useCallback(
		async (values: ILoginForm): Promise<string | undefined> => {
			try {
				await setAuthorizationHeaderAndGetUserInfo(values);
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
		[
			localStorageAuth,
			replaceHistory,
			setAuthorizationHeaderAndGetUserInfo,
			setLocalStorageAuth,
		],
	);

	const logout = useCallback(() => {
		removeAuthorizationHeader();
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
			otherUsernames: Object.keys(localStorageAuth.accounts)
				.filter((x) => x !== localStorageAuth.activeUsername)
				.sort(),
		};
	}, [localStorageAuth]);

	return { isAutoLoginLoading, login, currentUser, logout };
}
