import { ReactElement } from "react";
import styles from "./ShipInfo.module.css";
import { IMyShip } from "../../spacetraders-api/api/my/ships/types";
import { ShipAttributes } from "./ShipAttributes";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipInfo(props: IOwnProps): ReactElement {
	return (
		<section className={styles.attributes}>
			<h2>Attributes</h2>
			<ShipAttributes ship={props.ship} />
		</section>
	);
}
