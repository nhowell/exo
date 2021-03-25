import { DateTime } from "luxon";
import { useMemo } from "react";
import { useCurrentDateTime } from "./useCurrentDateTime";

export function useDurationFromNow(date: string): number {
	const currentDateTime = useCurrentDateTime();
	const endDateTime = useMemo(() => DateTime.fromISO(date), [date]);

	const remainingSeconds = useMemo(() => {
		return Math.ceil(endDateTime.diff(currentDateTime).valueOf() / 1000);
	}, [currentDateTime, endDateTime]);

	return remainingSeconds;
}
