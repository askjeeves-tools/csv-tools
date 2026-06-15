import { test } from "@playwright/test";
import { CSV_CONVERSION_CASES, runCsvConversionCase } from "./helpers";

for (const testCase of CSV_CONVERSION_CASES) {
	test(`converts ${testCase.id}`, async ({ page }) => {
		await page.goto("/");
		await runCsvConversionCase(page, testCase);
	});
}
