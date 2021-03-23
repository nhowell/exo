import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
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
						Home
					</NavLink>
					<NavLink to={mapPath} activeClassName={styles.active}>
						Map
					</NavLink>
					<NavLink to={marketPath} activeClassName={styles.active}>
						Market
					</NavLink>
					<NavLink to={shipyardPath} activeClassName={styles.active}>
						Shipyard
					</NavLink>
					<NavLink to={loansPath} activeClassName={styles.active}>
						Loans
					</NavLink>
				</nav>

				<div className={styles.content}>{props.children}</div>
			</section>
		</main>
	);
}
