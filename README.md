# CSV Converter

Convert CSV files in your browser. Nothing leaves your device.

Part of the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo. Production URL: https://csv.askjeeves.cc

## Overview

| | |
|---|---|
| **Package name** | `csv-tools` |
| **Source format** | CSV |
| **Conversions** | 2 enabled |

- CSV → JSON
- CSV → Excel (XLSX)

## How it works

All conversion runs **in your browser**. Files are never uploaded to a server. Shared UI and validation live in @askjeeves/ui and @askjeeves/conversion-core. This folder only wires tool.config.ts to processor functions.

See [docs/UI-AND-SEO-ARCHITECTURE.md](docs/UI-AND-SEO-ARCHITECTURE.md) for the UI and SEO architecture (page composition, meta tags, JSON-LD, llms files, and build pipeline).

## Requirements

- Node.js ≥ 22.12
- pnpm 10.27+

## Monorepo development

From the repository root:

```bash
pnpm install
pnpm --filter csv-tools dev
```

Opens [http://localhost:4321](http://localhost:4321) by default.

## Build

```bash
pnpm --filter csv-tools build
```

Static output: tools/csv-tools/dist/ (index.html plus _astro/ assets).

## Preview dist/

Serve the build output (do not open index.html via file:// — ES modules require a server):

```bash
pnpm --filter csv-tools preview
```

Or:

```bash
cd tools/csv-tools
npx serve dist -p 4321
```

Then open [http://localhost:4321](http://localhost:4321).

## Deploy

Cloudflare Pages:

```bash
pnpm --filter csv-tools deploy
```

See [docs/deployment.md](../../docs/deployment.md).

## Tests

```bash
pnpm test
pnpm test:e2e
```

Unit tests verify processor/config alignment. E2E tests cover conversion flows and SEO head tags, structured data, and static files.

## Errors users may see

Failures appear in #tool-status with accessible error styling. Common cases:

| Situation | What to do |
|-----------|------------|
| Wrong file type | Upload a CSV file |
| File too large | Use a smaller file (max ~50 MB, lower for some conversions) |
| Invalid file content | Use a valid CSV file |
| Conversion failed | Try different options or another file |
| Cancelled | Click Convert again |
| Load / engine error | Refresh the page |

Full error contract: [docs/error-handling.md](../../docs/error-handling.md).

## Standalone repository

**Do not copy `tools/csv-tools/` directly** into a new repo. That folder uses `workspace:*` dependencies that only resolve inside the monorepo; `npm install` will produce a broken `node_modules` tree.

To export this tool as its own repo (vendored @askjeeves/* deps, no monorepo):

```bash
node scripts/export-standalone-tool.mjs csv-tools ./export/csv-tools
cd export/csv-tools
pnpm build
pnpm preview
```

The export script vendors shared packages under `vendor/@askjeeves/`, rewrites deps to `file:` paths, and generates `pnpm-lock.yaml`. Use **pnpm**, not npm.

See [docs/sub-projects.md](../../docs/sub-projects.md) and `STANDALONE.md` in the export output.
