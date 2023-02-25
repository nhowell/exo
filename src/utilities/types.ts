import { memo } from "react";

export const typedMemo: <T>(c: T) => T = memo;

export interface IAllStringKeyProps {
	[key: string]: unknown;
}
