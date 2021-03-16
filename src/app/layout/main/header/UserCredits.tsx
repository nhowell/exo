import { creditFormat } from "../../../../helpers/creditFormat";
import { t } from "../../../../helpers/translate";
import { useCurrentUserInfo } from "../../../hooks/useCurrentUserInfo";
import styles from "./UserCredits.module.css";

export function UserCredits() {
	const { isLoading, isError, data: userInfo } = useCurrentUserInfo();

	return (
		<div className={styles.credits}>
			{isLoading ? (
				<>{t("Loading...")}</>
			) : isError || userInfo === undefined ? (
				<>{t("N/A")}</>
			) : (
				<>{creditFormat(userInfo.credits)}</>
			)}
		</div>
	);
}
