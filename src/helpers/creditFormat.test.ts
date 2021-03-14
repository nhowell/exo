import { creditFormat } from "./creditFormat";

it("formats credits", () => {
	expect(creditFormat(0)).toEqual("0 Credits");
	expect(creditFormat(1)).toEqual("1 Credit");
	expect(creditFormat(2)).toEqual("2 Credits");
	expect(creditFormat(1_000)).toEqual("1,000 Credits");
	expect(creditFormat(99_999_999)).toEqual("99,999,999 Credits");
});
