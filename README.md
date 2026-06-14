<p align="left">
  <img src="https://raw.githubusercontent.com/askjeeves-tools/.github/main/assets/logo-readme.png" alt="Ask Jeeves mascot" width="120" />
</p>

# CSV Converter

Convert CSV files in your browser. Nothing leaves your device.

**Try it online:** [csv.askjeeves.cc](https://csv.askjeeves.cc)

**More free tools:** [askjeeves.cc](https://askjeeves.cc) — PDF, images, CSV/JSON/Excel, Word, and more.

## Supported conversions

| Conversion | Status |
|------------|--------|
| CSV → JSON | Enabled |
| CSV → Excel (XLSX) | Enabled |

Maximum file size: ~50 MB.

## How it works

All conversion runs **in your browser**. Files are never uploaded to a server. Shared UI and validation live in vendored `@askjeeves/*` packages under `vendor/`. This repo wires [tool.config.ts](tool.config.ts) to processor functions in [src/scripts/processors.ts](src/scripts/processors.ts).

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 22.12 |
| pnpm | 10.27+ |

Enable pnpm once if needed:

```bash
corepack enable pnpm
```

**Use pnpm, not npm** — a `preinstall` script enforces this.

## Install and run

```bash
git clone https://github.com/askjeeves-tools/csv-tools.git
cd csv-tools
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build and preview

```bash
pnpm build      # output → dist/
pnpm preview    # serves dist/ locally
```

Do not open `dist/index.html` via `file://` — ES modules require a local server.

## Deploy

### Option A — Cloudflare Pages (built-in)

```bash
pnpm deploy
```

This runs `pnpm build` then `wrangler pages deploy dist`. Log in first with `wrangler login`. Configuration lives in [wrangler.toml](wrangler.toml).

### Option B — Any static host

After `pnpm build`, upload the contents of `dist/` to Netlify, Vercel, GitHub Pages, S3, or any static host. No server-side runtime is required.

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Astro dev server |
| `build` | Static production build |
| `preview` | Preview `dist/` |
| `deploy` | Build + Cloudflare Pages deploy |
| `test:e2e` | Playwright end-to-end tests (see below) |
| `lint` | Biome check |

## Packages

### Runtime dependencies

| Package | Role |
|---------|------|
| `astro` | Static site framework |
| `@askjeeves/ui` | Layout, converter UI, client controller |
| `@askjeeves/conversion-core` | Config, validation, errors, file limits |
| `@askjeeves/astro-integration` | Astro plugin, branding globals |
| `@askjeeves/processors-csv-json` | CSV parsing (PapaParse) |
| `@askjeeves/processors-xlsx` | Excel export (ExcelJS) |

The five `@askjeeves/*` packages are vendored under `vendor/@askjeeves/` and linked via `file:` paths in [package.json](package.json). You do not install them separately.

### Dev dependencies

| Package | Role |
|---------|------|
| `typescript` | Type checking |
| `@playwright/test` | End-to-end tests |
| `wrangler` | Cloudflare Pages deploy |

### Transitive (via processors)

PapaParse, ExcelJS, and Zod are pulled in automatically by the processor packages.

## Tests

End-to-end tests under `tests/e2e/` import `@askjeeves/test-e2e`, which is **not** included in this standalone export. To run them locally, sync that package from the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo into `vendor/@askjeeves/test-e2e` and add a matching `file:` dependency in `package.json`, or run tests from the upstream monorepo instead.

```bash
pnpm test:e2e
```

## Errors users may see

Failures appear in `#tool-status` with accessible error styling. Common cases:

| Situation | What to do |
|-----------|------------|
| Wrong file type | Upload a CSV file |
| File too large | Use a smaller file (max ~50 MB) |
| Invalid file content | Use a valid CSV file |
| Conversion failed | Try different options or another file |
| Cancelled | Click Convert again |
| Load / engine error | Refresh the page |

## For maintainers

This repo was exported from the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo as a self-contained project. Shared packages live in `vendor/@askjeeves/`.

Do **not** copy `tools/csv-tools/` directly from the monorepo — that folder uses `workspace:*` dependencies that only resolve inside the monorepo. To re-export after upstream changes:

```bash
node scripts/export-standalone-tool.mjs csv-tools ./export/csv-tools
```

See [docs/sub-projects.md](https://github.com/montana-digital/askjeeves-modules/blob/main/docs/sub-projects.md) in the upstream repo.
