import { ISystemLocationsResponse } from "../../api/systems/types";
import { ISystem } from "../../api/game/systems/types";
import { spaceTradersQueryClient } from "../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { systemQueryKey } from ".";

export function systemLocationsQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "locations"];
}

export function useSystemLocations(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(systemLocationsQueryKey(systemSymbol), () =>
		spaceTradersApi.systems.getLocationsInSystem(systemSymbol),
	);
}

function setSystemLocationQueryData(
	systemSymbol: string,
	systemLocationsResponse: ISystemLocationsResponse,
) {
	spaceTradersQueryClient.setQueryData<ISystemLocationsResponse>(
		systemLocationsQueryKey(systemSymbol),
		systemLocationsResponse,
	);
}

export function setSystemLocationQueryDataForAllSystems(systems: ISystem[]) {
	for (const system of systems) {
		setSystemLocationQueryData(system.symbol, { locations: system.locations });
	}
}
