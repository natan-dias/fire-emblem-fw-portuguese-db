# Tech stack

## Stack

- **Vite + React + TypeScript**: static site, no backend.
- **react-router-dom** with `HashRouter` (routes live under `#/...`, which avoids 404s on GitHub Pages).
- **Plain CSS** in `src/styles.css`.
- **GitHub Pages** hosting, deployed by GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

## Structure

```
scripts/build-data.mjs     Pulls data and portraits from the reference site
public/portraits/          Character portraits
src/data/characters.json   Characters, skill ids and recruitment conditions
src/data/skills.json       Skills (original English name and description)
src/i18n/                  UI strings and skill translations
src/pages/                 Pages: Characters and Recruitment
```

## Languages

- pt-BR / pt-PT switch in the header (saved in `localStorage`).
- UI strings: `src/i18n/ui.ts`.
- Skill descriptions: `src/i18n/skills.pt-BR.json` (base). `skills.pt-PT.json` only holds overrides relative to pt-BR.
- Character and skill names stay in English.

## Commands

```bash
npm install
npm run dev       # dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the build locally
npm run data      # regenerate data and portraits from the reference site
```

`npm run data` does not touch existing translations; new skills must be added to `skills.pt-BR.json`.

## Notes

- The base path `/fire-emblem-fw-portuguese-db/` is set in `vite.config.ts`.
- If `npm run build` fails with "Cannot find native binding" (npm bug with optional dependencies), install the binary for your platform, e.g. `npm i --no-save @rolldown/binding-darwin-arm64`.
