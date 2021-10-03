import { ReactElement } from "react";
import { IMyShip, isDocked } from "../../spacetraders-api/api/my/ships/types";
import { ShipDockedCargo } from "./ShipDockedCargo";
import { ShipInFlightCargo } from "./ShipInFlightCargo";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipCargo(props: IOwnProps): ReactElement {
	if (isDocked(props.ship)) {
		return <ShipDockedCargo ship={props.ship} />;
	}

	return <ShipInFlightCargo ship={props.ship} />;
}
