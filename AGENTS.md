# AGENTS.md
Guidance for coding agents working in `/home/kschltz/shared/coc7e`.

## Overview
- Stack: Vite, React 19, TypeScript, Tailwind CSS v4, Zustand, Zod, i18next.
- App type: browser-first SPA for creating and editing Call of Cthulhu 7e investigator sheets.
- Entrypoints: `src/main.tsx`, `src/App.tsx`.
- Routes: `/`, `/criar`, `/ficha`.
- State: `src/store/investigatorStore.ts`.
- Domain logic: `src/domain/` and `src/application/index.ts`.
- Import/export: `src/adapters/fileAdapter.ts`.
- Theme and fonts: `src/index.css`.
- PWA config: `vite.config.ts`.

## Existing Repo Rules
- No prior repo-local `AGENTS.md` existed.
- No `.cursorrules` file was found.
- No `.cursor/rules/` directory was found.
- No `.github/copilot-instructions.md` file was found.

## Setup
- Install dependencies first:

```bash
npm install
```

- If Gemini-backed features matter, create `.env.local` and set `GEMINI_API_KEY`.

## Commands
- Available scripts:

```bash
npm run dev
npm run build
npm run preview
npm run clean
npm run lint
npm run test:e2e
npm run test:e2e:headed
```

- `npm run dev`: starts Vite on `0.0.0.0:3000`.
- `npm run build`: creates a production bundle in `dist/`.
- `npm run preview`: serves the built app locally.
- `npm run clean`: deletes `dist/`.
- `npm run lint`: runs `tsc --noEmit`; this repo does not use ESLint as its lint command.
- `npm run test:e2e`: runs Playwright E2E tests (Chromium) with automatic dev server startup/reuse.
- `npm run test:e2e:headed`: runs Playwright E2E tests in headed mode.
- Recommended validation after changes:

```bash
npm run lint
npm run build
```

## Tests
- Playwright is configured for E2E tests in `tests/e2e`.
- Run all E2E tests:

```bash
npm run test:e2e
```

- Run a single E2E spec file:

```bash
npx playwright test tests/e2e/<file>.spec.ts
```

- Run a single test by title:

```bash
npx playwright test -g "<test title>"
```

## Manual Verification
1. Run `npm run dev`.
2. Verify landing, wizard, and sheet routes.
3. Verify JSON export and import.
4. Verify derived stats recalculate after edits.
5. Verify both `en` and `pt-BR` UI.
6. Finish with `npm run lint` and `npm run build`.

## Important Files
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: route tree.
- `src/pages/`: route-level pages.
- `src/components/layout/`: app shell and shared layout.
- `src/components/ui/`: reusable styled controls.
- `src/components/wizard/`: wizard step UI.
- `src/store/investigatorStore.ts`: Zustand stores for sheet and wizard.
- `src/domain/schema.ts`: persisted sheet schema.
- `src/application/index.ts`: investigator creation and defaults.
- `src/adapters/fileAdapter.ts`: browser JSON load/save.
- `src/i18n/index.ts`: translation resources.
- `src/lib/utils.ts`: `cn()` helper with `clsx` and `tailwind-merge`.

## Architecture Rules
- Keep domain calculations in `src/domain/` or `src/application/`, not buried in pages.
- Keep browser and file IO logic in `src/adapters/`.
- Keep global investigator state in Zustand.
- Keep reusable visual primitives in `src/components/ui/`.
- Keep wizard-step-specific code in `src/components/wizard/`.
- Keep route pages focused on composition and navigation.

## TypeScript Guidelines
- Prefer explicit types on exported functions, store interfaces, and public helpers.
- Reuse `interface` where the file already uses interface-based contracts.
- Use Zod for persisted or imported data shapes.
- Prefer `z.infer<typeof Schema>` for schema-backed types.
- Prefer narrow unions for domain keys like attributes.
- Avoid introducing new `any`; current `as any` usage is debt, not a model.
- If a cast is required, keep it narrow and local.

## Imports and Paths
- Keep third-party imports first, then local imports.
- Most source files use relative imports; follow that unless there is a strong reason not to.
- The `@` alias exists, but it points to the repository root, not `src/`.
- Do not assume `@/foo` means `src/foo`; verify the actual path.
- Avoid noisy import reordering in files that are already readable.

## Formatting
- Use 2-space indentation.
- Use semicolons.
- Prefer double quotes in app source files; configs are mixed, so match the file.
- Keep trailing commas in multiline arrays, objects, params, and JSX props.
- Break long JSX and className expressions across lines instead of compressing them.
- Stay ASCII unless the file already contains non-ASCII content that should remain.
- Add comments only when a block is genuinely non-obvious.

## Naming
- PascalCase for React components and page files.
- camelCase for helpers, utilities, and most non-component filenames.
- `useXStore` for Zustand hooks.
- `Schema` suffix for Zod schemas.
- UPPER_SNAKE_CASE for stable constants and catalog data.
- Preserve persisted JSON keys and translation-linked keys when renaming.

## React and UI Conventions
- Prefer function components.
- Preserve `React.forwardRef` in existing UI primitives such as `PulpButton`.
- Reuse `Pulp*` components before adding parallel button/input/select abstractions.
- Keep styling primarily in Tailwind utility classes.
- Use global CSS for theme tokens, fonts, and app-wide effects only.
- Preserve the existing pulp/horror visual style; do not replace it with generic SaaS styling.
- Respect responsive classes already present in layouts.

## State and Data Conventions
- Use Zustand for cross-page sheet and wizard state.
- Use local `useState` only for temporary UI concerns.
- Preserve `updatedAt` behavior when modifying store update paths.
- If a change affects derived stats, update recalculation logic too.
- If you add a persisted field, update schema, defaults, store behavior, UI, and import/export together.
- If you add translated text, update both `en` and `pt-BR` resources.

## Validation and Error Handling
- Persisted data must remain compatible with `InvestigatorSheetSchema`.
- Keep JSON import validation on the `safeParse` path.
- Current error handling is lightweight: `try/catch`, `console.error`, `alert`, and `window.confirm`.
- Follow the local pattern unless your task intentionally introduces a broader error UX.
- Do not silently ignore validation failures.
- Log technical context when the user-facing message stays simple.

## Styling Rules
- Prefer theme variables from `src/index.css` over repeated hardcoded colors.
- Reuse `var(--color-weird-*)` tokens where possible.
- Keep typography aligned with the current custom font stack.
- Use `cn()` when conditional class composition gets messy.

## Runtime Caveats
- This app uses browser APIs like `Blob`, file inputs, `localStorage`, and `beforeunload`.
- Guard new logic if it could execute outside the browser.
- Do not assume a real backend exists just because some server-side dependencies are present.
- HMR behavior in `vite.config.ts` is intentionally environment-controlled; do not casually rewrite it.

## When You Add Tooling
- If you add tests, document exact all-test and single-test commands here.
- If you add ESLint, Prettier, or another required checker, document the canonical command here.
- If you add repo-specific Cursor or Copilot rules, mirror the important points here too.
