import { DateTime } from "luxon";
import { ReactElement, useMemo } from "react";

import commonStyles from "@/components/common.module.css";
import { useDurationFromNow } from "@/hooks/useDurationFromNow";
import { durationFormat } from "@/utils/durationFormat";

interface IOwnProps {
	/**
	 * If a `number` is given, it is expected to be the timestamp in milliseconds.
	 */
	since: string | number;
}

export function TimeSince(props: IOwnProps): ReactElement {
	const elapsedSeconds = Math.min(0, useDurationFromNow(props.since));

	const dateTime = useMemo(
		() =>
			typeof props.since === "number"
				? DateTime.fromMillis(props.since).toISO()
				: props.since,
		[props.since],
	);

	return (
		<time dateTime={dateTime ?? undefined} className={commonStyles.noWrap}>
			{durationFormat(elapsedSeconds)}
		</time>
	);
}
