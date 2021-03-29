import { createContext, ReactElement, useMemo } from "react";
import { SpaceTradersApi } from "../spacetraders-api/api";
import { useCurrentUser } from "./hooks/useCurrentUser";

interface IOwnProps {
	children: ReactElement;
}

export const spaceTradersApiContext = createContext<SpaceTradersApi>(
	undefined as any,
);

export function SpaceTradersApiProvider(props: IOwnProps) {
	const { username, token } = useCurrentUser();

	const spaceTradersApi = useMemo(() => {
		return new SpaceTradersApi(username, token);
	}, [token, username]);

	return (
		<spaceTradersApiContext.Provider value={spaceTradersApi}>
			{props.children}
		</spaceTradersApiContext.Provider>
	);
}
