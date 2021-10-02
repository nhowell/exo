import { SpaceTradersApi } from "../..";
import { IAttemptWarpJumpResponse } from "./types";

export class MyWarpJumpsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	attemptWarpJump(shipId: string): Promise<IAttemptWarpJumpResponse> {
		return this.api.post(this.getMyWarpJumpsPath(), { shipId });
	}

	private getMyWarpJumpsPath() {
		return `${this.basePath}/warp-jumps`;
	}
}
