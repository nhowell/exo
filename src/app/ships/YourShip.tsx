import { sum } from "lodash";
import { memo, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { IShipCargo, IMyShip } from "../../spacetraders-api/api/my/ships/types";
import { generateViewShipPath } from "../routes";
import styles from "./YourShip.module.css";
import { ShipStatus } from "./ShipStatus";
import { t } from "../../helpers/translate";
import commonStyles from "../common/common.module.css";
import { Good } from "../../spacetraders-api/api/enums";
import classNames from "classnames";

interface IOwnProps {
	ship: IMyShip;
}

function YourShip(props: IOwnProps): ReactElement {
	return (
		<NavLink
			to={generateViewShipPath(props.ship.id)}
			className={({ isActive }) =>
				classNames(styles.shipLink, isActive && styles.activeShipLink)
			}
		>
			<div>
				<span className={commonStyles.noWrap}>{props.ship.type}</span>
				<br />
				<strong>{t("Speed")}:</strong> {props.ship.speed}
			</div>
			<div>
				<ShipStatus
					location={props.ship.location}
					flightPlanId={props.ship.flightPlanId}
				/>
				<br />
				<strong>{t("Fuel")}:</strong> {fuel(props.ship.cargo)}{" "}
				<strong>{t("Cargo")}:</strong> {cargo(props.ship)}
			</div>
		</NavLink>
	);
}

const YourShipMemoized = memo(YourShip);
export { YourShipMemoized as YourShip };

function cargo(ship: IMyShip): string {
	const volumelessCargoCount = sum(
		ship.cargo.filter((x) => x.totalVolume === 0).map((x) => x.quantity),
	);
	const extraCargo =
		volumelessCargoCount > 0 ? ` +${volumelessCargoCount}` : "";

	return `${ship.maxCargo - ship.spaceAvailable}/${ship.maxCargo}${extraCargo}`;
}

function fuel(shipCargo: IShipCargo[]): number {
	return shipCargo.find((x) => x.good === Good.Fuel)?.quantity ?? 0;
}
