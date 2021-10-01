import { systemQueryKey } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

export function dockedShipsInSystemQueryKey(systemSymbol: string): string[] {
	return [...systemQueryKey(systemSymbol), "ships"];
}

export function useDockedShipsInSystem(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(dockedShipsInSystemQueryKey(systemSymbol), () =>
		spaceTradersApi.systems.getDockedShipsInSystem(systemSymbol),
	);
}
