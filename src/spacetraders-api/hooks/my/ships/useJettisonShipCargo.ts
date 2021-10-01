import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { IJettisonCargoRequest } from "../../../api/my/ships/types";
import { setShipGoodQuantity } from "./useMyShip";

export function useJettisonShipCargo(fromShipId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IJettisonCargoRequest) =>
			spaceTradersApi.my.ships.jettisonCargo(fromShipId, request),
		{
			onSuccess: (data) => {
				// Since jettisoning cargo returns the remaining cargo, we can update
				// the ship query with the new quantity to prevent an extra query.
				setShipGoodQuantity(data.shipId, data.good, data.quantityRemaining);
			},
		},
	);
}
