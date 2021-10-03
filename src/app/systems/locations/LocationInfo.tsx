import { ReactElement } from "react";
import { ILocation } from "../../../spacetraders-api/api/locations/types";
import { LocationAttributes } from "./LocationAttributes";
import { LocationMessages } from "./LocationMessages";
import styles from "./LocationInfo.module.css";

interface IOwnProps {
	location: ILocation;
}

export function LocationInfo(props: IOwnProps): ReactElement {
	return (
		<>
			{props.location.messages !== undefined && (
				<section>
					<h2>Messages</h2>
					<LocationMessages location={props.location} />
				</section>
			)}
			<section className={styles.attributes}>
				<h2>Attributes</h2>
				<LocationAttributes location={props.location} />
			</section>
		</>
	);
}
