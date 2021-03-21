import { ReactElement, useCallback, useMemo, useState } from "react";
import { Interval, DateTime } from "luxon";
import { secondsToTimeRemainingFormat } from "../../helpers/secondsToTimeRemainingFormat";
import { useInterval } from "../hooks/useInterval";

interface IOwnProps {
	endDate: string;
}

export function RelativeTimeRemaining(props: IOwnProps): ReactElement {
	const endDateTime = useMemo(() => DateTime.fromISO(props.endDate), [
		props.endDate,
	]);

	const calculateRemainingTime = useCallback(
		() => Interval.fromDateTimes(DateTime.now(), endDateTime),
		[endDateTime],
	);

	const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

	useInterval(() => {
		setRemainingTime(calculateRemainingTime());
	}, 1_000);

	const totalSeconds = remainingTime.length("seconds");

	return <>{secondsToTimeRemainingFormat(totalSeconds)}</>;
}
