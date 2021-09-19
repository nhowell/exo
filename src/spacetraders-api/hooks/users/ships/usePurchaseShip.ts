import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { IPurchaseShipRequest } from "../../../api/users/ships/types";
import { setCreditsQueryData } from "../../my/useMyAccountInfo";

export function usePurchaseShip() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IPurchaseShipRequest) =>
			spaceTradersApi.users.ships.purchaseShip(request),
		{
			onSuccess: (data) => {
				// Since purchasing a ship returns the user's credits, we can update
				// the account info query with the new credits to prevent an extra query.
				setCreditsQueryData(data.credits);

				// Since purchasing a ship returns the new ship, we can update
				// the ships query with the new data to prevent an extra query.
				// TODO
			},
		},
	);
}
