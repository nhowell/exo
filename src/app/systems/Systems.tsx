import { t } from "../../helpers/translate";
import { useSystems } from "../../spacetraders-api/hooks/game/systems/useSystems";
import { TileContainer } from "../common/tiles/TileContainer";
import { Tile } from "../common/tiles/Tile";
import { System } from "./System";
import { ISystem } from "../../spacetraders-api/api/game/systems/types";
import { sortBy } from "lodash";
import { useMemo } from "react";

export function Systems() {
	const { isLoading, isError, error, data } = useSystems();

	const sortedSystems = useMemo(() => {
		if (data === undefined) {
			return;
		}

		return sortSystems(data.systems);
	}, [data]);

	return (
		<>
			<h1>{t("Systems")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || sortedSystems === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : sortedSystems.length === 0 ? (
				<p>{t("There are no systems to view.")}</p>
			) : (
				<TileContainer>
					{sortedSystems.map((system) => (
						<Tile key={system.symbol} width="28.5rem">
							<System system={system} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}

function sortSystems(ships: readonly ISystem[]): ISystem[] {
	return sortBy(ships, (x) => x.name);
}
