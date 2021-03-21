import { DateTime } from "luxon";
import { useCallback, useMemo, useState } from "react";
import { useInterval } from "./useInterval";

export function useDurationFromNow(date: string) {
	const endDateTime = useMemo(() => DateTime.fromISO(date), [date]);

	const calculateRemainingSeconds = useCallback(
		() => Math.floor(endDateTime.diffNow().valueOf() / 1000),
		[endDateTime],
	);

	const [remainingSeconds, setRemainingSeconds] = useState(
		calculateRemainingSeconds,
	);

	useInterval(() => {
		setRemainingSeconds(calculateRemainingSeconds());
	}, 1_000);

	return remainingSeconds;
}
