const replacer = new RegExp("_", "g");

export function titleCase(str: string) {
	return str
		.replace(replacer, " ")
		.toLowerCase()
		.split(" ")
		.map((word) => word.replace(word[0], word[0].toUpperCase()))
		.join(" ");
}
