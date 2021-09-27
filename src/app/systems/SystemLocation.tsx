import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ILocation } from "../../spacetraders-api/api/locations/types";
import { LocationName } from "./locations/LocationName";
import { LocationAttributes } from "./locations/LocationAttributes";
import { generateViewLocationPath } from "../routes";
import { LocationMessages } from "./locations/LocationMessages";
import { t } from "../../helpers/translate";

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

			<p>
				<NavLink to={generateViewLocationPath(props.location.symbol)}>
					{t("View details")}
				</NavLink>
			</p>
		</>
	);
}
