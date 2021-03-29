import { creditFormat } from "../../../../helpers/creditFormat";
import { t } from "../../../../helpers/translate";
import { useUserInfo } from "../../../../spacetraders-api/hooks/users/useUserInfo";
import styles from "./UserCredits.module.css";

export function UserCredits() {
	const { isLoading, isError, data } = useUserInfo();

	return (
		<div className={styles.credits}>
			{isLoading ? (
				<>{t("Loading...")}</>
			) : isError || data === undefined ? (
				<>{t("N/A")}</>
			) : (
				<>{creditFormat(data.user.credits)}</>
			)}
		</div>
	);
}
