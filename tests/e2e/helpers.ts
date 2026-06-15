import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, type Page } from "@playwright/test";

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");

export function fixturePath(name: string): string {
	return join(fixturesDir, name);
}

export async function expectToolStatusError(
	page: Page,
	pattern: RegExp,
): Promise<void> {
	const status = page.locator("#tool-status");
	await expect(status).toHaveClass(/error/);
	await expect(status).toHaveText(pattern);
}

export async function expectConvertPanelVisible(
	page: Page,
	visible: boolean,
): Promise<void> {
	const panel = page.locator("#tool-convert-panel");
	if (visible) {
		await expect(panel).not.toHaveClass(/hidden/);
	} else {
		await expect(panel).toHaveClass(/hidden/);
	}
}

export interface CsvConversionCase {
	id: string;
	fixture: string;
	methodLabel: string;
}

export async function runCsvConversionCase(
	page: Page,
	testCase: CsvConversionCase,
): Promise<void> {
	await page.locator("#tool-file-input").setInputFiles(fixturePath(testCase.fixture));
	await expectConvertPanelVisible(page, true);
	await page
		.getByRole("radio", { name: testCase.methodLabel, exact: true })
		.check();
	await page.locator("#tool-convert-btn").click();
	await expect(page.locator("#tool-download")).not.toHaveClass(/hidden/);
	await expect(page.locator("#tool-status")).toHaveText(/ready to download/i);
}

export const CSV_CONVERSION_CASES: CsvConversionCase[] = [
	{ id: "csv-json", fixture: "sample.csv", methodLabel: "CSV → JSON" },
	{
		id: "csv-xlsx",
		fixture: "sample.csv",
		methodLabel: "CSV → Excel (XLSX)",
	},
];
