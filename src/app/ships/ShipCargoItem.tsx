import { ReactElement } from "react";
import { numberFormat } from "../../helpers/numberFormat";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IShipCargo } from "../../spacetraders-api/api/my/ships/types";
import { Tile } from "../common/tiles/Tile";

interface IOwnProps {
	cargoItem: IShipCargo;
}

export function ShipCargoItem(props: IOwnProps): ReactElement {
	return (
		<Tile width="28.5rem">
			<h3>{t(titleCase(props.cargoItem.good))}</h3>
			<dl>
				<div>
					<dt>{t("Quantity")}:</dt>
					<dd>{numberFormat(props.cargoItem.quantity)}</dd>
				</div>
				<div>
					<dt>{t("Volume per Unit")}:</dt>
					<dd>
						{numberFormat(
							props.cargoItem.quantity / props.cargoItem.totalVolume,
						)}
					</dd>
				</div>
				<div>
					<dt>{t("Total Volume")}:</dt>
					<dd>{numberFormat(props.cargoItem.totalVolume)}</dd>
				</div>
			</dl>
		</Tile>
	);
}
