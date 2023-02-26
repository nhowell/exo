import styles from "./GameLoading.module.css";
import { LoadingSpinner } from "./LoadingSpinner";

export function GameLoading() {
	return (
		<div className={styles.overlay}>
			<LoadingSpinner />
		</div>
	);
}
