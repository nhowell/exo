export interface IGetUserFlightPlanResponse {
	flightPlan: IUserFlightPlan;
}

export interface IUserFlightPlan {
	id: string;
	shipId: string;
	fuelConsumed: number;
	fuelRemaining: number;
	timeRemainingInSeconds: number;
	createdAt: string;
	arrivesAt: string;
	terminatedAt: string | null;
	destination: string;
	departure: string;
	distance: number;
}
