import { ReactElement } from "react";

interface IOwnProps {
	children: ReactElement | ReactElement[];
}

export function TableRow(props: IOwnProps): ReactElement {
	return <tr>{props.children}</tr>;
}
