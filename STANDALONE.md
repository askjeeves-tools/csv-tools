# Standalone csv-tools

This directory was exported from the Ask Jeeves Modules monorepo. It is **self-contained** and must not be created by copying `tools/<name>/` directly.

## Requirements

- Node.js >= 22.12
- pnpm 10.27+ (`corepack enable` if needed)

## First-time setup

```bash
pnpm install
pnpm build
pnpm preview
```

## Do not

- Copy `tools/csv-tools/` from the monorepo — it uses `workspace:*` deps that only work inside the monorepo
- Run `npm install` on an unexported copy — it produces a broken `node_modules` tree
- Commit `node_modules/` or `package-lock.json`

## Re-export after shared package changes

From the monorepo root:

```bash
node scripts/export-standalone-tool.mjs csv-tools ./export/csv-tools
```

See [docs/sub-projects.md](https://github.com/montana-digital/askjeeves-modules/blob/main/docs/sub-projects.md) in the monorepo.
