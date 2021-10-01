import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function structuresAtLocationQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "structures"];
}

export function useStructuresAtLocation(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		structuresAtLocationQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getStructuresAtLocation(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
