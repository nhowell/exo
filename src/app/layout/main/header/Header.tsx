import { Username } from "./Username";
import { UserCredits } from "./UserCredits";
import { Logout } from "./Logout";
import styles from "./Header.module.css";
import mainLayoutStyles from "../MainLayout.module.css";
import classNames from "classnames";

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
