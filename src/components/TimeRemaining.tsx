import { DateTime } from "luxon";
import { ReactElement, useMemo } from "react";

import commonStyles from "@/components/common.module.css";
import { useDurationFromNow } from "@/hooks/useDurationFromNow";
import { durationFormat } from "@/utils/durationFormat";

interface IOwnProps {
	/**
	 * If a `number` is given, it is expected to be the timestamp in milliseconds.
	 */
	until: string | number;
}

export function TimeRemaining(props: IOwnProps): ReactElement {
	const remainingSeconds = useDurationFromNow(props.until);

	const dateTime = useMemo(
		() =>
			typeof props.until === "number"
				? DateTime.fromMillis(props.until).toISO()
				: props.until,
		[props.until],
	);

	return (
		<time dateTime={dateTime} className={commonStyles.noWrap}>
			{durationFormat(remainingSeconds)}
		</time>
	);
}
