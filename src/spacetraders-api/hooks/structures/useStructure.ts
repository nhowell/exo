import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { structureQueryKey } from ".";

export function useStructure(structureId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(structureQueryKey(structureId), () =>
		spaceTradersApi.structures.getStructure(structureId),
	);
}
