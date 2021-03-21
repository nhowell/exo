import { createContext, ReactNode, useState } from "react";
import { DateTime } from "luxon";
import { useInterval } from "./hooks/useInterval";

interface IOwnProps {
	children: ReactNode;
}

export const currentDateTimeContext = createContext<DateTime>(DateTime.now());

export function CurrentDateTimeProvider(props: IOwnProps) {
	const [currentDateTime, setCurrentDateTime] = useState(DateTime.now());

	useInterval(() => {
		setCurrentDateTime(DateTime.now());
	}, 1_000);

	return (
		<currentDateTimeContext.Provider value={currentDateTime}>
			{props.children}
		</currentDateTimeContext.Provider>
	);
}
