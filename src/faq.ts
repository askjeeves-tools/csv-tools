export interface FaqEntry {
	question: string;
	answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
	{
		question: "Is this CSV converter free?",
		answer:
			"Yes. Every conversion is free with no account, watermark, or usage limit.",
	},
	{
		question: "Is this CSV converter secure?",
		answer:
			"Yes. Files are processed locally in your browser. Nothing is uploaded to a server, so your data stays on your device.",
	},
	{
		question: "What formats can I convert CSV to?",
		answer:
			"You can convert CSV to JSON for developers and APIs, or to Excel (XLSX) for spreadsheet apps.",
	},
	{
		question: "Does the converter handle commas and quoted fields?",
		answer:
			"Yes. The parser handles standard CSV quoting and delimiters so rows with commas inside quoted cells convert correctly.",
	},
	{
		question: "Does the converter work on mobile?",
		answer:
			"Yes. It runs in modern mobile browsers that support HTML5 and JavaScript. Very large files may be slower on mobile devices.",
	},
	{
		question: "What is the maximum file size?",
		answer:
			"Each file can be up to about 50 MB. If a file is too large, you will see a clear error message asking you to use a smaller file.",
	},
	{
		question: "Why did my conversion fail?",
		answer:
			"Common causes are a non-CSV file, invalid or corrupted CSV data, or exceeding the size limit. Check the message below the converter for specific guidance, then try again or refresh the page.",
	},
];
