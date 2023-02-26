import { ReactElement } from "react";

import styles from "./Tag.module.css";

interface IOwnProps {
	text: string;
}

export function Tag(props: IOwnProps): ReactElement {
	return <code className={styles.tag}>{props.text}</code>;
}
