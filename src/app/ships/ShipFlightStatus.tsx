import { ReactElement } from "react";
import { TimeRemaining } from "../common/TimeRemaining";
import { useMyFlightPlan } from "../../spacetraders-api/hooks/my/flight-plans/useMyFlightPlan";
import { t } from "../../helpers/translate";
import commonStyles from "../common/common.module.css";

interface IOwnProps {
	flightPlanId: string;
}

export function ShipFlightStatus(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useMyFlightPlan(
		props.flightPlanId,
	);

	return isLoading ? (
		<>{t("Loading...")}</>
	) : isError || data === undefined ? (
		<>{t(error?.message ?? "Something went wrong.")}</>
	) : data.flightPlan.terminatedAt !== null ? (
		<>
			{t("Arrived at")}{" "}
			<span className={commonStyles.noWrap}>{data.flightPlan.destination}</span>
		</>
	) : (
		<>
			{t("In transit from")}{" "}
			<span className={commonStyles.noWrap}>{data.flightPlan.departure}</span>{" "}
			{t("to")}{" "}
			<span className={commonStyles.noWrap}>{data.flightPlan.destination}</span>{" "}
			- <TimeRemaining until={data.flightPlan.arrivesAt} />
		</>
	);
}
