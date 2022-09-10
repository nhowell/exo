import { shipDockingEfficiencies } from "../app/ships/shipDockingEfficiencies";
import { shipFuelEfficiencies } from "../app/ships/shipFuelEfficiencies";
import { ShipType } from "../spacetraders-api/api/enums";
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
		origin.x,
		origin.y,
		destination.x,
		destination.y,
	);

	return calculateFuelCost(
		distance,
		origin.type,
		getFuelEfficiency(ship.type),
		getDockingEfficiency(ship.type),
	);
}

function getFuelEfficiency(shipType: ShipType): number {
	const fuelEfficiency = shipFuelEfficiencies.get(shipType);

	if (fuelEfficiency === undefined) {
		// If we fail to find the fuel efficiency for the given ship type, then
		// fallback to the worst known fuel efficiency.
		const allFuelEfficiencies = Array.from(shipFuelEfficiencies.values());
		return Math.max(...allFuelEfficiencies);
	}

	return fuelEfficiency;
}

function getDockingEfficiency(shipType: ShipType): number {
	const dockingEfficiency = shipFuelEfficiencies.get(shipType);

	if (dockingEfficiency === undefined) {
		// If we fail to find the docking efficiency for the given ship type, then
		// fallback to the worst known docking efficiency.
		const allDockingEfficiencies = Array.from(shipDockingEfficiencies.values());
		return Math.max(...allDockingEfficiencies);
	}

	return dockingEfficiency;
}
