import { ReactElement } from "react";
import styles from "./ShipInfo.module.css";
import { IMyShip, isDocked } from "../../spacetraders-api/api/my/ships/types";
import { ShipAttributes } from "./ShipAttributes";
import { t } from "../../utils/translate";
import { ScrapShip } from "./ScrapShip";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipInfo(props: IOwnProps): ReactElement {
	return (
		<>
			<section className={styles.attributes}>
				<h2>{t("Attributes")}</h2>
				<div>
					<ShipAttributes ship={props.ship} detailed />
				</div>
			</section>

			{isDocked(props.ship) && (
				<section className={styles.scrapShip}>
					<h2>{t("Scrap Ship for Credits")}</h2>
					<ScrapShip ship={props.ship} />
				</section>
			)}
		</>
	);
}
