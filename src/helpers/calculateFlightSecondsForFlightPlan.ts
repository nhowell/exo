import { ILocation } from "../spacetraders-api/api/locations/types";
import { IMyDockedShip } from "../spacetraders-api/api/my/ships/types";
import { calculateDistance } from "./calculateDistance";
import { calculateFlightSeconds } from "./calculateFlightSeconds";

export function calculateFlightSecondsForFlightPlan(
	ship: IMyDockedShip,
	location: ILocation,
) {
	const distance = calculateDistance(ship.x, ship.y, location.x, location.y);

	return calculateFlightSeconds(distance, ship.speed);
}
