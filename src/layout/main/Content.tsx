import { ReactNode } from "react";

interface IOwnProps {
	children: ReactNode;
}

export function Content(props: IOwnProps) {
	return <main>{props.children}</main>;
}
