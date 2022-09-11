import { ReactElement } from "react";
import { t } from "../../../helpers/translate";
import { useStructuresAtLocation } from "../../../spacetraders-api/hooks/locations/useStructuresAtLocation";
import { QueryResultHandler } from "../../common/QueryResultHandler";
import { Tile } from "../../common/tiles/Tile";
import { TileContainer } from "../../common/tiles/TileContainer";
import { Structure } from "./Structure";

interface IOwnProps {
	locationSymbol: string;
}

export function LocationStructures(props: IOwnProps): ReactElement {
	const result = useStructuresAtLocation(props.locationSymbol);

	return (
		<QueryResultHandler queryResult={result}>
			{(data) =>
				data.structures.length === 0 ? (
					<p>{t("There are no structures.")}</p>
				) : (
					<TileContainer>
						{data.structures.map((structure) => (
							<Tile key={structure.id}>
								<Structure structure={structure} />
							</Tile>
						))}
					</TileContainer>
				)
			}
		</QueryResultHandler>
	);
}
