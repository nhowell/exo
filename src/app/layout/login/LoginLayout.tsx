import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { LoginForm } from "./LoginForm";
import styles from "./LoginLayout.module.css";
import { RegisterForm } from "./RegisterForm";

export function LoginLayout() {
	return (
		<div className={styles.container}>
			<header>
				<Logo size="large" />

				<GameStatus />
			</header>

			<main>
				<div className={styles.tile}>
					<LoginForm />
				</div>
				<div className={styles.tile}>
					<RegisterForm />
				</div>
			</main>
		</div>
	);
}
