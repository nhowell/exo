import { SpaceTradersApi } from "..";
import { LoansApiModule } from "./loans/LoansApiModule";
import { LocationsApiModule } from "./locations/LocationsApiModule";
import { ShipsApiModule } from "./ships/ShipsApiModule";
import { SystemsApiModule } from "./systems/SystemsApiModule";

const path = "/game";

export class GameApiModule {
	loans: LoansApiModule;
	locations: LocationsApiModule;
	ships: ShipsApiModule;
	systems: SystemsApiModule;

	constructor(api: SpaceTradersApi) {
		this.loans = new LoansApiModule(api, path);
		this.locations = new LocationsApiModule(api, path);
		this.ships = new ShipsApiModule(api, path);
		this.systems = new SystemsApiModule(api, path);
	}
}
