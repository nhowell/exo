import { useCallback, useLayoutEffect, useState } from "react";
import { queryClient } from "../App";
import { ILoginForm } from "../layout/login/LoginForm";
import {
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from "../../spacetraders-api";
import { IUser } from "../../spacetraders-api/users/types";
import { getUserInfo } from "../../spacetraders-api/users/getUserInfo";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";

export interface IAuth {
	username: string;
	token: string;
}

type Login = (values: ILoginForm) => Promise<string | undefined>;
type Logout = () => void;

export function useAuth(): [boolean, Login, IUser | undefined, Logout] {
	const [localStorageAuth, setLocalStorageAuth] = useLocalStorage<
		IAuth | undefined
	>(LocalStorageKey.Auth, undefined);

	const [isAutoLoginLoading, setIsAutoLoginLoading] = useState<boolean>(
		localStorageAuth !== undefined,
	);

	const [userInfo, setUserInfo] = useState<IUser>();

	const setAuthorizationHeaderAndGetUserInfo = useCallback(
		async (auth: IAuth) => {
			// We need to set the Authorization header before attempting to get the user info.
			setAuthorizationHeader(auth);

			try {
				// If we can successfully get user info, it means the username and token are valid.
				const userInfo = await getUserInfo();

				setUserInfo(userInfo);
			} catch (error) {
				// Since the username or token are invalid, we should remove the Authorization header.
				removeAuthorizationHeader();

				throw error;
			}
		},
		[],
	);

	useLayoutEffect(() => {
		async function asyncTask() {
			if (localStorageAuth === undefined) {
				return;
			}

			try {
				await setAuthorizationHeaderAndGetUserInfo(localStorageAuth);
			} catch {
				// Don't do anything and let the app go to the login page.
			}

			setIsAutoLoginLoading(false);
		}

		asyncTask();
	}, [localStorageAuth, setAuthorizationHeaderAndGetUserInfo]);

	const login = useCallback(
		async (values: ILoginForm): Promise<string | undefined> => {
			try {
				await setAuthorizationHeaderAndGetUserInfo(values);
			} catch (error) {
				// Return the error message to be displayed on the login form.
				return error.message;
			}

			// Ensure we start with a clean local storage when logging in.
			window.localStorage.clear();

			if (values.rememberMe) {
				setLocalStorageAuth({
					username: values.username,
					token: values.token,
				});
			}
		},
		[setAuthorizationHeaderAndGetUserInfo, setLocalStorageAuth],
	);

	const logout = useCallback(() => {
		setUserInfo(undefined);
		removeAuthorizationHeader();
		queryClient.clear();

		if (localStorageAuth !== undefined) {
			setLocalStorageAuth(undefined);
		}

		// Clear any other items out of local storage.
		window.localStorage.clear();
	}, [localStorageAuth, setLocalStorageAuth]);

	return [isAutoLoginLoading, login, userInfo, logout];
}
