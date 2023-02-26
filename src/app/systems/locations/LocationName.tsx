import { ReactElement } from "react";

import { Tag } from "../../common/Tag";

interface IOwnProps {
	name: string;
	symbol: string;
}

export function LocationName(props: IOwnProps): ReactElement {
	return (
		<>
			{props.name} <Tag text={props.symbol} />
		</>
	);
}
