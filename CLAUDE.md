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

<!-- TODO: Replace this section with the rules for the approach you chose. -->

This branch (`feature/tailwind-book-cards`) uses Tailwind CSS v4. Design direction: modern, minimalist, Swiss style. Grid-based layout, one sans-serif typeface, strong hierarchy through size and weight, hairline rules instead of shadows, a monochrome palette with a single accent, flush-left text, generous whitespace.

- Use Tailwind CSS v4 only. No `tailwind.config.js`.
- Colors, font and spacing unit live in `src/tokens.json`, shared with the other branches. `npm run tokens` turns them into the `@theme` in `src/tokens.generated.css` (do not edit it, `predev` and `prebuild` run it).
- No inline `style` props, no other CSS libraries.
- Reuse components. Do not repeat long class lists, extract a component.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
