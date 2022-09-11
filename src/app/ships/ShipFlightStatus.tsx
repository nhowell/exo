import { ReactElement } from "react";
import { TimeRemaining } from "../common/TimeRemaining";
import { useMyFlightPlan } from "../../spacetraders-api/hooks/my/flight-plans/useMyFlightPlan";
import { t } from "../../helpers/translate";
import commonStyles from "../common/common.module.css";
import { QueryResultHandler } from "../common/QueryResultHandler";
import { LocationSymbol } from "../systems/locations/LocationSymbol";

interface IOwnProps {
	flightPlanId: string;
	locationAsLink: boolean;
}

export function ShipFlightStatus(props: IOwnProps): ReactElement {
	const result = useMyFlightPlan(props.flightPlanId);

	return (
		<QueryResultHandler queryResult={result}>
			{(data) =>
				data.flightPlan.terminatedAt !== null ? (
					<>
						{t("Arrived at")}{" "}
						<span className={commonStyles.noWrap}>
							{data.flightPlan.destination}
						</span>
					</>
				) : (
					<>
						{t("In transit from")}{" "}
						<LocationSymbol
							locationSymbol={data.flightPlan.departure}
							asLink={props.locationAsLink}
						/>{" "}
						{t("to")}{" "}
						<LocationSymbol
							locationSymbol={data.flightPlan.destination}
							asLink={props.locationAsLink}
						/>{" "}
						- <TimeRemaining until={data.flightPlan.arrivesAt} />
					</>
				)
			}
		</QueryResultHandler>
	);
}
