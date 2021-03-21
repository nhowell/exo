import classNames from "classnames";
import { ReactNode } from "react";
import { YourShips } from "../../ships/YourShips";
import styles from "./Content.module.css";
import mainLayoutStyles from "./MainLayout.module.css";

interface IOwnProps {
	children: ReactNode;
}

export function Content(props: IOwnProps) {
	return (
		<main className={classNames(styles.content, mainLayoutStyles.maxWidth)}>
			<section>
				<YourShips />
			</section>
			<section>{props.children}</section>
		</main>
	);
}
