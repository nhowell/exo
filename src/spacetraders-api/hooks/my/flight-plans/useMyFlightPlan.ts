import { MY_FLIGHT_PLANS_QUERY_KEY } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipArrival } from "../ships/useMyShip";
import {
	IMyFlightPlan,
	IGetMyFlightPlanResponse,
} from "../../../api/my/flight-plans/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function myFlightPlanQueryKey(flightPlanId: string): string[] {
	return [...MY_FLIGHT_PLANS_QUERY_KEY, flightPlanId];
}

export function useMyFlightPlan(flightPlanId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		myFlightPlanQueryKey(flightPlanId),
		() => spaceTradersApi.my.flightPlans.getFlightPlan(flightPlanId),
		{
			onSuccess: (data) => refetchFlightPlanWhenItArrives(data.flightPlan),
		},
	);
}

export function setFlightPlanQueryData(flightPlan: IMyFlightPlan) {
	spaceTradersQueryClient.setQueryData<IGetMyFlightPlanResponse>(
		myFlightPlanQueryKey(flightPlan.id),
		{ flightPlan: flightPlan },
	);

	refetchFlightPlanWhenItArrives(flightPlan);
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
