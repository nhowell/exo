import { SpaceTradersApi } from "..";
import { MyLoansApiModule } from "./loans/MyLoansApiModule";
import { IGetMyAccountInfoResponse } from "./types";

const path = "/my";

export class MyApiModule {
	loans: MyLoansApiModule;

	constructor(private api: SpaceTradersApi) {
		this.loans = new MyLoansApiModule(api, path);
	}

	getAccountInfo(): Promise<IGetMyAccountInfoResponse> {
		return this.api.get(`${path}/account`);
	}
}
