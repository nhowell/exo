import { ITransferCargoRequest } from "../../../api/my/ships/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";

import { setShipQueryData } from "./useMyShip";

export function useTransferShipCargo(fromShipId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: ITransferCargoRequest) =>
			spaceTradersApi.my.ships.transferCargo(fromShipId, request),
		{
			onSuccess: (data) => {
				// Since transferring cargo returns both ships, we can update
				// the ship query with the new data to prevent extra queries.
				// Note: Some of the fields are missing, so we'll do a merge of the data.
				setShipQueryData(data.fromShip, true, true);
				setShipQueryData(data.toShip, true, true);
			},
		},
	);
}
