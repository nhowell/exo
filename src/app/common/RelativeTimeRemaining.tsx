import { ReactElement } from "react";

interface IOwnProps {
	endDate: string;
}

export function RelativeTimeRemaining(props: IOwnProps): ReactElement {
	return <>{props.endDate}</>;
}
