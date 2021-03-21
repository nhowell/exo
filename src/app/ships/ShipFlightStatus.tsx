import { ReactElement } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { TimeRemaining } from "../common/TimeRemaining";
import { useFlightPlan } from "../../spacetraders-api/users/flight-plans/getFlightPlan";
import { t } from "../../helpers/translate";
import commonStyles from "../common/common.module.css";

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
	) : flightPlan.terminatedAt !== null ? (
		<>
			{t("Arrived at")}{" "}
			<span className={commonStyles.noWrap}>{flightPlan.destination}</span>
		</>
	) : (
		<>
			In transit to{" "}
			<span className={commonStyles.noWrap}>{flightPlan.destination}</span> -{" "}
			<TimeRemaining until={flightPlan.arrivesAt} />
		</>
	);
}
