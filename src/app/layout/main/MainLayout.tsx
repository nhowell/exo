import { Header } from "./Header";
import { Content } from "./Content";
import { Home } from "../../home/Home";

interface IOwnProps {
	onLogout(): void;
}

export function MainLayout(props: IOwnProps) {
	return (
		<>
			<Header onLogout={props.onLogout} />

			<Content>
				<Home />
			</Content>
		</>
	);
}
