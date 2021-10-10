import { ReactElement, ReactNode } from "react";
import styles from "./LinkButton.module.css";

interface IOwnProps {
	onClick(): void;
	children: ReactNode;
	disabled?: boolean;
}

export function LinkButton(props: IOwnProps): ReactElement {
	return (
		<button
			type="button"
			onClick={() => props.onClick()}
			className={styles.linkButton}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}
