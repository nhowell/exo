import { t } from "../helpers/translate";
import { useCurrentUserInfo } from "./hooks/useCurrentUserInfo";

export function UserInfo() {
	const { isLoading, isError, error, data: userInfo } = useCurrentUserInfo();

	return (
		<>
			<h1>{t("User Info")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || userInfo === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<p>
					<strong>{t("Ships")}:</strong> {userInfo.ships.length}
				</p>
			)}
		</>
	);
}
