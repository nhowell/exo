import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersMutation } from "../../useSpaceTradersMutation";
import { ISubmitFlightPlanRequest } from "../../../api/my/flight-plans/types";
import { setFlightPlanQueryData } from "./useMyFlightPlan";
import { setShipDeparture } from "../ships/useMyShip";

export function useSubmitFlightPlan() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersMutation(
		(request: ISubmitFlightPlanRequest) =>
			spaceTradersApi.my.flightPlans.submitFlightPlan(request),
		{
			onSuccess: (data) => {
				// Since submitting a flight plan returns the new flight plan, we can set
				// the flight plan query with the new data to prevent an extra query.
				setFlightPlanQueryData(data.flightPlan);

				// Since submitting a flight plan returns the new flight plan ID, we can set
				// the ship query with the new data to prevent an extra query.
				setShipDeparture(data.flightPlan.shipId, data.flightPlan.id);
			},
		},
	);
}
