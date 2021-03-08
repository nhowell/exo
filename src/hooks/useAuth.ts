import { useCallback, useLayoutEffect, useState } from "react";
import { queryClient } from "../App";
import { ILoginForm } from "../layout/login/LoginForm";
import {
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from "../spacetraders-api";
import { LocalStorageKey, useLocalStorage } from "./useLocalStorage";

export interface IAuthStorage {
	username: string;
	token: string;
}

type Login = (values: ILoginForm) => void;
type Logout = () => void;

export function useAuth(): [IAuthStorage | undefined, Login, Logout] {
	const [localStorageAuth, setLocalStorageAuth] = useLocalStorage<
		IAuthStorage | undefined
	>(LocalStorageKey.Auth, undefined);

	const [auth, setAuth] = useState<IAuthStorage | undefined>(localStorageAuth);

	useLayoutEffect(() => {
		if (localStorageAuth === undefined) {
			return;
		}

		// Set the Authorization header from local storage when the first opens the app.
		setAuthorizationHeader(localStorageAuth.token);
	}, [localStorageAuth]);

	const login = useCallback(
		(values: ILoginForm) => {
			setAuth(values);
			setAuthorizationHeader(values.token);

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
		setAuth(undefined);
		removeAuthorizationHeader();
		queryClient.invalidateQueries();

		if (localStorageAuth !== undefined) {
			setLocalStorageAuth(undefined);
		}
	}, [localStorageAuth, setLocalStorageAuth]);

	return [auth, login, logout];
}
