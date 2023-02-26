import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { locationQueryKey } from ".";

function dockedShipsAtLocationQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "ships"];
}

export function useDockedShipsAtLocation(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		dockedShipsAtLocationQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getDockedShipsAtLocation(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
