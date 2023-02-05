import React from "react";

export const typedMemo: <T>(c: T) => T = React.memo;

export interface IAllStringKeyProps {
	[key: string]: unknown;
}
