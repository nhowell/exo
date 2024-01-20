import { createContext, ReactElement } from "react";

import { GameLoading } from "@/components/loading/GameLoading";
import { IAuth, useProvideAuth } from "@/hooks/useProvideAuth";

interface IOwnProps {
	children: ReactElement;
}

export const AuthContext = createContext<IAuth>({
	isAutoLoginLoading: false,
	login: () => {
		return Promise.resolve(undefined);
	},
	currentUser: undefined,
	logout: () => {
		return;
	},
});

export function AuthProvider(props: IOwnProps) {
	const auth = useProvideAuth();

	if (auth.isAutoLoginLoading) {
		return <GameLoading />;
	}

	return (
		<AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
	);
}
