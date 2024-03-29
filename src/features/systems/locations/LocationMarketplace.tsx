import { sortBy } from "lodash";
import { ReactElement } from "react";

import { Table } from "@/components/table/Table";
import { ITableColumnHeader } from "@/components/table/types";
import { TransformedQueryResultHandler } from "@/components/TransformedQueryResultHandler";
import {
	IGetMarketplaceAtLocationResponse,
	IMarketplaceListing,
} from "@/spacetraders-api/api/locations/types";
import { useMarketplaceAtLocation } from "@/spacetraders-api/hooks/locations/useMarketplaceAtLocation";
import { titleCase } from "@/utils/titleCase";
import { t } from "@/utils/translate";

interface IOwnProps {
	locationSymbol: string;
}

const marketplaceListingsColumnDefinitions: ITableColumnHeader<IMarketplaceListing>[] =
	[
		{
			keyName: "symbol",
			label: t("Good"),
			customFormat: (x) => t(titleCase(x.symbol)),
		},
		{
			keyName: "purchasePricePerUnit",
			label: t("Purchase Price per Unit"),
			align: "right",
			format: "credits",
		},
		{
			keyName: "quantityAvailable",
			label: t("Quantity Available"),
			align: "right",
			format: "number",
		},
		{
			keyName: "sellPricePerUnit",
			label: t("Sell Price per Unit"),
			align: "right",
			format: "credits",
		},
		{
			keyName: "volumePerUnit",
			label: t("Volume per Unit"),
			align: "right",
			format: "number",
		},
	];

export function LocationMarketplace(props: IOwnProps): ReactElement {
	const result = useMarketplaceAtLocation(props.locationSymbol);

	return (
		<TransformedQueryResultHandler
			queryResult={result}
			transformData={transformData}
		>
			{(sortedListings) =>
				sortedListings.length === 0 ? (
					<p>{t("No marketplace listings available.")}</p>
				) : (
					<Table<IMarketplaceListing>
						keyField="symbol"
						columnDefinitions={marketplaceListingsColumnDefinitions}
						tableData={sortedListings}
						striped
					/>
				)
			}
		</TransformedQueryResultHandler>
	);
}

function transformData(
	data: IGetMarketplaceAtLocationResponse,
): IMarketplaceListing[] {
	return sortMarketplaceListings(data.marketplace);
}

function sortMarketplaceListings(
	marketplaceListings: IMarketplaceListing[],
): IMarketplaceListing[] {
	return sortBy(marketplaceListings, [(x) => x.symbol]);
}
