import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { LoginForm, ILoginForm } from "./LoginForm";
import styles from "./LoginLayout.module.css";
import { RegisterForm } from "./RegisterForm";

interface IOwnProps {
	onLogin(values: ILoginForm): Promise<string | undefined>;
}

export function LoginLayout(props: IOwnProps) {
	return (
		<div className={styles.container}>
			<header>
				<Logo size="large" />

				<GameStatus />
			</header>

			<main>
				<div className={styles.tile}>
					<LoginForm onLogin={props.onLogin} />
				</div>
				<div className={styles.tile}>
					<RegisterForm />
				</div>
			</main>
		</div>
	);
}
