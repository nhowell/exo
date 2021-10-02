import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { systemQueryKey } from ".";

export function locationsInSystemQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "locations"];
}

export function useLocationsInSystem(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(locationsInSystemQueryKey(systemSymbol), () =>
		spaceTradersApi.systems.getLocationsInSystem(systemSymbol),
	);
}
