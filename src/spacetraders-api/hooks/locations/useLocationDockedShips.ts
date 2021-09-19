import { locationDockedShipsQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

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
