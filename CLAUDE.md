# Reading List

A reading list built with React 19, TypeScript and Vite. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

## Commands

- `npm run dev`: start the app on http://localhost:3000
- `npm run test:run`: run the tests once
- `npm run check`: check the types
- `npm run build`: build the app

## Rules

- **Do not change** `src/useBooks.ts`, `src/books.ts`, `src/types.ts` or `src/seed.json`. They are tested and shared between all versions of the app. Only build the view layer.
- Use function components and hooks. No class components.
- No `any`. Type props explicitly.
- Keep components small. One component per file in `src/components`.
- Run `npm run check` and `npm run test:run` before you say a task is done.

## Styling

This branch (`feature/bootstrap-book-cards`) uses Bootstrap 5.3 with Sass:

- Use Bootstrap classes only. Customize with Sass variables in `src/index.scss`, set before `@import "bootstrap/scss/bootstrap"`. No other CSS libraries.
- Colors, font and spacing unit live in `src/tokens.json`, shared with the other branches. `npm run tokens` turns them into Sass variables in `src/_tokens.scss` (do not edit it, `predev` and `prebuild` run it).
- Own CSS is allowed only for what Bootstrap cannot do, in `src/index.scss`: the `<dialog>` size and backdrop, and the theme-aware surfaces and buttons (`surface-*`, `btn-ink`, `btn-outline-ink`).
- Dark mode uses Bootstrap's `data-bs-theme` on `<html>`, set by `src/useTheme.ts`. It follows the system setting until the reader uses the toggle. Do not use the fixed `*-dark` / `*-light` / `bg-white` classes for surfaces, they do not follow the theme.
- No inline `style` props. No Bootstrap JavaScript, the dialogs use the native `<dialog>`.
- Reuse components. Do not repeat long class lists, extract a component.
- Design direction: modern, minimalist, Swiss style. Square corners, no shadows, Helvetica, hairline rules, black and white with red and yellow accents.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
