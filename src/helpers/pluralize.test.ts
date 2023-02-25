import { pluralize } from "./pluralize";

it("uses singular form when count is 1", () => {
	expect(pluralize(1, "Credit", "Credits")).toBe("1 Credit");
	expect(pluralize(1, "worker", "workers")).toBe("1 worker");
});

it("uses plural form when count is not 1", () => {
	expect(pluralize(0, "Credit", "Credits")).toBe("0 Credits");
	expect(pluralize(2, "worker", "workers")).toBe("2 workers");
	expect(pluralize(999, "Credit", "Credits")).toBe("999 Credits");
});

it("formats with thousands separator", () => {
	expect(pluralize(1_000, "Credit", "Credits")).toBe("1,000 Credits");
	expect(pluralize(99_999_999, "Credit", "Credits")).toBe("99,999,999 Credits");
});
