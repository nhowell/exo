import { DateTime } from "luxon";
import { useMemo } from "react";
import { useCurrentDateTime } from "./useCurrentDateTime";

export function useDurationFromNow(date: string | number): number {
	const currentDateTime = useCurrentDateTime();
	const endDateTime = useMemo(
		() =>
			typeof date === "number"
				? DateTime.fromMillis(date)
				: DateTime.fromISO(date),
		[date],
	);

	return useMemo(() => {
		return Math.ceil(endDateTime.diff(currentDateTime).valueOf() / 1000);
	}, [currentDateTime, endDateTime]);
}
