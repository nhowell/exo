import { creditFormat } from "../../../../helpers/creditFormat";
import { useCurrentUserInfo } from "../../../hooks/useCurrentUserInfo";
import styles from "./UserCredits.module.css";

export function UserCredits() {
	const { isLoading, isError, error, data: userInfo } = useCurrentUserInfo();

	return (
		<div className={styles.credits}>
			{isLoading ? (
				<>Loading...</>
			) : isError || userInfo === undefined ? (
				<>{error ?? "N/A"}</>
			) : (
				<>{creditFormat(userInfo.credits)}</>
			)}
		</div>
	);
}
