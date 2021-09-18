import { TYPES_QUERY_KEY } from ".";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

const GOOD_TYPES_QUERY_KEY = [TYPES_QUERY_KEY, "goods"];

export function useGoodTypes() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(GOOD_TYPES_QUERY_KEY, () =>
		spaceTradersApi.types.getGoodTypes(),
	);
}
