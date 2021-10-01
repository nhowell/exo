import { ISystemLocationsResponse } from "../../api/systems/types";
import { ISystem } from "../../api/game/systems/types";
import { spaceTradersQueryClient } from "../spaceTradersQueryClient";
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

function setLocationsInSystemQueryData(
	systemSymbol: string,
	systemLocationsResponse: ISystemLocationsResponse,
) {
	spaceTradersQueryClient.setQueryData<ISystemLocationsResponse>(
		locationsInSystemQueryKey(systemSymbol),
		systemLocationsResponse,
	);
}

export function setLocationsInSystemQueryDataForAllSystems(systems: ISystem[]) {
	for (const system of systems) {
		setLocationsInSystemQueryData(system.symbol, {
			locations: system.locations,
		});
	}
}
