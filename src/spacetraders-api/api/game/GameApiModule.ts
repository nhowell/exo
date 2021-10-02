import { SpaceTradersApi } from "..";
import { ShipsApiModule } from "./ships/ShipsApiModule";
import { INetWorthLeaderboardResponse } from "./types";

const path = "/game";

export class GameApiModule {
	ships: ShipsApiModule;

	constructor(private api: SpaceTradersApi) {
		this.ships = new ShipsApiModule(api, path);
	}

	getNetWorthLeaderboard(): Promise<INetWorthLeaderboardResponse> {
		return this.api.get(`${path}/leaderboard/net-worth`);
	}
}
