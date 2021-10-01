import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function locationDockedShipsQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "ships"];
}

export function useLocationDockedShips(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationDockedShipsQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getLocationDockedShips(locationSymbol),
		{
			staleTime: 0,
		},
	);
}
