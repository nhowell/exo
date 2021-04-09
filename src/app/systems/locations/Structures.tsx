import { ReactElement } from "react";
import { IStructure } from "../../../spacetraders-api/api/game/locations/types";
import { TileContainer } from "../../common/tiles/TileContainer";
import { Tile } from "../../common/tiles/Tile";
import { t } from "../../../helpers/translate";
import { Structure } from "./Structure";

interface IOwnProps {
	structures: IStructure[];
}

export function Structures(props: IOwnProps): ReactElement {
	if (props.structures.length === 0) {
		return <></>;
	}

	return (
		<>
			<h2>{t("Structures")}</h2>
			<TileContainer>
				{props.structures.map((structure) => (
					<Tile key={structure.id}>
						<Structure structure={structure} />
					</Tile>
				))}
			</TileContainer>
		</>
	);
}
