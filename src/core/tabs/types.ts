import { ReactElement } from "react";

export type AtLeastOneTabPane = [ITabPane, ...ITabPane[]];

export interface ITabPane {
	key: string;
	label: string;
	content: ReactElement;
}
