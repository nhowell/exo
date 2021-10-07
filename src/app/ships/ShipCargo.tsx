import { sortBy } from "lodash";
import { ReactElement, useMemo } from "react";
import { IMyShip, IShipCargo } from "../../spacetraders-api/api/my/ships/types";
import { TileContainer } from "../common/tiles/TileContainer";
import { ShipCargoItem } from "./ShipCargoItem";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipCargo(props: IOwnProps): ReactElement {
	const sortedCargo = useMemo(
		() => sortCargo(props.ship.cargo),
		[props.ship.cargo],
	);

	return (
		<TileContainer>
			{sortedCargo.map((cargoItem) => (
				<ShipCargoItem key={cargoItem.good} cargoItem={cargoItem} />
			))}
		</TileContainer>
	);
}

function sortCargo(cargo: readonly IShipCargo[]): IShipCargo[] {
	return sortBy(cargo, [(x) => x.good]);
}
