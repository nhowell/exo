import produce from "immer";
import { isEqual } from "lodash";
import { locationQueryKey } from ".";
import { IGetStructuresAtLocationResponse } from "../../api/locations/types";
import { IStructure } from "../../api/structures/types";
import { spaceTradersQueryClient } from "../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";

function structuresAtLocationQueryKey(locationSymbol: string): string[] {
	return [...locationQueryKey(locationSymbol), "structures"];
}

export function useStructuresAtLocation(locationSymbol: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		structuresAtLocationQueryKey(locationSymbol),
		() => spaceTradersApi.locations.getStructuresAtLocation(locationSymbol),
		{
			staleTime: 0,
		},
	);
}

export function setStructureInStructuresQueryData(
	locationSymbol: string,
	structure: IStructure,
) {
	const data =
		spaceTradersQueryClient.getQueryData<IGetStructuresAtLocationResponse>(
			structuresAtLocationQueryKey(locationSymbol),
		);

	if (data === undefined) {
		return;
	}

	const newData = produce(data, (draft) => {
		const index = draft.structures.findIndex((x) => x.id === structure.id);

		if (index === -1) {
			draft.structures.push(structure);
		} else {
			draft.structures[index] = structure;
		}
	});

	if (!isEqual(data, newData)) {
		spaceTradersQueryClient.setQueryData<IGetStructuresAtLocationResponse>(
			structuresAtLocationQueryKey(locationSymbol),
			newData,
		);
	}
}
