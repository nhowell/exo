import { SpaceTradersApi } from "..";
import { LoansApiModule } from "./loans/LoansApiModule";
import { ShipsApiModule } from "./ships/ShipsApiModule";

const path = "/game";

export class GameApiModule {
	loans: LoansApiModule;
	ships: ShipsApiModule;

	constructor(api: SpaceTradersApi) {
		this.loans = new LoansApiModule(api, path);
		this.ships = new ShipsApiModule(api, path);
	}
}
