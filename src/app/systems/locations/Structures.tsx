import { ReactElement } from "react";
import { TileContainer } from "../../common/tiles/TileContainer";
import { Tile } from "../../common/tiles/Tile";
import { t } from "../../../helpers/translate";
import { Structure } from "./Structure";
import { IStructure } from "../../../spacetraders-api/api/structures/types";

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
