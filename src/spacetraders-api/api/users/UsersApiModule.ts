import { SpaceTradersApi } from "..";
import { UserFlightPlansApiModule } from "./flight-plans/UserFlightPlansApiModule";
import { UserShipsApiModule } from "./ships/UserShipsApiModule";
import { IGetUserInfoResponse } from "./types";

const path = "/users";

export class UsersApiModule {
	flightPlans: UserFlightPlansApiModule;
	ships: UserShipsApiModule;

	constructor(private api: SpaceTradersApi) {
		const currentUserPath = `${path}/${api.getUsername()}`;

		this.flightPlans = new UserFlightPlansApiModule(api, currentUserPath);
		this.ships = new UserShipsApiModule(api, currentUserPath);
	}

	getUserInfo(): Promise<IGetUserInfoResponse> {
		// Normally axios encodes things for us, but in the edge case that the
		// username has a space at the end, axios trims off the space instead of
		// encoding it. When we manually encode it we can avoid this.
		const encodedUsername = encodeURIComponent(this.api.getUsername());

		return this.api.get(`${path}/${encodedUsername}`);
	}
}
