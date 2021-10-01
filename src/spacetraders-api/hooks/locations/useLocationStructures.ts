import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function locationStructuresQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "structures"];
}

export function useLocationStructures(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationStructuresQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getLocationStructures(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
