import { TileContainer } from "../../common/tiles/TileContainer";
import { Tile } from "../../common/tiles/Tile";
import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";
import { LoginForm } from "./LoginForm";
import styles from "./LoginLayout.module.css";
import { RegisterForm } from "./RegisterForm";
import { t } from "../../../helpers/translate";

export function LoginLayout() {
	return (
		<div className={styles.container}>
			<header>
				<Logo size="large" />
				<p>
					AstroCorp is a user interface for{" "}
					<a href="https://spacetraders.io/">SpaceTraders</a> &mdash; an MMO
					backed entirely by a{" "}
					<a href="https://api.spacetraders.io/">RESTful API</a>. Manage a fleet
					of ships, automate trade routes, discover hidden secrets in the
					universe and more. Play/Build now!
				</p>
			</header>

			<main>
				<TileContainer center>
					<Tile width="34rem">
						<LoginForm />
					</Tile>
					<Tile width="34rem">
						<RegisterForm />
					</Tile>
				</TileContainer>
			</main>

			<footer>
				<p>
					{t("Server Status")}: <GameStatus />
				</p>
			</footer>
		</div>
	);
}
