import { locationQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function locationDockedShipsQueryKey(symbol: string): string[] {
	return [...locationQueryKey(symbol), "ships"];
}

export function useLocationDockedShips(symbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		locationDockedShipsQueryKey(symbol),
		() => spaceTradersApi.locations.getLocationDockedShips(symbol),
		{
			staleTime: 0,
		},
	);
}
