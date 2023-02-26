import { ShipType } from "@/spacetraders-api/api/enums";
import { ILocation } from "@/spacetraders-api/api/locations/types";
import { IMyDockedShip } from "@/spacetraders-api/api/my/ships/types";

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
	const dockingEfficiency = shipDockingEfficiencies.get(shipType);

	if (dockingEfficiency === undefined) {
		// If we fail to find the docking efficiency for the given ship type, then
		// fallback to the worst known docking efficiency.
		const allDockingEfficiencies = Array.from(shipDockingEfficiencies.values());
		return Math.max(...allDockingEfficiencies);
	}

	return dockingEfficiency;
}

// See: https://discord.com/channels/792864705139048469/1016976560085024860/1017895369604071557
const shipFuelEfficiencies = new Map<ShipType, number>([
	[ShipType.JackshawI, 4],
	[ShipType.JackshawII, 4],
	[ShipType.ZetraII, 3],
	[ShipType.ZetraIII, 3],
	[ShipType.GravagerI, 4],
	[ShipType.GravagerII, 4],
	[ShipType.GravagerIII, 4],
	[ShipType.ElectrumI, 4],
	[ShipType.ElectrumII, 3],
	[ShipType.ElectrumIII, 3],
	[ShipType.ElectrumIV, 2],
	[ShipType.HermesI, 3],
	[ShipType.HermesII, 3],
	[ShipType.HermesIII, 3],
	[ShipType.TiddalikI, 3],
	[ShipType.DradesI, 4],
	[ShipType.ZatashiI, 2],
	[ShipType.ZatashiII, 2],
]);

// See: https://discord.com/channels/792864705139048469/1016976560085024860/1017895369604071557
const shipDockingEfficiencies = new Map<ShipType, number>([
	[ShipType.JackshawI, 2],
	[ShipType.JackshawII, 2],
	[ShipType.ZetraII, 1],
	[ShipType.ZetraIII, 1],
	[ShipType.GravagerI, 2],
	[ShipType.GravagerII, 3],
	[ShipType.GravagerIII, 4],
	[ShipType.ElectrumI, 2],
	[ShipType.ElectrumII, 1],
	[ShipType.ElectrumIII, 1],
	[ShipType.ElectrumIV, 1],
	[ShipType.HermesI, 1],
	[ShipType.HermesII, 1],
	[ShipType.HermesIII, 1],
	[ShipType.TiddalikI, 4],
	[ShipType.DradesI, 4],
	[ShipType.ZatashiI, 1],
	[ShipType.ZatashiII, 1],
]);
