import { DateTime } from "luxon";
import { createContext, ReactElement, useState } from "react";

import { useInterval } from "@/hooks/useInterval";

interface IOwnProps {
	children: ReactElement;
}

export const CurrentDateTimeContext = createContext<DateTime>(DateTime.now());

export function CurrentDateTimeProvider(props: IOwnProps): ReactElement {
	const [currentDateTime, setCurrentDateTime] = useState(DateTime.now());

	useInterval(() => {
		setCurrentDateTime(DateTime.now());
	}, 1_000);

	return (
		<CurrentDateTimeContext.Provider value={currentDateTime}>
			{props.children}
		</CurrentDateTimeContext.Provider>
	);
}
