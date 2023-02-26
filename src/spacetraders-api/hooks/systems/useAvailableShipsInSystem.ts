import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { systemQueryKey } from ".";

export function availableShipsInSystemQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "ship-listings"];
}

export function useAvailableShipsInSystem(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		availableShipsInSystemQueryKey(systemSymbol),
		() => spaceTradersApi.systems.getAvailableShipsInSystem(systemSymbol),
	);
}
