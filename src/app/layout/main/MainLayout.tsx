import { Header } from "./header/Header";
import { Content } from "./Content";
import { ReactNode } from "react";

interface IOwnProps {
	children: ReactNode;
}

export function MainLayout(props: IOwnProps) {
	return (
		<>
			<Header />

			<Content>{props.children}</Content>
		</>
	);
}
