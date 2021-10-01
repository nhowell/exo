import { ReactElement } from "react";
import { t } from "../../helpers/translate";
import { useLocationsInSystem } from "../../spacetraders-api/hooks/systems/useLocationsInSystem";
import { TileContainer } from "../common/tiles/TileContainer";
import { Tile } from "../common/tiles/Tile";
import { SystemLocation } from "./SystemLocation";

interface IOwnProps {
	systemSymbol: string;
}

export function SystemLocations(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useLocationsInSystem(
		props.systemSymbol,
	);

	return (
		<>
			<h2>{t("Locations")}</h2>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : data.locations.length === 0 ? (
				<p>{t("There are no locations.")}</p>
			) : (
				<TileContainer>
					{data.locations.map((location) => (
						<Tile key={location.type} width="28.5rem">
							<SystemLocation location={location} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}
