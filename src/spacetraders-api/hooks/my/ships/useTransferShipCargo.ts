import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { ITransferCargoRequest } from "../../../api/my/ships/types";
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
				setShipQueryData(data.fromShip);
				setShipQueryData(data.toShip);
			},
		},
	);
}
