import { createContext, ReactElement, useMemo } from "react";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SpaceTradersApi } from "@/spacetraders-api/api";

interface IOwnProps {
	children: ReactElement;
}

export const SpaceTradersApiContext = createContext<SpaceTradersApi>(
	undefined as unknown as SpaceTradersApi,
);

export function SpaceTradersApiProvider(props: IOwnProps): ReactElement {
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
