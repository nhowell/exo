import { SpaceTradersApi } from "..";
import { ShipsApiModule } from "./ships/ShipsApiModule";
import { SystemsApiModule } from "./systems/SystemsApiModule";

const path = "/game";

export class GameApiModule {
	ships: ShipsApiModule;
	systems: SystemsApiModule;

	constructor(api: SpaceTradersApi) {
		this.ships = new ShipsApiModule(api, path);
		this.systems = new SystemsApiModule(api, path);
	}
}
