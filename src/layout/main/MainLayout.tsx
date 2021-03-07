import { Header } from "./Header";
import { Content } from "./Content";
import { UserInfo } from "../../UserInfo/UserInfo";

interface IOwnProps {
	onLogout(): void;
}

export function MainLayout(props: IOwnProps) {
	return (
		<>
			<Header onLogout={props.onLogout} />

			<Content>
				<UserInfo />
			</Content>
		</>
	);
}
