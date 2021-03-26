import { sum } from "lodash";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import {
	Good,
	IShipCargo,
	IUserShip,
} from "../../spacetraders-api/users/ships/types";
import { generateViewShipPath } from "../routes";
import styles from "./YourShip.module.css";
import { ShipStatus } from "./ShipStatus";
import React from "react";
import { t } from "../../helpers/translate";

interface IOwnProps {
	ship: IUserShip;
}

export const YourShip = React.memo(function (props: IOwnProps): ReactElement {
	return (
		<NavLink
			to={generateViewShipPath(props.ship.id)}
			className={styles.shipLink}
			activeClassName={styles.activeShipLink}
		>
			<div>
				{props.ship.type}
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
});

function cargo(ship: IUserShip): string {
	const volumelessCargoCount = sum(
		ship.cargo.filter((x) => x.totalVolume === 0).map((x) => x.quantity),
	);
	const extraCargo =
		volumelessCargoCount > 0 ? ` +${volumelessCargoCount}` : "";

	return `${ship.maxCargo - ship.spaceAvailable}/${ship.maxCargo}${extraCargo}`;
}

function fuel(cargo: IShipCargo[]): number {
	return cargo.find((x) => x.good === Good.Fuel)?.quantity ?? 0;
}
