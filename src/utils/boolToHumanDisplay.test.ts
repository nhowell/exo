import { boolToHumanDisplay } from "./boolToHumanDisplay";

it("converts true to 'Yes'", () => {
	const result = boolToHumanDisplay(true);

	expect(result).toBe("Yes");
});

it("converts false to 'No'", () => {
	const result = boolToHumanDisplay(false);

	expect(result).toBe("No");
});
