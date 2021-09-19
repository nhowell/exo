import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

export function useLocation(symbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationQueryKey(symbol),
		() => spaceTradersApi.locations.getLocation(symbol),
		{
			staleTime: 0,
		},
	);
}
