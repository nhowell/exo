import { ReactElement } from "react";

import { IShipType } from "../../spacetraders-api/api/types/types";
import { numberFormat } from "../../utils/numberFormat";
import { titleCase } from "../../utils/titleCase";
import { t } from "../../utils/translate";

interface IOwnProps {
	ship: IShipType;
	detailed?: boolean;
}

export function ShipAttributes(props: IOwnProps): ReactElement {
	return (
		<dl>
			{props.detailed && (
				<>
					<div>
						<dt>{t("Manufacturer")}:</dt>
						<dd>{props.ship.manufacturer}</dd>
					</div>
					<div>
						<dt>{t("Class")}:</dt>
						<dd>{props.ship.class}</dd>
					</div>
				</>
			)}
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
		</dl>
	);
}
