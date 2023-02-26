import { LoadingSpinner } from "@/components/loading/LoadingSpinner";

import styles from "./GameLoading.module.css";

export function GameLoading() {
	return (
		<div className={styles.overlay}>
			<LoadingSpinner />
		</div>
	);
}
