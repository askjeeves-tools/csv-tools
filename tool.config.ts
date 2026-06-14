import { createToolConfig } from "@askjeeves/conversion-core";

export const toolConfig = createToolConfig({
	id: "csv-tools",
	title: "CSV Converter",
	tagline: "Convert CSV files in your browser. Nothing leaves your device.",
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
