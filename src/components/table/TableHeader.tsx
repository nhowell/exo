import { ReactElement } from "react";

interface IOwnProps {
	children: ReactElement;
}

export function TableHeader(props: IOwnProps): ReactElement {
	return <thead>{props.children}</thead>;
}
