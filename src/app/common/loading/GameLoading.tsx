import { LoadingSpinner } from "./LoadingSpinner";
import styles from "./GameLoading.module.css";

export function GameLoading() {
	return (
		<div className={styles.overlay}>
			<LoadingSpinner />
		</div>
	);
}
