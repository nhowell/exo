import classNames from "classnames";

import mainLayoutStyles from "../MainLayout.module.css";

import styles from "./Header.module.css";
import { Logout } from "./Logout";
import { UserCredits } from "./UserCredits";
import { Username } from "./Username";

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={classNames(styles.header, mainLayoutStyles.maxWidth)}>
				<div className={styles.section}>
					<UserCredits />
				</div>

				<div className={styles.section}>
					<Username />
					<Logout />
				</div>
			</div>
		</header>
	);
}
