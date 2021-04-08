import { ReactElement } from "react";
import { t } from "../../helpers/translate";
import { ILocation } from "../../spacetraders-api/api/game/locations/types";
import { Tag } from "../common/Tag";
import commonStyles from "../common/common.module.css";

interface IOwnProps {
	location: ILocation;
}

export function SystemLocation(props: IOwnProps): ReactElement {
	return (
		<>
			<h3>
				{props.location.name} <Tag text={props.location.symbol} />
			</h3>

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

			{props.location.messages === undefined
				? null
				: props.location.messages.map((message, i) => (
						<p key={i} className={commonStyles.overflowWordWrap}>
							{message}
						</p>
				  ))}
		</>
	);
}
