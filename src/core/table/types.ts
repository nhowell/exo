import { ReactElement } from "react";

export interface ITableColumnHeader<T> {
	keyname: Extract<keyof T, string>;
	label: string;
	align?: "left" | "center" | "right";
	format?: "credits" | "number" | "date" | "datetime";
	customFormat?: (item: T) => string | number | null | undefined;
	customElementFormat?: (item: T) => ReactElement | undefined;
}

export interface IAllStringKeyProps {
	[key: string]: any;
}
