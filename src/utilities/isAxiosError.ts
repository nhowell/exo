import { AxiosError } from "axios";

export function isAxiosError<T>(error: any): error is AxiosError<T> {
	return error.isAxiosError;
}
