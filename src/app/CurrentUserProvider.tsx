import React, { ReactNode } from "react";
import { IUser } from "../spacetraders-api/users/types";
import { useUserInfo } from "../spacetraders-api/users/useUserInfo";

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
	const userInfoResult = useUserInfo(
		props.initialUserInfo.username,
		props.initialUserInfo,
	);

	return (
		<CurrentUserContext.Provider
			value={userInfoResult.data?.user ?? props.initialUserInfo}
		>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
