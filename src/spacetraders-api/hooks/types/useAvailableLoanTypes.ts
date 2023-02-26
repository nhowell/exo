import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

import { TYPES_QUERY_KEY } from ".";

const AVAILABLE_LOAN_TYPES_QUERY_KEY = [TYPES_QUERY_KEY, "loans"];

export function useAvailableLoanTypes() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		AVAILABLE_LOAN_TYPES_QUERY_KEY,
		spaceTradersApi.types.getAvailableLoanTypes,
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	);
}
