import { t } from "../../../../helpers/translate";
import { useAuth } from "../../../hooks/useAuth";

export function Logout() {
	const auth = useAuth();

	return (
		<button type="submit" onClick={auth.logout}>
			{t("Logout")}
		</button>
	);
}
