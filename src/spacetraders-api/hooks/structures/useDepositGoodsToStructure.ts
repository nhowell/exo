import { IDepositGoodsToStructureRequest } from "../../api/structures/types";
import { setStructureInStructuresQueryData } from "../locations/useStructuresAtLocation";
import { setShipQueryData } from "../my/ships/useMyShip";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../useSpaceTradersMutation";

export function useDepositGoodsToStructure(structureId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IDepositGoodsToStructureRequest) =>
			spaceTradersApi.structures.depositGoodsToStructure(structureId, request),
		{
			onSuccess: (data) => {
				// Since depositing goods to a structure returns the structure, we can update
				// the structure query with the new data to prevent an extra query.
				if (data.ship.location !== undefined) {
					setStructureInStructuresQueryData(data.ship.location, data.structure);
				}

				// Since depositing goods to a structure returns the ship, we can update
				// the ships query with the new data to prevent an extra query.
				setShipQueryData(data.ship);
			},
		},
	);
}
