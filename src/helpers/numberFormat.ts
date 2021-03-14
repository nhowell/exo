import { getUserLocales } from "./getUserLocales";

interface INumberFormatOptions {
	style?: "percent";
	decimalPlaces?: number;
}

export function numberFormat(options?: INumberFormatOptions) {
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
