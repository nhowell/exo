import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ILoginForm } from "../layout/login/LoginForm";
import { spaceTradersQueryClient } from "../../spacetraders-api/hooks/spaceTradersQueryClient";
import { checkToken } from "../../spacetraders-api/hooks/my/useMyAccountInfo";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";
import { useLocation, useNavigate } from "react-router";
import { dashboardPath, loginPath } from "../routes";

interface IAuthState {
	activeUsername: string | null;
	accounts: { [username: string]: string };
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

	const navigate = useNavigate();

	const location = useLocation();

	useLayoutEffect(() => {
		if (
			localStorageAuth === undefined ||
			localStorageAuth.activeUsername === null ||
			!isAutoLoginLoading
		) {
			return;
		}

		const activeUserToken =
			localStorageAuth.accounts[localStorageAuth.activeUsername];

		async function asyncTask() {
			if (activeUserToken === undefined) {
				return;
			}

			try {
				await checkToken(activeUserToken);
			} catch {
				// Don't do anything and let the app go to the login page.
			}

			setIsAutoLoginLoading(false);

			if (location.pathname === loginPath) {
				navigate(dashboardPath, { replace: true });
			}
		}

		asyncTask();
	}, [isAutoLoginLoading, localStorageAuth, location.pathname, navigate]);

	const login = useCallback(
		async (values: ILoginForm): Promise<string | undefined> => {
			try {
				const accountInfo = await checkToken(values.token);
				const username = accountInfo.user.username;

				if (localStorageAuth === undefined) {
					setLocalStorageAuth({
						activeUsername: username,
						accounts: {
							[username]: values.token,
						},
					});
				} else {
					setLocalStorageAuth({
						activeUsername: username,
						accounts: {
							...localStorageAuth.accounts,
							[username]: values.token,
						},
					});
				}

				navigate(dashboardPath, { replace: true });
			} catch (error: unknown) {
				// Return the error message to be displayed on the login form.
				if (
					typeof error === "object" &&
					error !== null &&
					"message" in error &&
					typeof error.message === "string"
				) {
					return error.message;
				}
				return "Something went wrong.";
			}
		},
		[localStorageAuth, navigate, setLocalStorageAuth],
	);

	const logout = useCallback(() => {
		spaceTradersQueryClient.clear();

		if (localStorageAuth !== undefined) {
			setLocalStorageAuth(undefined);
		}

		// Clear any other items out of local storage.
		window.localStorage.clear();

		navigate(loginPath);
	}, [localStorageAuth, navigate, setLocalStorageAuth]);

	const currentUser = useMemo((): ICurrentUser | undefined => {
		if (
			localStorageAuth === undefined ||
			localStorageAuth.activeUsername === null
		) {
			return;
		}

		return {
			username: localStorageAuth.activeUsername,
			token: localStorageAuth.accounts[localStorageAuth.activeUsername],
			otherUsernames: Object.keys(localStorageAuth.accounts)
				.filter((x) => x !== localStorageAuth.activeUsername)
				.sort(),
		};
	}, [localStorageAuth]);

	return { isAutoLoginLoading, login, currentUser, logout };
}
