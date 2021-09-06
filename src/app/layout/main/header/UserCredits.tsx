import { CountUp } from "use-count-up";
import { creditFormat } from "../../../../helpers/creditFormat";
import { t } from "../../../../helpers/translate";
import { useUserInfo } from "../../../../spacetraders-api/hooks/users/useUserInfo";
import { usePrevious } from "../../../hooks/usePrevious";
import styles from "./UserCredits.module.css";

export function UserCredits() {
	const { isLoading, isError, data } = useUserInfo();

	const prevCredits = usePrevious(data?.user.credits ?? 0);

	return (
		<div className={styles.credits}>
			{isLoading ? (
				<>{t("Loading...")}</>
			) : isError || data === undefined ? (
				<>{t("N/A")}</>
			) : (
				<CountUp
					isCounting
					start={prevCredits}
					duration={0.5}
					end={data.user.credits}
					formatter={creditFormat}
				/>
			)}
		</div>
	);
}
