import { unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "@playwright/test";
import {
	expectConvertPanelVisible,
	expectToolStatusError,
	fixturePath,
} from "./helpers";

test("wrong format upload shows error", async ({ page }) => {
	await page.goto("/");
	const badPath = join(fixturePath(".."), "fake-upload.pdf");
	await writeFile(badPath, "not a real pdf");

	try {
		await page.locator("#tool-file-input").setInputFiles(badPath);
		await expectToolStatusError(page, /CSV|unsupported|accept/i);
		await expectConvertPanelVisible(page, false);
	} finally {
		await unlink(badPath).catch(() => {});
	}
});

test("oversize upload shows error", async ({ page }) => {
	const bigPath = join(fixturePath(".."), "oversize.csv");
	const big = Buffer.alloc(52_428_801, 0x2c);
	const header = Buffer.from("name,count\n");
	header.copy(big);

	try {
		await writeFile(bigPath, big);
		await page.goto("/");
		await page.locator("#tool-file-input").setInputFiles(bigPath);
		await expectToolStatusError(page, /too large/i);
	} finally {
		await unlink(bigPath).catch(() => {});
	}
});

test("invalid CSV content shows error", async ({ page }) => {
	const invalidPath = join(fixturePath(".."), "invalid-content.csv");
	await writeFile(invalidPath, 'name,count\n"unclosed quote,1');

	try {
		await page.goto("/");
		await page.locator("#tool-file-input").setInputFiles(invalidPath);
		await page.getByRole("radio", { name: "CSV → JSON", exact: true }).check();
		await page.locator("#tool-convert-btn").click();
		await expectToolStatusError(page, /quoted|CSV|parse|invalid|failed|unterminated/i);
	} finally {
		await unlink(invalidPath).catch(() => {});
	}
});
