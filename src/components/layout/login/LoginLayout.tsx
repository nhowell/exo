import { useState } from "react";

import { Tile } from "@/components/tiles/Tile";
import { TileContainer } from "@/components/tiles/TileContainer";
import { APP_NAME } from "@/constants";
import { t } from "@/utils/translate";

import { GameStatus } from "../shared/GameStatus";
import { Logo } from "../shared/Logo";

import { LoginForm } from "./LoginForm";
import styles from "./LoginLayout.module.css";
import { RegisterForm } from "./RegisterForm";

export function LoginLayout() {
	const [isRegistered, setIsRegistered] = useState(false);

	return (
		<div className={styles.container}>
			<header>
				<Logo size="large" />
				<p>
					{APP_NAME} is a user interface for{" "}
					<a href="https://spacetraders.io/">SpaceTraders</a> &mdash; an MMO
					backed entirely by a{" "}
					<a href="https://api.spacetraders.io/">RESTful API</a>. Manage a fleet
					of ships, automate trade routes, discover hidden secrets in the
					universe and more. Play/Build now!
				</p>
			</header>

			<main>
				<TileContainer center>
					{!isRegistered && (
						<Tile width="34rem">
							<LoginForm />
						</Tile>
					)}
					<Tile width={isRegistered ? undefined : "34rem"}>
						<RegisterForm onRegister={() => setIsRegistered(true)} />
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
