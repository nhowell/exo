import { SpaceTradersApi } from "..";
import { MyLoansApiModule } from "./loans/MyLoansApiModule";
import { MyShipsApiModule } from "./ships/MyShipsApiModule";
import { IGetMyAccountInfoResponse } from "./types";

const path = "/my";

export class MyApiModule {
	loans: MyLoansApiModule;
	ships: MyShipsApiModule;

	constructor(private api: SpaceTradersApi) {
		this.loans = new MyLoansApiModule(api, path);
		this.ships = new MyShipsApiModule(api, path);
	}

	getAccountInfo(): Promise<IGetMyAccountInfoResponse> {
		return this.api.get(`${path}/account`);
	}
}
