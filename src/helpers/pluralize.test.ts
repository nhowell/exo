import { pluralize } from "./pluralize";

it("uses singular form when count is 1", () => {
	expect(pluralize(1, "Credit", "Credits")).toEqual("1 Credit");
	expect(pluralize(1, "worker", "workers")).toEqual("1 worker");
});

it("uses plural form when count is not 1", () => {
	expect(pluralize(0, "Credit", "Credits")).toEqual("0 Credits");
	expect(pluralize(2, "worker", "workers")).toEqual("2 workers");
	expect(pluralize(999, "Credit", "Credits")).toEqual("999 Credits");
});

it("formats with thousands separator", () => {
	expect(pluralize(1_000, "Credit", "Credits")).toEqual("1,000 Credits");
	expect(pluralize(99_999_999, "Credit", "Credits")).toEqual(
		"99,999,999 Credits",
	);
});
