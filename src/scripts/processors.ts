import { csvToJson } from "@askjeeves/processors-csv-json";
import { csvToXlsx } from "@askjeeves/processors-xlsx";
import type { ProcessorMap } from "@askjeeves/ui/scripts/tool-controller";

export const processors: ProcessorMap = {
	"csv-json": csvToJson,
	"csv-xlsx": csvToXlsx,
};
