import { useAuth } from "../../hooks/useAuth";
import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { Logout } from "./Logout";

export function Header() {
	const auth = useAuth();

	return (
		<header>
			<Logo size="normal" />

			<GameStatus />

			<Logout onLogout={auth.logout} />
		</header>
	);
}
