import React, { ReactNode, useMemo } from "react";
import { IAuthStorage } from "./hooks/useAuth";

interface IOwnProps {
	auth: IAuthStorage;
	children: ReactNode;
}

interface ICurrentUserContext {
	username: string;
}

export const CurrentUserContext = React.createContext<ICurrentUserContext>({
	username: "",
});

export function CurrentUserProvider(props: IOwnProps) {
	const currentUser: ICurrentUserContext = useMemo(() => {
		return { username: props.auth.username };
	}, [props.auth.username]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
