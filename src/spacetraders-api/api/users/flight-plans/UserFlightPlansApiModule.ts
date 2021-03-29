import { SpaceTradersApi } from "../..";
import { IGetUserFlightPlanResponse } from "./types";

export class UserFlightPlansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getFlightPlan(flightPlanId: string): Promise<IGetUserFlightPlanResponse> {
		return this.api.get(`${this.basePath}/flight-plans/${flightPlanId}`);
	}
}
