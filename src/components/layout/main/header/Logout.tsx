import { useAuth } from "@/hooks/useAuth";
import { t } from "@/utils/translate";

export function Logout() {
	const auth = useAuth();

	return (
		<button type="submit" onClick={auth.logout}>
			{t("Logout")}
		</button>
	);
}
