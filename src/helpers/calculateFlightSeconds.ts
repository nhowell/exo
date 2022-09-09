// See: https://discord.com/channels/792864705139048469/1017346701729743010/1017465639780233277

const SYSTEM_SCALE = 3;
const DOCKING_SECONDS = 30;

export function calculateFlightSeconds(distance: number, speed: number) {
	const seconds = (distance * SYSTEM_SCALE) / speed + DOCKING_SECONDS;

	return Math.round(seconds);
}
