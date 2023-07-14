import { SpaceTradersApi } from "../..";

import {
	IGetMyFlightPlanResponse,
	ISubmitFlightPlanRequest,
	ISubmitFlightPlanResponse,
} from "./types";

export class MyFlightPlansApiModule {
	constructor(
		private api: SpaceTradersApi,
		private basePath: string,
	) {
		this.getFlightPlan = this.getFlightPlan.bind(this);
		this.submitFlightPlan = this.submitFlightPlan.bind(this);
	}

	getFlightPlan(flightPlanId: string): Promise<IGetMyFlightPlanResponse> {
		return this.api.get(`${this.getMyFlightPlansPath()}/${flightPlanId}`);
	}

	submitFlightPlan(
		request: ISubmitFlightPlanRequest,
	): Promise<ISubmitFlightPlanResponse> {
		return this.api.post(this.getMyFlightPlansPath(), request);
	}

	private getMyFlightPlansPath() {
		return `${this.basePath}/flight-plans`;
	}
}
