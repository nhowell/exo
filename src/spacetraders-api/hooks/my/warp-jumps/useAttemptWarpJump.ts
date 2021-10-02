import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { setFlightPlanQueryData } from "../flight-plans/useMyFlightPlan";
import { setShipDeparture } from "../ships/useMyShip";

export function useAttemptWarpJump() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(shipId: string) => spaceTradersApi.my.warpJumps.attemptWarpJump(shipId),
		{
			onSuccess: (data) => {
				// Since making a warp jump returns the new flight plan, we can set
				// the flight plan query with the new data to prevent an extra query.
				setFlightPlanQueryData(data.flightPlan);

				// Since making a warp jump returns the new flight plan ID, we can set
				// the ship query with the new data to prevent an extra query.
				setShipDeparture(
					data.flightPlan.shipId,
					data.flightPlan.id,
					data.flightPlan.fuelConsumed,
				);
			},
		},
	);
}
