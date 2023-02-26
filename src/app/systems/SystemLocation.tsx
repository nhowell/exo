import { ReactElement } from "react";

import { ILocation } from "../../spacetraders-api/api/locations/types";

import { LocationAttributes } from "./locations/LocationAttributes";
import { LocationMessages } from "./locations/LocationMessages";
import { LocationName } from "./locations/LocationName";

interface IOwnProps {
	location: ILocation;
}

export function SystemLocation(props: IOwnProps): ReactElement {
	return (
		<>
			<h3>
				<LocationName
					name={props.location.name}
					symbol={props.location.symbol}
				/>
			</h3>

			<LocationAttributes location={props.location} />

			<LocationMessages location={props.location} />
		</>
	);
}
