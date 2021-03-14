import { numberFormat } from "./numberFormat";

const format = numberFormat();

export function creditFormat(credits: number) {
	return `${format(credits)} ${credits === 1 ? "Credit" : "Credits"}`;
}
