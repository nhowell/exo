import { ReactElement } from "react";

import { QueryResultHandler } from "@/components/QueryResultHandler";
import { Tag } from "@/components/Tag";
import { useSystemInfo } from "@/spacetraders-api/hooks/systems/useSystemInfo";

interface IOwnProps {
	symbol: string;
}

export function System(props: IOwnProps): ReactElement {
	const result = useSystemInfo(props.symbol);

	return (
		<QueryResultHandler queryResult={result}>
			{(data) => (
				<h3>
					{data.system.name} <Tag text={data.system.symbol} />
				</h3>
			)}
		</QueryResultHandler>
	);
}
