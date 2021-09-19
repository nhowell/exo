import { createContext, ReactElement, useMemo } from "react";
import { SpaceTradersApi } from "../spacetraders-api/api";
import { useCurrentUser } from "./hooks/useCurrentUser";

interface IOwnProps {
	children: ReactElement;
}

export const SpaceTradersApiContext = createContext<SpaceTradersApi>(
	undefined as any,
);

export function SpaceTradersApiProvider(props: IOwnProps) {
	const { token } = useCurrentUser();

	const spaceTradersApi = useMemo(() => {
		return new SpaceTradersApi(token);
	}, [token]);

	return (
		<SpaceTradersApiContext.Provider value={spaceTradersApi}>
			{props.children}
		</SpaceTradersApiContext.Provider>
	);
}
