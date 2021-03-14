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
				<p>
					<a href="https://spacetraders.io/">SpaceTraders</a> is an MMO backed
					entirely by a <a href="https://api.spacetraders.io/">RESTful API</a>.
					Manage a fleet of ships, automate trade routes, discover hidden
					secrets in the universe and more. Play/Build now!
				</p>
			</header>

			<main>
				<div className={styles.tile}>
					<LoginForm />
				</div>
				<div className={styles.tile}>
					<RegisterForm />
				</div>
			</main>

			<footer>
				<p>
					Server Status: <GameStatus />
				</p>
			</footer>
		</div>
	);
}
