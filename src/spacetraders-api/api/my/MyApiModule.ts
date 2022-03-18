import { SpaceTradersApi } from "..";
import { MyFlightPlansApiModule } from "./flight-plans/MyFlightPlansApiModule";
import { MyLoansApiModule } from "./loans/MyLoansApiModule";
import { MyOrdersApiModule } from "./orders/MyOrdersApiModule";
import { MyShipsApiModule } from "./ships/MyShipsApiModule";
import { IGetMyAccountInfoResponse } from "./types";
import { MyWarpJumpsApiModule } from "./warp-jumps/MyWarpJumpsApiModule";

const path = "/my";

export class MyApiModule {
	flightPlans: MyFlightPlansApiModule;
	loans: MyLoansApiModule;
	orders: MyOrdersApiModule;
	ships: MyShipsApiModule;
	warpJumps: MyWarpJumpsApiModule;

	constructor(private api: SpaceTradersApi) {
		this.flightPlans = new MyFlightPlansApiModule(api, path);
		this.loans = new MyLoansApiModule(api, path);
		this.orders = new MyOrdersApiModule(api, path);
		this.ships = new MyShipsApiModule(api, path);
		this.warpJumps = new MyWarpJumpsApiModule(api, path);

		this.getAccountInfo = this.getAccountInfo.bind(this);
	}

	getAccountInfo(): Promise<IGetMyAccountInfoResponse> {
		return this.api.get(`${path}/account`);
	}
}
