import { setUserInfoQueryData } from "../useUserInfo";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { IPurchaseShipRequest } from "../../../api/users/ships/types";

export function usePurchaseShip() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IPurchaseShipRequest) =>
			spaceTradersApi.users.ships.purchaseShip(request),
		{
			onSuccess: (data) => {
				// Since purchasing a ship returns the entire user object, we can update
				// the user query with the new data to prevent an extra query.
				setUserInfoQueryData(data);
			},
		},
	);
}
