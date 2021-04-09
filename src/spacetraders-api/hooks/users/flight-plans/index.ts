import { userQueryKey } from "..";

export function userFlightPlanQueryKey(
	username: string,
	flightPlanId: string,
): string[] {
	return [...userQueryKey(username), "flight-plans", flightPlanId];
}
