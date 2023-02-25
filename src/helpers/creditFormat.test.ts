import { creditFormat } from "./creditFormat";

it("formats credits", () => {
	expect(creditFormat(0)).toBe("0 Credits");
	expect(creditFormat(1)).toBe("1 Credit");
	expect(creditFormat(2)).toBe("2 Credits");
	expect(creditFormat(1_000)).toBe("1,000 Credits");
	expect(creditFormat(99_999_999)).toBe("99,999,999 Credits");
});
