import { durationFormat } from "./durationFormat";

it("formats whole seconds to time remaining", () => {
	expect(durationFormat(0)).toEqual("0s");
	expect(durationFormat(1)).toEqual("1s");
	expect(durationFormat(59)).toEqual("59s");
	expect(durationFormat(60)).toEqual("1m 0s");
	expect(durationFormat(77)).toEqual("1m 17s");
	expect(durationFormat(60 * 10 - 1)).toEqual("9m 59s");
	expect(durationFormat(60 * 10)).toEqual("10m 0s");
	expect(durationFormat(60 * 10 + 15)).toEqual("10m 15s");
	expect(durationFormat(60 * 60 - 1)).toEqual("59m 59s");
	expect(durationFormat(60 * 60)).toEqual("1h 0m");
	expect(durationFormat(60 * 61 - 1)).toEqual("1h 0m");
	expect(durationFormat(60 * 60 * 24 - 1)).toEqual("23h 59m");
	expect(durationFormat(60 * 60 * 24)).toEqual("1d 0h");
	expect(durationFormat(60 * 60 * 25 - 1)).toEqual("1d 0h");
	expect(durationFormat(60 * 60 * 25)).toEqual("1d 1h");
	expect(durationFormat(60 * 60 * 47)).toEqual("1d 23h");
	expect(durationFormat(60 * 60 * 24 * 2 - 1)).toEqual("1d 23h");
	expect(durationFormat(60 * 60 * 24 * 2)).toEqual("2d 0h");
	expect(durationFormat(60 * 60 * 24 * 365)).toEqual("365d 0h");
	expect(durationFormat(60 * 60 * 24 * 365 * 2 + 60 * 60 * 4)).toEqual(
		"730d 4h",
	);
});

it("rounds fractional seconds up", () => {
	expect(durationFormat(0.01)).toEqual("1s");
	expect(durationFormat(0.1)).toEqual("1s");
	expect(durationFormat(0.9)).toEqual("1s");
	expect(durationFormat(1.01)).toEqual("2s");
});

it("should handle negative numbers", () => {
	expect(durationFormat(-0)).toEqual("0s");
	expect(durationFormat(-0.5)).toEqual("1s ago");
	expect(durationFormat(-1)).toEqual("1s ago");
	expect(durationFormat(-59)).toEqual("59s ago");
	expect(durationFormat(-59.9)).toEqual("1m 0s ago");
	expect(durationFormat(-119)).toEqual("1m 59s ago");
});

it("should handle NaN", () => {
	expect(durationFormat(NaN)).toEqual("0s");
});
