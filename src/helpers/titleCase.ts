export function titleCase(str: string) {
	return str
		.replaceAll("_", " ")
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.replace(word[0], word[0].toUpperCase());
		})
		.join(" ");
}
