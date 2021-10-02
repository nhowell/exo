import { SpaceTradersApi } from "../..";
import {
	IGetMyFlightPlanResponse,
	ISubmitFlightPlanRequest,
	ISubmitFlightPlanResponse,
} from "./types";

export class MyFlightPlansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

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
