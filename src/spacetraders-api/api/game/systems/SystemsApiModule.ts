import { SpaceTradersApi } from "../..";
import { ISystemsResponse } from "./types";

export class SystemsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getSystems(): Promise<ISystemsResponse> {
		return this.api.get(this.getSystemsPath());
	}

	private getSystemsPath() {
		return `${this.basePath}/systems`;
	}
}
