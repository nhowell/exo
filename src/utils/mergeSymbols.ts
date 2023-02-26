export function mergeSymbols(
	systemSymbol: string,
	locationSymbol: string,
): string {
	return `${systemSymbol}-${locationSymbol}`;
}
