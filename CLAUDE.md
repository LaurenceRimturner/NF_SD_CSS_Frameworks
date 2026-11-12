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

This branch uses shadcn/ui on Tailwind CSS v4:

- Use shadcn/ui and Tailwind CSS v4 only. No `tailwind.config.js`. No other CSS libraries.
- Components in `src/components/ui` come from the shadcn CLI (`npx shadcn@latest add ...`). Do not restyle them with repeated class lists, change the variants or the theme instead. Our own components live in `src/components`.
- Colors and radius come from the CSS variables of the shadcn theme in `src/index.css` (`:root` and `@theme inline`). No hex or oklch values or invented colors in components, use the theme classes (`bg-card`, `text-foreground`, `bg-cover-1`, `text-gilt`, ...).
- No inline `style` props. The CLI writes some (`ui/sonner.tsx`, `ui/toggle-group.tsx`), replace them by classes. Check this again after every `shadcn add`. Toasts come from `sonner`, `<Toaster />` is rendered once in `App.tsx`. Dialogs are the shadcn `Dialog` (focus trap, Escape and focus return are handled).
- Reuse components. Do not repeat long class lists, extract a component.
- Design direction: an old library. Dark wood background with a faint grain, each book stands on a shelf plank (`plank`) as a leather cover (`bg-cover-1` to `bg-cover-5`) with a spine on the left and a gilt title, the details on a parchment page (`pages`). Status is a bookmark in the status color plus its label. Serif display font (Playfair Display) only for titles, normal system font for text.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
