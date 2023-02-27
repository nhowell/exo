import classNames from "classnames";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { t } from "@/utils/translate";

import { YourShips } from "../../../app/ships/YourShips";
import { dashboardPath, loansPath, systemsPath } from "../../../routes";

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
					<NavLink
						to={dashboardPath}
						className={({ isActive }) => (isActive ? styles.active : "")}
						end
					>
						{t("Dashboard")}
					</NavLink>
					<NavLink
						to={systemsPath}
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						{t("Systems")}
					</NavLink>
					<NavLink
						to={loansPath}
						className={({ isActive }) => (isActive ? styles.active : "")}
					>
						{t("Loans")}
					</NavLink>
				</nav>

				<div className={styles.content}>{props.children}</div>
			</section>
		</main>
	);
}
