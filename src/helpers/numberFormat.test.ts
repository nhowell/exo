import { numberFormat } from "./numberFormat";

it("formats whole numbers", () => {
	const format = numberFormat();

	expect(format(-0)).toEqual("-0");
	expect(format(0)).toEqual("0");
	expect(format(-1)).toEqual("-1");
	expect(format(1)).toEqual("1");
	expect(format(-2)).toEqual("-2");
	expect(format(2)).toEqual("2");
	expect(format(-1_000)).toEqual("-1,000");
	expect(format(1_000)).toEqual("1,000");
	expect(format(99_999_999)).toEqual("99,999,999");
	expect(format(-99_999_999)).toEqual("-99,999,999");
});

it("formats decimal numbers", () => {
	const format = numberFormat();

	expect(format(-0.0)).toEqual("-0");
	expect(format(0.0)).toEqual("0");
	expect(format(-1.0)).toEqual("-1");
	expect(format(1.0)).toEqual("1");
	expect(format(-2.0)).toEqual("-2");
	expect(format(2.0)).toEqual("2");
	expect(format(-1_000.0)).toEqual("-1,000");
	expect(format(1_000.0)).toEqual("1,000");
	expect(format(99_999_999.0)).toEqual("99,999,999");
	expect(format(-99_999_999.0)).toEqual("-99,999,999");

	expect(format(-0.2)).toEqual("-0.2");
	expect(format(0.2)).toEqual("0.2");
	expect(format(-1.35)).toEqual("-1.35");
	expect(format(1.35)).toEqual("1.35");
	expect(format(-2.5)).toEqual("-2.5");
	expect(format(2.5)).toEqual("2.5");
	expect(format(-1_000.625)).toEqual("-1,000.625");
	expect(format(1_000.625)).toEqual("1,000.625");
	expect(format(99_999_999.1)).toEqual("99,999,999.1");
	expect(format(-99_999_999.1)).toEqual("-99,999,999.1");
});

it("formats numbers to correct number of decimal places", () => {
	const format = numberFormat({ decimalPlaces: 2 });

	expect(format(-0)).toEqual("-0.00");
	expect(format(0)).toEqual("0.00");
	expect(format(-1)).toEqual("-1.00");
	expect(format(1)).toEqual("1.00");
	expect(format(-2)).toEqual("-2.00");
	expect(format(2)).toEqual("2.00");
	expect(format(-1_000)).toEqual("-1,000.00");
	expect(format(1_000)).toEqual("1,000.00");
	expect(format(99_999_999)).toEqual("99,999,999.00");
	expect(format(-99_999_999)).toEqual("-99,999,999.00");

	expect(format(-0.2)).toEqual("-0.20");
	expect(format(0.2)).toEqual("0.20");
	expect(format(-1.35)).toEqual("-1.35");
	expect(format(1.35)).toEqual("1.35");
	expect(format(-2.5)).toEqual("-2.50");
	expect(format(2.5)).toEqual("2.50");
	expect(format(-1_000.624)).toEqual("-1,000.62");
	expect(format(1_000.624)).toEqual("1,000.62");
	expect(format(-1_000.625)).toEqual("-1,000.63");
	expect(format(1_000.625)).toEqual("1,000.63");
	expect(format(99_999_999.1)).toEqual("99,999,999.10");
	expect(format(-99_999_999.1)).toEqual("-99,999,999.10");
});
