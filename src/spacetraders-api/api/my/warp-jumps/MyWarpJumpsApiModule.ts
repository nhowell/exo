import { SpaceTradersApi } from "../..";

import { IAttemptWarpJumpResponse } from "./types";

export class MyWarpJumpsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {
		this.attemptWarpJump = this.attemptWarpJump.bind(this);
	}

	attemptWarpJump(shipId: string): Promise<IAttemptWarpJumpResponse> {
		return this.api.post(this.getMyWarpJumpsPath(), { shipId });
	}

	private getMyWarpJumpsPath() {
		return `${this.basePath}/warp-jumps`;
	}
}
