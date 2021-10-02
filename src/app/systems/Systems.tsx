import { t } from "../../helpers/translate";
import { TileContainer } from "../common/tiles/TileContainer";
import { Tile } from "../common/tiles/Tile";
import { System } from "./System";
import { useMemo } from "react";
import { useMyShips } from "../../spacetraders-api/hooks/my/ships/useMyShips";
import { notUndefined } from "../../helpers/notUndefined";
import { splitSymbol } from "../../helpers/splitSymbol";

export function Systems() {
	const knownSystems = useKnownSystems();

	return (
		<>
			<h1>{t("Known Systems")}</h1>
			{knownSystems.isLoading ? (
				<p>{t("Loading...")}</p>
			) : knownSystems.isError || knownSystems.data === undefined ? (
				<p>{t(knownSystems.error?.message ?? "Something went wrong.")}</p>
			) : knownSystems.data.length === 0 ? (
				<p>{t("There are no known systems to view.")}</p>
			) : (
				<TileContainer>
					{knownSystems.data.map((systemSymbol) => (
						<Tile key={systemSymbol} width="28.5rem">
							<System symbol={systemSymbol} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}

// Since the SpaceTraders API doesn't expose a /systems endpoint, new players
// don't have a way to know which systems exist. This acts as a guide for new
// players to give them the "Omicron Eridani" system to begin with.
const STARTER_SYSTEM = "OE";

// TODO: Have this use locations of owned structures as well. Also, probably use
// LocalStorage to remember which systems the player has visited.
function useKnownSystems() {
	const myShips = useMyShips();

	const knownSystems = useMemo(() => {
		if (myShips.data === undefined) {
			return;
		}

		const locations = myShips.data.ships
			.map((x) => x.location)
			.filter(notUndefined);

		const systemSymbolSet = new Set(
			locations.map((x) => splitSymbol(x).systemSymbol),
		);

		systemSymbolSet.add(STARTER_SYSTEM);

		return Array.from(systemSymbolSet).sort();
	}, [myShips.data]);

	return {
		isLoading: myShips.isLoading,
		isError: myShips.isError,
		error: myShips.error,
		data: knownSystems,
	};
}
