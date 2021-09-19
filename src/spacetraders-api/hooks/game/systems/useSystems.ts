import { GAME_SYSTEMS_QUERY_KEY } from ".";
import { ISystem } from "../../../api/game/systems/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";
import { setSystemLocationQueryDataForAllSystems } from "./locations/useSystemLocations";

export function useSystems() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		GAME_SYSTEMS_QUERY_KEY,
		() => spaceTradersApi.game.systems.getSystems(),
		{
			// TODO: fix this once updated to the new endpoints
			// onSuccess: (data) => updateRelatedQueryData(data.systems),
		},
	);
}

// The list of systems and the system locations endpoints return the same data,
// so we want to keep them in sync.
function updateRelatedQueryData(systems: ISystem[]) {
	setSystemLocationQueryDataForAllSystems(systems);
}
