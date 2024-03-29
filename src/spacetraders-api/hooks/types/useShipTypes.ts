import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { TYPES_QUERY_KEY } from ".";

const SHIP_TYPES_QUERY_KEY = [TYPES_QUERY_KEY, "ships"];

export function useShipTypes() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		SHIP_TYPES_QUERY_KEY,
		spaceTradersApi.types.getShipTypes,
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	);
}
