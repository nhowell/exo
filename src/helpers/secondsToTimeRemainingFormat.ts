export function secondsToTimeRemainingFormat(seconds: number): string {
	if (isNaN(seconds)) {
		seconds = 0;
	}

	const totalSeconds = Math.ceil(seconds);
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
		const seconds = totalSeconds % 60;
		timeComponents.push(`${seconds}s`);
	}

	return timeComponents.join(" ");
}
