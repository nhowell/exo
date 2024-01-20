import { sortBy } from "lodash";

import { IMarketplaceListing } from "@/spacetraders-api/api/locations/types";
import { IShipCargo } from "@/spacetraders-api/api/my/ships/types";

export interface IMarketplaceListingForShip extends IMarketplaceListing {
	quantityOwned: number;
}

export function mapToMarketplaceListingForShip(
	cargo: IShipCargo[],
	marketplaceListings: IMarketplaceListing[],
): IMarketplaceListingForShip[] {
	const listings = marketplaceListings.map<IMarketplaceListingForShip>((x) => {
		return {
			...x,
			quantityOwned: 0,
		};
	});

	for (const cargoItem of cargo) {
		const existingRow = listings.find((x) => x.symbol === cargoItem.good);

		if (existingRow !== undefined) {
			existingRow.quantityOwned = cargoItem.quantity;
		}
	}

	return sortBy(listings, [(x) => x.symbol]);
}
