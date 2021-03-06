import { ReactElement, useCallback } from "react";
import { t } from "../../helpers/translate";
import { IGetMarketplaceAtLocationResponse } from "../../spacetraders-api/api/locations/types";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { useMarketplaceAtLocation } from "../../spacetraders-api/hooks/locations/useMarketplaceAtLocation";
import { TileContainer } from "../common/tiles/TileContainer";
import { TransformedQueryResultHandler } from "../common/TransformedQueryResultHandler";
import {
	IMarketplaceListingForShip,
	mapToMarketplaceListingForShip,
} from "./BuyGoods";
import { SellGood } from "./SellGood";

interface IOwnProps {
	ship: IMyDockedShip;
}

export function SellGoods(props: IOwnProps): ReactElement {
	const result = useMarketplaceAtLocation(props.ship.location);

	const transformData = useCallback(
		(data: IGetMarketplaceAtLocationResponse): IMarketplaceListingForShip[] =>
			mapToMarketplaceListingForShip(props.ship.cargo, data.marketplace),
		[props.ship.cargo],
	);

	return (
		<TransformedQueryResultHandler
			queryResult={result}
			transformData={transformData}
		>
			{(listings) =>
				listings.length === 0 ? (
					<p>{t("No marketplace listings available.")}</p>
				) : (
					<TileContainer>
						{listings.map((listing) => (
							<SellGood
								key={listing.symbol}
								ship={props.ship}
								marketplaceListing={listing}
							/>
						))}
					</TileContainer>
				)
			}
		</TransformedQueryResultHandler>
	);
}
