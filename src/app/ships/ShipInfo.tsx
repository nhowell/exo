import { ReactElement } from "react";
import styles from "./ShipInfo.module.css";
import { IMyShip } from "../../spacetraders-api/api/my/ships/types";
import { ShipAttributes } from "./ShipAttributes";
import { useScrapShip } from "../../spacetraders-api/hooks/my/ships/useScrapShip";
import { t } from "../../helpers/translate";
import { useNavigate } from "react-router-dom";
import { dashboardPath } from "../routes";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipInfo(props: IOwnProps): ReactElement {
	const scrapShip = useScrapShip();

	const navigate = useNavigate();

	const handleScrapShip = () => {
		scrapShip.mutate(props.ship.id, {
			onSuccess: () => {
				navigate(dashboardPath, { replace: true });
			},
		});
	};

	return (
		<>
			<section className={styles.attributes}>
				<h2>{t("Attributes")}</h2>
				<div>
					<ShipAttributes ship={props.ship} detailed />
				</div>
			</section>

			<section className={styles.scrapShip}>
				<h2>{t("Scrap Ship for Credits")}</h2>
				<p>
					{t(
						"Scrapping a ship for credits gives back 25% of its original purchase price. Any cargo will be lost and the ship will be destroyed.",
					)}
				</p>
				<button type="button" onClick={handleScrapShip}>
					{t("Scrap ship")}
				</button>
			</section>
		</>
	);
}
