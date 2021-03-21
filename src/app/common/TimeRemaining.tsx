import { ReactElement } from "react";
import { durationFormat } from "../../helpers/durationFormat";
import commonStyles from "../common/common.module.css";
import { useDurationFromNow } from "../hooks/useDurationFromNow";

interface IOwnProps {
	until: string;
}

export function TimeRemaining(props: IOwnProps): ReactElement {
	const remainingSeconds = useDurationFromNow(props.until);

	return (
		<time dateTime={props.until} className={commonStyles.noWrap}>
			{durationFormat(remainingSeconds)}
		</time>
	);
}
