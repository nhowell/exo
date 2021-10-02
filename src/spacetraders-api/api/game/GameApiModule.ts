import { SpaceTradersApi } from "..";
import { INetWorthLeaderboardResponse } from "./types";

const path = "/game";

export class GameApiModule {
	constructor(private api: SpaceTradersApi) {}

	getNetWorthLeaderboard(): Promise<INetWorthLeaderboardResponse> {
		return this.api.get(`${path}/leaderboard/net-worth`);
	}
}
