import { GAME_SYSTEMS_QUERY_KEY } from "..";

export function systemLocationsQueryKey(systemSymbol: string): string[] {
	return [...GAME_SYSTEMS_QUERY_KEY, systemSymbol, "locations"];
}
