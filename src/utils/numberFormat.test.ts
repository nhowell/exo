import {
	createNumberFormatter,
	numberFormat,
	percentFormat,
} from "./numberFormat";

it("formats whole numbers", () => {
	expect(numberFormat(-0)).toBe("-0");
	expect(numberFormat(0)).toBe("0");
	expect(numberFormat(-1)).toBe("-1");
	expect(numberFormat(1)).toBe("1");
	expect(numberFormat(-2)).toBe("-2");
	expect(numberFormat(2)).toBe("2");
	expect(numberFormat(-1_000)).toBe("-1,000");
	expect(numberFormat(1_000)).toBe("1,000");
	expect(numberFormat(99_999_999)).toBe("99,999,999");
	expect(numberFormat(-99_999_999)).toBe("-99,999,999");
});

it("formats decimal numbers", () => {
	expect(numberFormat(-0.0)).toBe("-0");
	expect(numberFormat(0.0)).toBe("0");
	expect(numberFormat(-1.0)).toBe("-1");
	expect(numberFormat(1.0)).toBe("1");
	expect(numberFormat(-2.0)).toBe("-2");
	expect(numberFormat(2.0)).toBe("2");
	expect(numberFormat(-1_000.0)).toBe("-1,000");
	expect(numberFormat(1_000.0)).toBe("1,000");
	expect(numberFormat(99_999_999.0)).toBe("99,999,999");
	expect(numberFormat(-99_999_999.0)).toBe("-99,999,999");

	expect(numberFormat(-0.2)).toBe("-0.2");
	expect(numberFormat(0.2)).toBe("0.2");
	expect(numberFormat(-1.35)).toBe("-1.35");
	expect(numberFormat(1.35)).toBe("1.35");
	expect(numberFormat(-2.5)).toBe("-2.5");
	expect(numberFormat(2.5)).toBe("2.5");
	expect(numberFormat(-1_000.625)).toBe("-1,000.625");
	expect(numberFormat(1_000.625)).toBe("1,000.625");
	expect(numberFormat(99_999_999.1)).toBe("99,999,999.1");
	expect(numberFormat(-99_999_999.1)).toBe("-99,999,999.1");
});

it("formats numbers to correct number of decimal places", () => {
	const format = createNumberFormatter({ decimalPlaces: 2 });

	expect(format(-0)).toBe("-0.00");
	expect(format(0)).toBe("0.00");
	expect(format(-1)).toBe("-1.00");
	expect(format(1)).toBe("1.00");
	expect(format(-2)).toBe("-2.00");
	expect(format(2)).toBe("2.00");
	expect(format(-1_000)).toBe("-1,000.00");
	expect(format(1_000)).toBe("1,000.00");
	expect(format(99_999_999)).toBe("99,999,999.00");
	expect(format(-99_999_999)).toBe("-99,999,999.00");

	expect(format(-0.2)).toBe("-0.20");
	expect(format(0.2)).toBe("0.20");
	expect(format(-1.35)).toBe("-1.35");
	expect(format(1.35)).toBe("1.35");
	expect(format(-2.5)).toBe("-2.50");
	expect(format(2.5)).toBe("2.50");
	expect(format(-1_000.624)).toBe("-1,000.62");
	expect(format(1_000.624)).toBe("1,000.62");
	expect(format(-1_000.625)).toBe("-1,000.63");
	expect(format(1_000.625)).toBe("1,000.63");
	expect(format(99_999_999.1)).toBe("99,999,999.10");
	expect(format(-99_999_999.1)).toBe("-99,999,999.10");
});

it("formats percentages", () => {
	expect(percentFormat(-0.0)).toBe("-0%");
	expect(percentFormat(0.0)).toBe("0%");
	expect(percentFormat(-0.01)).toBe("-1%");
	expect(percentFormat(0.01)).toBe("1%");
	expect(percentFormat(-0.02)).toBe("-2%");
	expect(percentFormat(0.02)).toBe("2%");
	expect(percentFormat(-10.0)).toBe("-1,000%");
	expect(percentFormat(10.0)).toBe("1,000%");
	expect(percentFormat(999_999.99)).toBe("99,999,999%");
	expect(percentFormat(-999_999.99)).toBe("-99,999,999%");
});

it("formats percentages and rounds", () => {
	expect(percentFormat(0.002)).toBe("0%");
	expect(percentFormat(-0.0135)).toBe("-1%");
	expect(percentFormat(0.0135)).toBe("1%");
	expect(percentFormat(-0.025)).toBe("-3%");
});

it("formats percentages to 2 decimal places", () => {
	const format = createNumberFormatter({ style: "percent", decimalPlaces: 2 });

	expect(format(0.5)).toBe("50.00%");
	expect(format(-0.002)).toBe("-0.20%");
	expect(format(0.002)).toBe("0.20%");
	expect(format(-0.0135)).toBe("-1.35%");
	expect(format(0.0135)).toBe("1.35%");
	expect(format(-0.025)).toBe("-2.50%");
	expect(format(0.025)).toBe("2.50%");
	expect(format(-10.00625)).toBe("-1,000.63%");
	expect(format(10.00625)).toBe("1,000.63%");
	expect(format(999_999.991)).toBe("99,999,999.10%");
	expect(format(-999_999.991)).toBe("-99,999,999.10%");
});

it("formats percentages to 3 decimal places", () => {
	const format = createNumberFormatter({ style: "percent", decimalPlaces: 3 });

	expect(format(0.99992)).toBe("99.992%");
});
