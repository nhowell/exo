import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { t } from "../../../helpers/translate";
import { Tile } from "../../common/tiles/Tile";
import commonStyles from "../../common/common.module.css";
import { useLocation } from "../../../spacetraders-api/hooks/game/locations/useLocation";
import { LocationName } from "./LocationName";
import { LocationAttributes } from "./LocationAttributes";
import { LocationMessages } from "./LocationMessages";
import { pluralize } from "../../../helpers/pluralize";
import { mergeSymbols } from "../../../helpers/mergeSymbols";
import { generateViewLocationDockedShipsPath } from "../../routes";

interface IRouteParams {
	systemSymbol: string;
	locationSymbol: string;
}

export function ViewLocation(): ReactElement {
	const { systemSymbol, locationSymbol } = useParams<IRouteParams>();

	const symbol = mergeSymbols(systemSymbol, locationSymbol);

	const { isLoading, isError, error, data } = useLocation(symbol);

	return (
		<>
			{isLoading ? (
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

					<aside className={commonStyles.floatRight}>
						<Tile>
							<LocationAttributes location={data.location} />
						</Tile>
					</aside>

					<p>
						<NavLink to={generateViewLocationDockedShipsPath(symbol)}>
							{pluralize(data.dockedShips, t("docked ship"), t("docked ships"))}
						</NavLink>
					</p>

					<LocationMessages location={data.location} />
				</>
			)}
		</>
	);
}
