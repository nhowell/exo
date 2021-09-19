import { SpaceTradersApi } from "../..";
import { IGetMyFlightPlanResponse } from "./types";

export class MyFlightPlansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getFlightPlan(flightPlanId: string): Promise<IGetMyFlightPlanResponse> {
		return this.api.get(`${this.getMyFlightPlansPath()}/${flightPlanId}`);
	}

	private getMyFlightPlansPath() {
		return `${this.basePath}/flight-plans`;
	}
}
