import { t } from "../../utils/translate";
import { Tile } from "../common/tiles/Tile";
import { TileContainer } from "../common/tiles/TileContainer";
import { generateViewSystemPath } from "../routes";

import { System } from "./System";
import { useKnownSystems } from "./useKnownSystems";

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
						<Tile
							key={systemSymbol}
							width="28.5rem"
							linkTo={generateViewSystemPath(systemSymbol)}
						>
							<System symbol={systemSymbol} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}
