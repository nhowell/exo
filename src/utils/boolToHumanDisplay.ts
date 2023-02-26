import { t } from "./translate";

export function boolToHumanDisplay(bool: boolean) {
	return bool ? t("Yes") : t("No");
}
