import { ReactElement } from "react";
import { t } from "../../../helpers/translate";
import { ILocation } from "../../../spacetraders-api/api/locations/types";

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
			<div>
				<dt>{t("Allows Construction")}:</dt>
				<dd>{props.location.allowsConstruction ? t("Yes") : t("No")}</dd>
			</div>
			{/* TODO: Add once migrated to new systems endpoints
			 <div>
				<dt>{t("Traits")}:</dt>
				<dd>{props.location.traits.join(", ")}</dd>
			</div> */}
		</dl>
	);
}
