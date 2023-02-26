export function calculateDistance(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
) {
	const y = x2 - x1;
	const x = y2 - y1;

	const distance = Math.sqrt(x * x + y * y);

	// The distance should be rounded.
	// See: https://discord.com/channels/792864705139048469/1017346701729743010/1017465904583430185
	return Math.round(distance);
}
