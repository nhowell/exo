import { systemLocationsQueryKey } from ".";
import { ISystemLocationsResponse } from "../../../../api/game/systems/locations/types";
import { ISystem } from "../../../../api/game/systems/types";
import { spaceTradersQueryClient } from "../../../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../../useSpaceTradersQuery";

export function useSystemLocations(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(systemLocationsQueryKey(systemSymbol), () =>
		spaceTradersApi.game.systems.locations.getLocationsInSystem(systemSymbol),
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
