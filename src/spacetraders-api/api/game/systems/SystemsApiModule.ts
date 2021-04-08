import { SpaceTradersApi } from "../..";
import { SystemLocationsApiModule } from "./locations/SystemLocationsApiModule";
import { ISystemsResponse } from "./types";

export class SystemsApiModule {
	locations: SystemLocationsApiModule;

	constructor(private api: SpaceTradersApi, private basePath: string) {
		const path = this.getSystemsPath();

		this.locations = new SystemLocationsApiModule(api, path);
	}

	getSystems(): Promise<ISystemsResponse> {
		return this.api.get(this.getSystemsPath());
	}

	private getSystemsPath() {
		return `${this.basePath}/systems`;
	}
}
