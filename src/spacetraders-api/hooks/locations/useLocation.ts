import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { locationQueryKey } from ".";

export function useLocation(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getLocation(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
