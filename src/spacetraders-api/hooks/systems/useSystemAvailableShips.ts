import { systemQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

export function systemAvailableShipsQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "ship-listings"];
}

export function useSystemAvailableShips(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(systemAvailableShipsQueryKey(systemSymbol), () =>
		spaceTradersApi.systems.getAvailableShipsInSystem(systemSymbol),
	);
}
