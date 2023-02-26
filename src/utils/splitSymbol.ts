export function splitSymbol(symbol: string): ILocationSymbol {
	const splitIndex = symbol.indexOf("-");

	if (splitIndex === -1) {
		return { systemSymbol: symbol, locationSymbolWithoutSystem: "" };
	}

	return {
		systemSymbol: symbol.substring(0, splitIndex),
		locationSymbolWithoutSystem: symbol.substring(splitIndex + 1),
	};
}

interface ILocationSymbol {
	systemSymbol: string;
	locationSymbolWithoutSystem: string;
}
