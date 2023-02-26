import { numberFormat } from "./numberFormat";

export function pluralize(count: number, singular: string, plural: string) {
	return count === 1
		? `${count} ${singular}`
		: `${numberFormat(count)} ${plural}`;
}
