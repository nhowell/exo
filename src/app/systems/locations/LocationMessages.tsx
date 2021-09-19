import { ReactElement } from "react";
import { ILocation } from "../../../spacetraders-api/api/locations/types";
import commonStyles from "../../common/common.module.css";

interface IOwnProps {
	location: ILocation;
}

export function LocationMessages(props: IOwnProps): ReactElement {
	return (
		<>
			{props.location.messages &&
				props.location.messages.map((message, i) => (
					<p key={i} className={commonStyles.overflowWordWrap}>
						{message}
					</p>
				))}
		</>
	);
}
