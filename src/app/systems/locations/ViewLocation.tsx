import { ReactElement } from "react";
import { useLocation as useBrowserLocation, useParams } from "react-router-dom";
import { t } from "../../../helpers/translate";
import { useLocation } from "../../../spacetraders-api/hooks/locations/useLocation";
import { LocationName } from "./LocationName";
import { mergeSymbols } from "../../../helpers/mergeSymbols";
import { Tabs } from "../../../core/tabs/Tabs";
import { AtLeastOneTabPane } from "../../../core/tabs/types";
import { LocationDockedShips } from "./LocationDockedShips";
import { LocationMarketplace } from "./LocationMarketplace";
import { LocationInfo } from "./LocationInfo";
import { ILocation } from "../../../spacetraders-api/api/locations/types";

interface IRouteParams {
	systemSymbol: string;
	locationSymbol: string;
}

export function ViewLocation(): ReactElement {
	const { systemSymbol, locationSymbol } = useParams<IRouteParams>();

	const symbol = mergeSymbols(systemSymbol, locationSymbol);

	const { isLoading, isError, error, data } = useLocation(symbol);

	const getPanes = (location: ILocation): AtLeastOneTabPane => [
		{
			key: "info",
			label: t("Info"),
			content: <LocationInfo location={location} />,
		},
		{
			key: "marketplace",
			label: t("Marketplace"),
			content: <LocationMarketplace locationSymbol={symbol} />,
		},
		{
			key: "docked-ships",
			label: t("Docked Ships"),
			content: <LocationDockedShips locationSymbol={symbol} />,
		},
	];

	const browserLocation = useBrowserLocation();

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : (
		<>
			<header>
				<h1>
					<LocationName
						name={data.location.name}
						symbol={data.location.symbol}
					/>
				</h1>
			</header>

			<Tabs
				panes={getPanes(data.location)}
				initialActiveTabKey={browserLocation.hash.substring(1)}
			/>
		</>
	);
}
