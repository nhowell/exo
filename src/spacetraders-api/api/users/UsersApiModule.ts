import { SpaceTradersApi } from "..";
import { UserFlightPlansApiModule } from "./flight-plans/UserFlightPlansApiModule";

const path = "/users";

export class UsersApiModule {
	flightPlans: UserFlightPlansApiModule;

	constructor(api: SpaceTradersApi) {
		const currentUserPath = `${path}/${api.getUsername()}`;

		this.flightPlans = new UserFlightPlansApiModule(api, currentUserPath);
	}
}
