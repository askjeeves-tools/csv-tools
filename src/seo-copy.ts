export const HOW_IT_WORKS_STEPS = [
	"Upload a CSV file using the drop zone or file picker.",
	"Choose an output format: JSON or Excel (XLSX).",
	"Click Convert, then download your result. Nothing is uploaded to a server.",
] as const;

export const SECURITY_SECTION_COPY =
	"Your CSV files are processed locally in your browser. Nothing is stored on a server and nothing is uploaded over the network. That makes this tool a good fit for spreadsheets, exports, and other sensitive data you do not want to send to a third-party service.";

export const CONVERSION_DESCRIPTIONS: Record<string, string> = {
	"csv-json":
		"Convert CSV to JSON with structured row objects—ideal for APIs, scripts, and web apps.",
	"csv-xlsx":
		"Convert CSV to Excel (XLSX) for opening in Microsoft Excel, Google Sheets, or LibreOffice.",
};
