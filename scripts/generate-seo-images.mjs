import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const iconSourcesDir = join(publicDir, "images", "icons");
const vendorAssetsDir = join(root, "vendor", "@askjeeves", "ui", "assets");

mkdirSync(publicDir, { recursive: true });
mkdirSync(iconSourcesDir, { recursive: true });
mkdirSync(vendorAssetsDir, { recursive: true });

const brand = "#8c5cf5";
const brandDark = "#6b3fd4";

function buildSvg(width, height, titleSize, subtitleSize) {
	return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${brand}" />
      <stop offset="100%" stop-color="${brandDark}" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <text x="50%" y="42%" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="${titleSize}" font-weight="700">Free Secure CSV Converter</text>
  <text x="50%" y="58%" text-anchor="middle" fill="#f3ecff" font-family="Segoe UI, Arial, sans-serif" font-size="${subtitleSize}" font-weight="500">Free · Secure · In-browser</text>
  <text x="50%" y="78%" text-anchor="middle" fill="#e8dcff" font-family="Segoe UI, Arial, sans-serif" font-size="${Math.round(subtitleSize * 0.85)}" font-weight="500">Ask Jeeves</text>
</svg>`);
}

async function copyIcon(sourceName, destPath, width, height) {
	const sourcePath = join(iconSourcesDir, sourceName);
	await sharp(sourcePath)
		.resize(width, height, { fit: "cover", position: "centre" })
		.png({ compressionLevel: 9 })
		.toFile(destPath);
}

await sharp(buildSvg(1200, 630, 72, 34))
	.png()
	.toFile(join(publicDir, "og.png"));

await copyIcon(
	"apple-touch-icon.png",
	join(publicDir, "apple-touch-icon.png"),
	180,
	180,
);
await copyIcon(
	"favicon-16x16.png",
	join(publicDir, "favicon-16x16.png"),
	16,
	16,
);
await copyIcon(
	"favicon-32x32.png",
	join(publicDir, "favicon.ico"),
	32,
	32,
);
await copyIcon(
	"favicon-32x32.png",
	join(vendorAssetsDir, "favicon-32x32.png"),
	32,
	32,
);

console.log(
	"Generated public/og.png; copied icons from public/images/icons/ to public/ and vendor assets",
);
