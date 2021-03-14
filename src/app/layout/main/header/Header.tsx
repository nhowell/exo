import { useAuth } from "../../../hooks/useAuth";
import { GameStatus } from "../../shared/GameStatus";
import { Logo } from "../../shared/Logo";
import { Logout } from "./Logout";
import styles from "./Header.module.css";

export function Header() {
	const auth = useAuth();

	return (
		<header className={styles.header}>
			<div className={styles.section}>
				<Logo size="normal" />
				<GameStatus />
			</div>

			<div className={styles.section}>
				<Logout onLogout={auth.logout} />
			</div>
		</header>
	);
}
