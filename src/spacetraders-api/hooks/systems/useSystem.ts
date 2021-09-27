import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { systemQueryKey } from ".";

export function useSystem(systemSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(systemQueryKey(systemSymbol), () =>
		spaceTradersApi.systems.getSystemInfo(systemSymbol),
	);
}
