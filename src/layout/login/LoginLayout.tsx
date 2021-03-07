import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { LoginForm, ILoginForm } from "./LoginForm";

interface IOwnProps {
	onLogin(values: ILoginForm): void;
}

export function LoginLayout(props: IOwnProps) {
	return (
		<>
			<header>
				<Logo size="large" />

				<GameStatus />
			</header>

			<main>
				<LoginForm onLogin={props.onLogin} />
			</main>
		</>
	);
}
