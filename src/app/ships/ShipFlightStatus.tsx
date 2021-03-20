import { ReactElement } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { RelativeTimeRemaining } from "../common/RelativeTimeRemaining";
import { useFlightPlan } from "../../spacetraders-api/users/flight-plans/getFlightPlan";
import { t } from "../../helpers/translate";

interface IOwnProps {
	flightPlanId: string;
}

export function ShipFlightStatus(props: IOwnProps): ReactElement {
	const currentUser = useCurrentUser();
	const { isLoading, isError, error, data: flightPlan } = useFlightPlan(
		currentUser.username,
		props.flightPlanId,
	);

	return isLoading ? (
		<>{t("Loading...")}</>
	) : isError || flightPlan === undefined ? (
		<>{t(error?.message ?? "Something went wrong.")}</>
	) : (
		<>
			In transit to {flightPlan.destination} -{" "}
			<RelativeTimeRemaining endDate={flightPlan.arrivesAt} />
		</>
	);
}
