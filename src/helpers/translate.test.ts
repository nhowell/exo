import { t } from "./translate";

it("returns the original string", () => {
	expect(t("Some text")).toEqual("Some text");
});
