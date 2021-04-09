import { GAME_QUERY_KEY } from "..";

export function locationQueryKey(systemSymbol: string): string[] {
	return [GAME_QUERY_KEY, "locations", systemSymbol];
}

export function locationDockedShipsQueryKey(systemSymbol: string): string[] {
	return [...locationQueryKey(systemSymbol), "ships"];
}
