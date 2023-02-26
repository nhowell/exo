import { IPlaceOrderRequest } from "../../../api/my/orders/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { setShipQueryData } from "../ships/useMyShip";
import { setCreditsQueryData } from "../useMyAccountInfo";

export function usePlacePurchaseOrder() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: IPlaceOrderRequest) =>
			spaceTradersApi.my.orders.placePurchaseOrder(request),
		{
			onSuccess: (data) => {
				// Since placing a purchase order returns the user's credits, we can update
				// the account info query with the new credits to prevent an extra query.
				setCreditsQueryData(data.credits);

				// Since placing a purchase order returns the ship, we can update
				// the ship query with the new data to prevent an extra query.
				setShipQueryData(data.ship);
			},
		},
	);
}
