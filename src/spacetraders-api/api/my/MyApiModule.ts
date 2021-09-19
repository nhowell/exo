import { SpaceTradersApi } from "..";
import { MyFlightPlansApiModule } from "./flight-plans/MyFlightPlansApiModule";
import { MyLoansApiModule } from "./loans/MyLoansApiModule";
import { MyShipsApiModule } from "./ships/MyShipsApiModule";
import { IGetMyAccountInfoResponse } from "./types";

const path = "/my";

export class MyApiModule {
	flightPlans: MyFlightPlansApiModule;
	loans: MyLoansApiModule;
	ships: MyShipsApiModule;

	constructor(private api: SpaceTradersApi) {
		this.flightPlans = new MyFlightPlansApiModule(api, path);
		this.loans = new MyLoansApiModule(api, path);
		this.ships = new MyShipsApiModule(api, path);
	}

	getAccountInfo(): Promise<IGetMyAccountInfoResponse> {
		return this.api.get(`${path}/account`);
	}
}