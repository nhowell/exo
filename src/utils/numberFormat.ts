import { getUserLocales } from "./getUserLocales";

interface INumberFormatOptions {
	style?: "percent";
	decimalPlaces?: number;
}

export const numberFormat = createNumberFormatter();

export const percentFormat = createNumberFormatter({ style: "percent" });

export function createNumberFormatter(options?: INumberFormatOptions) {
	return Intl.NumberFormat(
		getUserLocales(),
		options !== undefined
			? {
					style: options.style,
					minimumFractionDigits: options.decimalPlaces,
					maximumFractionDigits: options.decimalPlaces,
			  }
			: undefined,
	).format;
}
