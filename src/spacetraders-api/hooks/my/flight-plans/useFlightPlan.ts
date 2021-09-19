import { myFlightPlanQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipArrival } from "../ships/useShip";
import {
	IMyFlightPlan,
	IGetMyFlightPlanResponse,
} from "../../../api/my/flight-plans/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function useFlightPlan(flightPlanId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		myFlightPlanQueryKey(flightPlanId),
		() => spaceTradersApi.my.flightPlans.getFlightPlan(flightPlanId),
		{
			onSuccess: (data) => refetchFlightPlanWhenItArrives(data.flightPlan),
		},
	);
}

export function setFlightPlanQueryData(
	flightPlanResponse: IGetMyFlightPlanResponse,
) {
	spaceTradersQueryClient.setQueryData<IGetMyFlightPlanResponse>(
		myFlightPlanQueryKey(flightPlanResponse.flightPlan.id),
		flightPlanResponse,
	);

	refetchFlightPlanWhenItArrives(flightPlanResponse.flightPlan);
}

function refetchFlightPlanWhenItArrives(flightPlan: IMyFlightPlan) {
	if (flightPlan.terminatedAt !== null) {
		return;
	}

	setTimeout(() => {
		spaceTradersQueryClient.refetchQueries(myFlightPlanQueryKey(flightPlan.id));

		// Optimistically update the ship's arrival.
		setShipArrival(flightPlan.shipId, flightPlan.id, flightPlan.destination);
	}, flightPlan.timeRemainingInSeconds * 1000);
}
