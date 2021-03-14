import { creditFormat } from "../../../../helpers/creditFormat";
import { t } from "../../../../helpers/translate";
import { useCurrentUserInfo } from "../../../hooks/useCurrentUserInfo";
import styles from "./UserCredits.module.css";

export function UserCredits() {
	const { isLoading, isError, error, data: userInfo } = useCurrentUserInfo();

	return (
		<div className={styles.credits}>
			{isLoading ? (
				<>{t("Loading...")}</>
			) : isError || userInfo === undefined ? (
				<>{t(error ?? "N/A")}</>
			) : (
				<>{creditFormat(userInfo.credits)}</>
			)}
		</div>
	);
}
