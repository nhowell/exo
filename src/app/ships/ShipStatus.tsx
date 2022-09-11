import { ReactElement } from "react";
import { t } from "../../helpers/translate";
import { ShipFlightStatus } from "./ShipFlightStatus";
import {
	IMyShip,
	isDocked,
	isInFlight,
} from "../../spacetraders-api/api/my/ships/types";
import { LocationSymbol } from "../systems/locations/LocationSymbol";

interface IOwnProps {
	ship: IMyShip;
	locationAsLink: boolean;
}

export function ShipStatus(props: IOwnProps): ReactElement {
	if (isDocked(props.ship)) {
		return (
			<>
				{t("Docked at")}{" "}
				<LocationSymbol
					locationSymbol={props.ship.location}
					asLink={props.locationAsLink}
				/>
			</>
		);
	} else if (isInFlight(props.ship)) {
		return (
			<ShipFlightStatus
				flightPlanId={props.ship.flightPlanId}
				locationAsLink={props.locationAsLink}
			/>
		);
	}

	return <>{t("Unknown")}</>;
}
