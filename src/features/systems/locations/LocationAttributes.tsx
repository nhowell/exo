import { ReactElement } from "react";

import { ILocation } from "@/spacetraders-api/api/locations/types";
import { boolToHumanDisplay } from "@/utils/boolToHumanDisplay";
import { titleCase } from "@/utils/titleCase";
import { t } from "@/utils/translate";

interface IOwnProps {
	location: ILocation;
}

export function LocationAttributes(props: IOwnProps): ReactElement {
	return (
		<dl>
			<div>
				<dt>{t("Type")}:</dt>
				<dd>{t(titleCase(props.location.type))}</dd>
			</div>
			<div>
				<dt>{t("Position")}:</dt>
				<dd>
					{props.location.x}, {props.location.y}
				</dd>
			</div>
			<div>
				<dt>{t("Allows Construction")}:</dt>
				<dd>{boolToHumanDisplay(props.location.allowsConstruction)}</dd>
			</div>
			{props.location.traits.length > 0 && (
				<div>
					<dt>{t("Traits")}:</dt>
					<dd>{props.location.traits.map(titleCase).map(t).join(", ")}</dd>
				</div>
			)}
		</dl>
	);
}
