export function locationQueryKey(symbol: string): string[] {
	return ["locations", symbol];
}

export function locationDockedShipsQueryKey(symbol: string): string[] {
	return [...locationQueryKey(symbol), "ships"];
}
