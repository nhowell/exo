import { GameStatus } from "../GameStatus";
import { Logout } from "../auth/Logout";

interface IOwnProps {
	onLogout(): void;
}

export function Header(props: IOwnProps) {
	return (
		<header>
			<h1>SpaceTraders</h1>

			<GameStatus />

			<Logout onLogout={props.onLogout} />
		</header>
	);
}
