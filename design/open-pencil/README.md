# OpenPencil system extract

This folder contains a design-system extraction of the current UI, based on the live codebase rather than an existing `.fig` source file.

Files:

- `design-system.jsx` - OpenPencil JSX that lays out colors, typography, components, and surface patterns.
- `tokens.json` - raw token reference pulled from the app theme and shared UI primitives.

Source references used for extraction:

- `src/index.css`
- `src/components/ui/PulpButton.tsx`
- `src/components/ui/PulpInput.tsx`
- `src/components/ui/PulpSelect.tsx`
- `src/components/ui/PulpCheckbox.tsx`
- `src/components/ui/PulpDivider.tsx`
- `src/components/layout/AppShell.tsx`
- `src/pages/LandingPage.tsx`
- `src/pages/CreationWizardPage.tsx`

Suggested OpenPencil workflow:

```bash
# If OpenPencil is available in your environment
bun open-pencil new-document

# Then use the JSX in design-system.jsx with the render flow from the OpenPencil tooling
```

Notes:

- I could not directly open or validate an OpenPencil session here because `bun` is not installed in this environment.
- The artifact is still structured to be easy to render/import into an OpenPencil document once that tooling is available.

Headless export workaround:

```bash
# OpenPencil's built-in headless export currently crashes here with
# `window is not defined` inside its font loader.
# Use this wrapper instead:

bun design/open-pencil/export-fig.ts \
  design/open-pencil/coc7e-ui.fig \
  Landing \
  design/open-pencil/landing-export.png \
  png
```

The wrapper polyfills the missing browser global before calling OpenPencil's headless renderer.
