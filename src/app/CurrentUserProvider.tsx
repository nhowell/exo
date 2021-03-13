import React, { ReactNode } from "react";
import { ICurrentUser } from "./hooks/useAuth";

interface IOwnProps {
	currentUser: ICurrentUser;
	children: ReactNode;
}

export const CurrentUserContext = React.createContext<ICurrentUser>({
	username: "",
	otherUsernames: [],
});

export function CurrentUserProvider(props: IOwnProps) {
	return (
		<CurrentUserContext.Provider value={props.currentUser}>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
