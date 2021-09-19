import { SpaceTradersApi } from "..";
import { UserFlightPlansApiModule } from "./flight-plans/UserFlightPlansApiModule";
import { UserShipsApiModule } from "./ships/UserShipsApiModule";

const path = "/users";

export class UsersApiModule {
	flightPlans: UserFlightPlansApiModule;
	ships: UserShipsApiModule;

	constructor(api: SpaceTradersApi) {
		const currentUserPath = `${path}/${api.getUsername()}`;

		this.flightPlans = new UserFlightPlansApiModule(api, currentUserPath);
		this.ships = new UserShipsApiModule(api, currentUserPath);
	}
}
