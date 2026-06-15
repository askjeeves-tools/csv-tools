import { createToolConfig } from "@askjeeves/conversion-core";
import { SEO_BRAND_TITLE, SEO_DESCRIPTION } from "./src/seo";

export const toolConfig = createToolConfig({
	id: "csv-tools",
	title: SEO_BRAND_TITLE,
	tagline: SEO_DESCRIPTION,
	sourceFormat: "csv",
	allowsMultiple: false,
	minFiles: 1,
	conversions: [
		{
			id: "csv-json",
			source: "csv",
			target: "json",
			label: "CSV → JSON",
			enabled: true,
			options: "none",
		},
		{
			id: "csv-xlsx",
			source: "csv",
			target: "xlsx",
			label: "CSV → Excel (XLSX)",
			enabled: true,
			options: "none",
		},
	],
});
