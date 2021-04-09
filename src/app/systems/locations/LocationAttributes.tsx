import { ReactElement } from "react";
import { t } from "../../../helpers/translate";
import { ILocation } from "../../../spacetraders-api/api/game/locations/types";

interface IOwnProps {
	location: ILocation;
}

export function LocationAttributes(props: IOwnProps): ReactElement {
	return (
		<dl>
			<div>
				<dt>{t("Type")}:</dt>
				<dd>{props.location.type}</dd>
			</div>
			<div>
				<dt>{t("Position")}:</dt>
				<dd>
					{props.location.x}, {props.location.y}
				</dd>
			</div>
		</dl>
	);
}
