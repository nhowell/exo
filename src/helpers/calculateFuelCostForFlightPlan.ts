import { ILocation } from "../spacetraders-api/api/locations/types";
import { IMyDockedShip } from "../spacetraders-api/api/my/ships/types";
import { calculateDistance } from "./calculateDistance";
import { calculateFuelCost } from "./calculateFuelCost";

export function calculateFuelCostForFlightPlan(
	ship: IMyDockedShip,
	origin: ILocation,
	destination: ILocation,
) {
	const distance = calculateDistance(
		ship.x,
		ship.y,
		destination.x,
		destination.y,
	);
	const fuelEfficiency = 1; // TODO
	const dockingEfficiency = 1; // TODO

	return calculateFuelCost(
		distance,
		fuelEfficiency,
		origin.type,
		dockingEfficiency,
	);
}
