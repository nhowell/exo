import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { systemQueryKey } from ".";

export function flightPlansInSystemQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "flight-plans"];
}

export function useFlightPlansInSystem(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		flightPlansInSystemQueryKey(systemSymbol),
		() => spaceTradersApi.systems.getFlightPlansInSystem(systemSymbol),
		{
			staleTime: 0,
		},
	);
}
