import { userFlightPlanQueryKey } from ".";
import { spaceTradersQueryClient } from "../../spaceTradersQueryClient";
import { setShipArrival } from "../ships/useShip";
import {
	IUserFlightPlan,
	IGetUserFlightPlanResponse,
} from "../../../api/users/flight-plans/types";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function useFlightPlan(flightPlanId: string) {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(
		userFlightPlanQueryKey(spaceTradersApi.getUsername(), flightPlanId),
		() => spaceTradersApi.users.flightPlans.getFlightPlan(flightPlanId),
		{
			onSuccess: (data) =>
				refetchFlightPlanWhenItArrives(
					spaceTradersApi.getUsername(),
					data.flightPlan,
				),
		},
	);
}

export function setFlightPlanQueryData(
	username: string,
	flightPlanResponse: IGetUserFlightPlanResponse,
) {
	spaceTradersQueryClient.setQueryData<IGetUserFlightPlanResponse>(
		userFlightPlanQueryKey(username, flightPlanResponse.flightPlan.id),
		flightPlanResponse,
	);

	refetchFlightPlanWhenItArrives(username, flightPlanResponse.flightPlan);
}

function refetchFlightPlanWhenItArrives(
	username: string,
	flightPlan: IUserFlightPlan,
) {
	if (flightPlan.terminatedAt !== null) {
		return;
	}

	setTimeout(() => {
		spaceTradersQueryClient.refetchQueries(
			userFlightPlanQueryKey(username, flightPlan.id),
		);

		// Optimistically update the ship's arrival.
		setShipArrival(
			username,
			flightPlan.shipId,
			flightPlan.id,
			flightPlan.destination,
		);
	}, flightPlan.timeRemainingInSeconds * 1000);
}
