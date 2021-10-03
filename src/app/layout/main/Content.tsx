import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { t } from "../../../helpers/translate";
import { homePath, loansPath, systemsPath } from "../../routes";
import { YourShips } from "../../ships/YourShips";
import styles from "./Content.module.css";
import mainLayoutStyles from "./MainLayout.module.css";

interface IOwnProps {
	children: ReactNode;
}

export function Content(props: IOwnProps) {
	return (
		<main
			className={classNames(styles.contentContainer, mainLayoutStyles.maxWidth)}
		>
			<section>
				<YourShips />
			</section>
			<section>
				<nav>
					<NavLink to={homePath} activeClassName={styles.active} exact>
						{t("Home")}
					</NavLink>
					<NavLink to={systemsPath} activeClassName={styles.active}>
						{t("Systems")}
					</NavLink>
					<NavLink to={loansPath} activeClassName={styles.active}>
						{t("Loans")}
					</NavLink>
				</nav>

				<div className={styles.content}>{props.children}</div>
			</section>
		</main>
	);
}
