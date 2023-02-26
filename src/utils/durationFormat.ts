import { t } from "./translate";

export function durationFormat(seconds: number): string {
	if (isNaN(seconds)) {
		return t("N/A");
	}

	if (seconds === 0) {
		return t("now");
	}

	const totalSeconds = Math.ceil(Math.abs(seconds));
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);
	const totalDays = Math.floor(totalHours / 24);

	const timeComponents: string[] = [];

	if (totalDays > 0) {
		timeComponents.push(`${totalDays}d`);
	}

	if (totalHours > 0 && timeComponents.length < 2) {
		const hours = totalHours % 24;
		timeComponents.push(`${hours}h`);
	}

	if (totalMinutes > 0 && timeComponents.length < 2) {
		const minutes = totalMinutes % 60;
		timeComponents.push(`${minutes}m`);
	}

	if (timeComponents.length < 2) {
		const secs = totalSeconds % 60;
		timeComponents.push(`${secs}s`);
	}

	if (seconds < 0) {
		timeComponents.push(t("ago"));
	}

	return timeComponents.join(" ");
}
