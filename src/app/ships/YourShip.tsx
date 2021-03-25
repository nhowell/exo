import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { IUserShip } from "../../spacetraders-api/users/ships/types";
import { generateViewShipPath } from "../routes";
import styles from "./YourShip.module.css";

interface IOwnProps {
	ship: IUserShip;
}

export function YourShip(props: IOwnProps): ReactElement {
	return <NavLink to={generateViewShipPath(props.ship.id)}></NavLink>;
}
