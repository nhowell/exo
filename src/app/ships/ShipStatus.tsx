import { ReactElement } from "react";

import {
	IMyShip,
	isDocked,
	isInFlight,
} from "../../spacetraders-api/api/my/ships/types";
import { t } from "../../utils/translate";
import { LocationSymbol } from "../systems/locations/LocationSymbol";

import { ShipFlightStatus } from "./ShipFlightStatus";

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
