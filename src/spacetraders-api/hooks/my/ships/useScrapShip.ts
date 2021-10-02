import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { adjustCreditsQueryData } from "../useMyAccountInfo";
import { removeShipFromShipsQueryData } from "./useMyShips";

export function useScrapShip() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(shipId: string) => spaceTradersApi.my.ships.scrapShip(shipId),
		{
			onSuccess: (data, shipId) => {
				// Since scrapping a ship returns the sale price, we can update
				// the account info query with the new credits to prevent an extra query.
				adjustCreditsQueryData(data.salePrice);

				// Since scrapping a ship deletes the ship, we can update
				// the ships query to prevent an extra query.
				removeShipFromShipsQueryData(shipId);
			},
		},
	);
}
