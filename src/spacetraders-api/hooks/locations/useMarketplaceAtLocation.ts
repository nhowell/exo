import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { locationQueryKey } from ".";

function marketplaceAtLocationQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "marketplace"];
}

export function useMarketplaceAtLocation(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		marketplaceAtLocationQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getMarketplaceAtLocation(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
