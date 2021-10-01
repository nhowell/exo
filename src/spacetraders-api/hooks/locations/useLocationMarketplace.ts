import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function locationMarketplaceQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "marketplace"];
}

export function useLocationMarketplace(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationMarketplaceQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getLocationMarketplace(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
