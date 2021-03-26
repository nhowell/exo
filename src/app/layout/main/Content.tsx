import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { t } from "../../../helpers/translate";
import {
	homePath,
	loansPath,
	mapPath,
	marketPath,
	shipyardPath,
} from "../../routes";
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
					<NavLink to={mapPath} activeClassName={styles.active}>
						{t("Map")}
					</NavLink>
					<NavLink to={marketPath} activeClassName={styles.active}>
						{t("Market")}
					</NavLink>
					<NavLink to={shipyardPath} activeClassName={styles.active}>
						{t("Shipyard")}
					</NavLink>
					<NavLink to={loansPath} activeClassName={styles.active}>
						{t("Loans")}
					</NavLink>
				</nav>

				{props.children}
			</section>
		</main>
	);
}
