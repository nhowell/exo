import { GameStatus } from "../../shared/GameStatus";
import { Logo } from "../../shared/Logo";
import { Username } from "./Username";
import { UserCredits } from "./UserCredits";
import { Logout } from "./Logout";
import styles from "./Header.module.css";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.section}>
				<Logo size="normal" />
				<GameStatus />
			</div>

			<div className={styles.section}>
				<Username />
				<UserCredits />
				<Logout />
			</div>
		</header>
	);
}
