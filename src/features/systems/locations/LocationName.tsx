import { ReactElement } from "react";

import { Tag } from "@/components/Tag";

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
