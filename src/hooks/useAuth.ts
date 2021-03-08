import { useCallback, useLayoutEffect, useState } from "react";
import { queryClient } from "../App";
import { ILoginForm } from "../layout/login/LoginForm";
import {
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from "../spacetraders-api";
import { IUser } from "../spacetraders-api/users/types";
import { getUserInfo } from "../spacetraders-api/users/useUserInfo";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";

export interface IAuthStorage {
	username: string;
	token: string;
}

type Login = (values: ILoginForm) => Promise<string | undefined>;
type Logout = () => void;

export function useAuth(): [Login, IUser | undefined, Logout] {
	const [localStorageAuth, setLocalStorageAuth] = useLocalStorage<
		IAuthStorage | undefined
	>(LocalStorageKey.Auth, undefined);

	const [userInfo, setUserInfo] = useState<IUser>();

	useLayoutEffect(() => {
		if (localStorageAuth === undefined) {
			return;
		}

		// Set the Authorization header from local storage when the first opens the app.
		setAuthorizationHeader(localStorageAuth.token);
	}, [localStorageAuth]);

	const login = useCallback(
		async (values: ILoginForm) => {
			// We need to set the Authorization header before attempting to get the user info.
			setAuthorizationHeader(values.token);

			try {
				// If we can successfully get user info, it means the username and token are valid.
				const userInfoResponse = await getUserInfo(values.username);

				setUserInfo(userInfoResponse.user);
			} catch (error) {
				// Since the username or token are invalid, we should remove the Authorization header.
				removeAuthorizationHeader();

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
		[setLocalStorageAuth],
	);

	const logout = useCallback(() => {
		setUserInfo(undefined);
		removeAuthorizationHeader();
		queryClient.invalidateQueries();

		if (localStorageAuth !== undefined) {
			setLocalStorageAuth(undefined);
		}

		// Clear any other items out of local storage.
		window.localStorage.clear();
	}, [localStorageAuth, setLocalStorageAuth]);

	return [login, userInfo, logout];
}
