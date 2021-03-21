import { useQuery } from "react-query";
import { userFlightPlansPath, userFlightPlansQueryKey } from ".";
import { spaceTradersApi, spaceTradersQueryClient } from "../..";
import { IError } from "../../types";
import { setShipArrival } from "../ships/getShips";
import { IUserFlightPlan } from "./types";

export function getUserFlightPlanQueryKey(
	username: string,
	flightPlanId: string,
): string[] {
	return [...userFlightPlansQueryKey(username), flightPlanId];
}

export function useFlightPlan(username: string, flightPlanId: string) {
	return useQuery<IUserFlightPlan, IError>(
		getUserFlightPlanQueryKey(username, flightPlanId),
		() => getFlightPlan(username, flightPlanId),
	);
}

async function getFlightPlan(username: string, flightPlanId: string) {
	const response = await spaceTradersApi.get<ISuccessResponse>(
		`${userFlightPlansPath(username)}/${flightPlanId}`,
	);

	const flightPlan = response.data.flightPlan;

	refetchFlightPlanWhenItArrives(username, flightPlan);

	return flightPlan;
}

interface ISuccessResponse {
	flightPlan: IUserFlightPlan;
}

export function setFlightPlanQueryData(
	username: string,
	flightPlan: IUserFlightPlan,
) {
	spaceTradersQueryClient.setQueryData<IUserFlightPlan>(
		getUserFlightPlanQueryKey(username, flightPlan.id),
		flightPlan,
	);

	refetchFlightPlanWhenItArrives(username, flightPlan);
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
			getUserFlightPlanQueryKey(username, flightPlan.id),
		);

		// Optimistically update the ship's arrival.
		setShipArrival(
			username,
			flightPlan.ship,
			flightPlan.id,
			flightPlan.destination,
		);
	}, flightPlan.timeRemainingInSeconds * 1000);
}
