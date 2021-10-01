import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../useSpaceTradersMutation";
import { IDepositGoodsToStructureRequest } from "../../api/structures/types";
import { setShipQueryData } from "../my/ships/useMyShip";

export function useDepositGoodsToStructure(structureId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IDepositGoodsToStructureRequest) =>
			spaceTradersApi.structures.depositGoodsToStructure(structureId, request),
		{
			onSuccess: (data) => {
				// Since depositing goods to a structure returns the structure, we can update
				// the structure query with the new data to prevent an extra query.
				// TODO

				// Since depositing goods to a structure returns the ship, we can update
				// the ships query with the new data to prevent an extra query.
				setShipQueryData(data.ship);
			},
		},
	);
}
