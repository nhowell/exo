import { SpaceTradersApi } from "..";
import { LoansApiModule } from "./loans/LoansApiModule";
import { ShipsApiModule } from "./ships/ShipsApiModule";
import { SystemsApiModule } from "./systems/SystemsApiModule";

const path = "/game";

export class GameApiModule {
	loans: LoansApiModule;
	ships: ShipsApiModule;
	systems: SystemsApiModule;

	constructor(api: SpaceTradersApi) {
		this.loans = new LoansApiModule(api, path);
		this.ships = new ShipsApiModule(api, path);
		this.systems = new SystemsApiModule(api, path);
	}
}
