import { LocationType } from "@/spacetraders-api/api/enums";

// See: https://discord.com/channels/792864705139048469/1016976560085024860/1016977739498127421
export function calculateFuelCost(
	distance: number,
	originLocationType: LocationType,
	fuelEfficiency: number,
	dockingEfficiency: number,
) {
	return (
		getFuelCost(distance, fuelEfficiency) +
		getDockingCost(originLocationType, dockingEfficiency)
	);
}

function getFuelCost(distance: number, fuelEfficiency: number) {
	return Math.round((distance * fuelEfficiency) / 30);
}

function getDockingCost(
	originLocationType: LocationType,
	shipDockingEfficiency: number,
) {
	const hasUndockingCost = originLocationType === LocationType.Planet;
	return (hasUndockingCost ? shipDockingEfficiency : 0) + 1;
}
