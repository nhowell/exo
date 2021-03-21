import { secondsToTimeRemainingFormat } from "./secondsToTimeRemainingFormat";

it("formats whole seconds to time remaining", () => {
	expect(secondsToTimeRemainingFormat(0)).toEqual("0s");
	expect(secondsToTimeRemainingFormat(1)).toEqual("1s");
	expect(secondsToTimeRemainingFormat(59)).toEqual("59s");
	expect(secondsToTimeRemainingFormat(60)).toEqual("1m 0s");
	expect(secondsToTimeRemainingFormat(77)).toEqual("1m 17s");
	expect(secondsToTimeRemainingFormat(60 * 10 - 1)).toEqual("9m 59s");
	expect(secondsToTimeRemainingFormat(60 * 10)).toEqual("10m 0s");
	expect(secondsToTimeRemainingFormat(60 * 10 + 15)).toEqual("10m 15s");
	expect(secondsToTimeRemainingFormat(60 * 60 - 1)).toEqual("59m 59s");
	expect(secondsToTimeRemainingFormat(60 * 60)).toEqual("1h 0m");
	expect(secondsToTimeRemainingFormat(60 * 61 - 1)).toEqual("1h 0m");
	expect(secondsToTimeRemainingFormat(60 * 60 * 24 - 1)).toEqual("23h 59m");
	expect(secondsToTimeRemainingFormat(60 * 60 * 24)).toEqual("1d 0h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 25 - 1)).toEqual("1d 0h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 25)).toEqual("1d 1h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 47)).toEqual("1d 23h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 24 * 2 - 1)).toEqual("1d 23h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 24 * 2)).toEqual("2d 0h");
	expect(secondsToTimeRemainingFormat(60 * 60 * 24 * 365)).toEqual("365d 0h");
	expect(
		secondsToTimeRemainingFormat(60 * 60 * 24 * 365 * 2 + 60 * 60 * 4),
	).toEqual("730d 4h");
});

it("rounds fractional seconds up", () => {
	expect(secondsToTimeRemainingFormat(0.01)).toEqual("1s");
	expect(secondsToTimeRemainingFormat(0.1)).toEqual("1s");
	expect(secondsToTimeRemainingFormat(0.9)).toEqual("1s");
	expect(secondsToTimeRemainingFormat(1.01)).toEqual("2s");
});

it("should handle negative numbers", () => {
	expect(secondsToTimeRemainingFormat(-0)).toEqual("0s");
	expect(secondsToTimeRemainingFormat(-1)).toEqual("-1s");
	expect(secondsToTimeRemainingFormat(-59)).toEqual("-59s");
});

it("should handle NaN", () => {
	expect(secondsToTimeRemainingFormat(NaN)).toEqual("0s");
});
