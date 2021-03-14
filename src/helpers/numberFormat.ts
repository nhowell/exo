import { getUserLocales } from "./getUserLocales";

interface INumberFormatOptions {
	decimalPlaces?: number;
}

export function numberFormat(options?: INumberFormatOptions) {
	return Intl.NumberFormat(
		getUserLocales(),
		options !== undefined
			? {
					minimumFractionDigits: options.decimalPlaces,
					maximumFractionDigits: options.decimalPlaces,
			  }
			: undefined,
	).format;
}
