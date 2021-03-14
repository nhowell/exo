import { ReactNode } from "react";
import styles from "./Content.module.css";

interface IOwnProps {
	children: ReactNode;
}

export function Content(props: IOwnProps) {
	return <main className={styles.content}>{props.children}</main>;
}
