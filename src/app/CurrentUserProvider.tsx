import React, { ReactNode } from "react";
import { IUser } from "../spacetraders-api/users/types";

interface IOwnProps {
	initialUserInfo: IUser;
	children: ReactNode;
}

export const CurrentUserContext = React.createContext<IUser>({
	username: "",
	credits: 0,
	loans: [],
	ships: [],
});

export function CurrentUserProvider(props: IOwnProps) {
	return (
		<CurrentUserContext.Provider value={props.initialUserInfo}>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
