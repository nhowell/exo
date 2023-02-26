import { ReactNode } from "react";

import { Content } from "./Content";
import { Header } from "./header/Header";
import styles from "./MainLayout.module.css";

interface IOwnProps {
	children: ReactNode;
}

export function MainLayout(props: IOwnProps) {
	return (
		<div className={styles.mainLayout}>
			<Header />

			<Content>{props.children}</Content>
		</div>
	);
}
