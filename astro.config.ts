import askJeeves from "@askjeeves/astro-integration";
import { defineConfig } from "astro/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	output: "static",
	site: "https://csv.askjeeves.cc",
	integrations: [
		askJeeves({
			name: "Ask Jeeves",
			tagline: "Convert CSV files in your browser. Nothing leaves your device.",
			version: pkg.version,
			openGraph: {
				home: {
					title: "CSV Converter — Ask Jeeves",
					description:
						"Free CSV to JSON and CSV to Excel conversion in your browser. No upload.",
				},
			},
		}),
	],
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
		ssr: {
			noExternal: [
				"@askjeeves/conversion-core",
				"@askjeeves/processors-csv-json",
				"@askjeeves/processors-xlsx",
				"@askjeeves/ui",
			],
		},
	},
});
