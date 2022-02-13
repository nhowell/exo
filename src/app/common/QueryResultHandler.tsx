import { ReactElement } from "react";
import {
	ITransformedQueryResultHandlerProps,
	TransformedQueryResultHandler,
} from "./TransformedQueryResultHandler";

interface IOwnProps<TData>
	extends Omit<
		ITransformedQueryResultHandlerProps<TData, TData>,
		"transformData"
	> {}

export function QueryResultHandler<TData>(
	props: IOwnProps<TData>,
): ReactElement {
	return (
		<TransformedQueryResultHandler {...props} transformData={transformData} />
	);
}

function transformData<TData>(data: TData): TData {
	return data;
}
