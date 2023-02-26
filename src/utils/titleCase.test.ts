import { titleCase } from "./titleCase";

it("replaces underscores with spaces", () => {
	expect(titleCase("A_Test_Case")).toBe("A Test Case");
});

it("changes casing to TitleCase", () => {
	expect(titleCase("a test case")).toBe("A Test Case");
	expect(titleCase("This is a test")).toBe("This Is A Test");
	expect(titleCase("SOME_RARE_METAL_ORES")).toBe("Some Rare Metal Ores");
});
