const userLocales: string[] =
	navigator.languages !== undefined
		? [...navigator.languages]
		: [navigator.language];

export function getUserLocales(): string[] {
	return userLocales;
}
