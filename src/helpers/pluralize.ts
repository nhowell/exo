import { numberFormat } from "./numberFormat";

const format = numberFormat();

export function pluralize(count: number, singular: string, plural: string) {
	return count === 1 ? `${count} ${singular}` : `${format(count)} ${plural}`;
}
