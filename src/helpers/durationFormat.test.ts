import { durationFormat } from "./durationFormat";

it("formats whole seconds to time remaining", () => {
	expect(durationFormat(0)).toBe("now");
	expect(durationFormat(1)).toBe("1s");
	expect(durationFormat(59)).toBe("59s");
	expect(durationFormat(60)).toBe("1m 0s");
	expect(durationFormat(77)).toBe("1m 17s");
	expect(durationFormat(60 * 10 - 1)).toBe("9m 59s");
	expect(durationFormat(60 * 10)).toBe("10m 0s");
	expect(durationFormat(60 * 10 + 15)).toBe("10m 15s");
	expect(durationFormat(60 * 60 - 1)).toBe("59m 59s");
	expect(durationFormat(60 * 60)).toBe("1h 0m");
	expect(durationFormat(60 * 61 - 1)).toBe("1h 0m");
	expect(durationFormat(60 * 60 * 24 - 1)).toBe("23h 59m");
	expect(durationFormat(60 * 60 * 24)).toBe("1d 0h");
	expect(durationFormat(60 * 60 * 25 - 1)).toBe("1d 0h");
	expect(durationFormat(60 * 60 * 25)).toBe("1d 1h");
	expect(durationFormat(60 * 60 * 47)).toBe("1d 23h");
	expect(durationFormat(60 * 60 * 24 * 2 - 1)).toBe("1d 23h");
	expect(durationFormat(60 * 60 * 24 * 2)).toBe("2d 0h");
	expect(durationFormat(60 * 60 * 24 * 365)).toBe("365d 0h");
	expect(durationFormat(60 * 60 * 24 * 365 * 2 + 60 * 60 * 4)).toBe("730d 4h");
});

it("rounds fractional seconds up", () => {
	expect(durationFormat(0.01)).toBe("1s");
	expect(durationFormat(0.1)).toBe("1s");
	expect(durationFormat(0.9)).toBe("1s");
	expect(durationFormat(1.01)).toBe("2s");
});

it("should handle negative numbers", () => {
	expect(durationFormat(-0)).toBe("now");
	expect(durationFormat(-0.5)).toBe("1s ago");
	expect(durationFormat(-1)).toBe("1s ago");
	expect(durationFormat(-59)).toBe("59s ago");
	expect(durationFormat(-59.9)).toBe("1m 0s ago");
	expect(durationFormat(-119)).toBe("1m 59s ago");
});

it("should handle NaN", () => {
	expect(durationFormat(NaN)).toBe("N/A");
});
