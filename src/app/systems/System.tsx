import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
import { ISystem } from "../../spacetraders-api/api/game/systems/types";
import { Tag } from "../common/Tag";
import { generateViewSystemPath } from "../routes";

interface IOwnProps {
	system: ISystem;
}

export function System(props: IOwnProps): ReactElement {
	return (
		<>
			<h3>
				{props.system.name} <Tag text={props.system.symbol} />
			</h3>

			<p>
				{pluralize(
					props.system.locations.length,
					t("location"),
					t("locations"),
				)}
			</p>

			<p>
				<NavLink to={generateViewSystemPath(props.system.symbol)}>
					{t("View details")}
				</NavLink>
			</p>
		</>
	);
}
