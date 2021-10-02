export interface IGetMyFlightPlanResponse {
	flightPlan: IMyFlightPlan;
}

export interface IMyFlightPlan extends IFlightPlanBase {
	fuelConsumed: number;
	fuelRemaining: number;
	timeRemainingInSeconds: number;
	terminatedAt: string | null;
	distance: number;
}

export interface IFlightPlanBase {
	id: string;
	shipId: string;
	createdAt: string;
	arrivesAt: string;
	destination: string;
	departure: string;
}

export interface ISubmitFlightPlanRequest {
	shipId: string;
	destination: string;
}

export interface ISubmitFlightPlanResponse {
	flightPlan: IMyFlightPlan;
}
