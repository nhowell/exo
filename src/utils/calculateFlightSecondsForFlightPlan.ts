import { ILocation } from "../spacetraders-api/api/locations/types";
import { IMyDockedShip } from "../spacetraders-api/api/my/ships/types";

import { calculateDistance } from "./calculateDistance";
import { calculateFlightSeconds } from "./calculateFlightSeconds";

export function calculateFlightSecondsForFlightPlan(
	ship: IMyDockedShip,
	origin: ILocation,
	destination: ILocation,
) {
	const distance = calculateDistance(
		origin.x,
		origin.y,
		destination.x,
		destination.y,
	);

	return calculateFlightSeconds(distance, ship.speed);
}
