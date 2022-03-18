import { SpaceTradersApi } from "..";
import { INetWorthLeaderboardResponse } from "./types";

const path = "/game";

export class GameApiModule {
	constructor(private api: SpaceTradersApi) {
		this.getNetWorthLeaderboard = this.getNetWorthLeaderboard.bind(this);
	}

	getNetWorthLeaderboard(): Promise<INetWorthLeaderboardResponse> {
		return this.api.get(`${path}/leaderboard/net-worth`);
	}
}
