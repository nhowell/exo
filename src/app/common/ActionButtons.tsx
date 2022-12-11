import { ReactElement, ReactNode } from "react";
import styles from "./ActionButtons.module.css";

interface IOwnProps {
	children: ReactNode;
}

export function ActionButtons(props: IOwnProps): ReactElement {
	return <section className={styles.flex}>{props.children}</section>;
}
