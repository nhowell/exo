import { SpaceTradersApi } from "..";
import { ShipsApiModule } from "./ships/ShipsApiModule";
import { SystemsApiModule } from "./systems/SystemsApiModule";
import { INetWorthLeaderboardResponse } from "./types";

const path = "/game";

export class GameApiModule {
	ships: ShipsApiModule;
	systems: SystemsApiModule;

	constructor(private api: SpaceTradersApi) {
		this.ships = new ShipsApiModule(api, path);
		this.systems = new SystemsApiModule(api, path);
	}

	getNetWorthLeaderboard(): Promise<INetWorthLeaderboardResponse> {
		return this.api.get(`${path}/leaderboard/net-worth`);
	}
}
