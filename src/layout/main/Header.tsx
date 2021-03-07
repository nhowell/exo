import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { Logout } from "./Logout";

interface IOwnProps {
	onLogout(): void;
}

export function Header(props: IOwnProps) {
	return (
		<header>
			<Logo size="normal" />

			<GameStatus />

			<Logout onLogout={props.onLogout} />
		</header>
	);
}
