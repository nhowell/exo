import { useCurrentUser } from "@/hooks/useCurrentUser";

import styles from "./Username.module.css";

export function Username() {
	const currentUser = useCurrentUser();

	return <div className={styles.username}>{currentUser.username}</div>;
}
