export interface IUserFlightPlan {
	id: string;
	ship: string;
	fuelConsumed: number;
	fuelRemaining: number;
	timeRemainingInSeconds: number;
	arrivesAt: string;
	terminatedAt: string | null;
	destination: string;
	departure: string;
	distance: number;
}
