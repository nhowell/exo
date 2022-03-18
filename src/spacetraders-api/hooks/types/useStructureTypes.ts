import { TYPES_QUERY_KEY } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

const STRUCTURE_TYPES_QUERY_KEY = [TYPES_QUERY_KEY, "structures"];

export function useStructureTypes() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		STRUCTURE_TYPES_QUERY_KEY,
		spaceTradersApi.types.getStructureTypes,
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	);
}
