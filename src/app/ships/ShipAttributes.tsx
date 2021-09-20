import { ReactElement } from "react";
import { numberFormat } from "../../helpers/numberFormat";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IShipType } from "../../spacetraders-api/api/types/types";

interface IOwnProps {
	ship: IShipType;
}

export function ShipAttributes(props: IOwnProps): ReactElement {
	return (
		<dl>
			<div>
				<dt>{t("Speed")}:</dt>
				<dd>{numberFormat(props.ship.speed)}</dd>
			</div>
			<div>
				<dt>{t("Max Cargo")}:</dt>
				<dd>{numberFormat(props.ship.maxCargo)}</dd>
			</div>
			<div>
				<dt>{t("Loading Speed")}:</dt>
				<dd>{numberFormat(props.ship.loadingSpeed)}</dd>
			</div>
			{props.ship.restrictedGoods && (
				<div>
					<dt>{t("Restricted Goods")}:</dt>
					<dd>{props.ship.restrictedGoods.map(titleCase).map(t).join(", ")}</dd>
				</div>
			)}
			<div>
				<dt>{t("Weapons")}:</dt>
				<dd>{numberFormat(props.ship.weapons)}</dd>
			</div>
			<div>
				<dt>{t("Plating")}:</dt>
				<dd>{numberFormat(props.ship.plating)}</dd>
			</div>
		</dl>
	);
}
