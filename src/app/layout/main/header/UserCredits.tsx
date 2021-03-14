import { numberFormat } from "../../../../helpers/numberFormat";
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
				<>{numberFormat(userInfo.credits)} Credits</>
			)}
		</div>
	);
}
