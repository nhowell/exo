import { ReactElement, useMemo } from "react";

import commonStyles from "@/components/common.module.css";
import { ILocation } from "@/spacetraders-api/api/locations/types";

interface IOwnProps {
	location: ILocation;
}

export function LocationMessages(props: IOwnProps): ReactElement {
	const messages = useMemo(
		() => props.location.messages?.filter((x) => !x.includes("https://")) ?? [],
		[props.location.messages],
	);

	return (
		<>
			{messages.map((message, i) => (
				<p key={i} className={commonStyles.overflowWordWrap}>
					{message}
				</p>
			))}
		</>
	);
}
