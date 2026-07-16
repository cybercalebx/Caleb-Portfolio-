# CLAUDE.md

Guidance for Claude Code (or any AI agent) working in this repository.

## Project

Single-page portfolio for Caleb Andrew Omojowo, built with Next.js 15 (App Router) + TypeScript.
The entire site currently lives in `app/page.tsx` as a ported static HTML/CSS/JS build — see
"Architecture" below before assuming this is a typical component-based React app.

## Architecture

- `app/layout.tsx` — root layout, loads Google Fonts via `next/font/google`, sets metadata,
  renders `<html data-theme="dark">`.
- `app/globals.css` — all site styles (CSS custom properties for theming, no Tailwind).
- `app/page.tsx` — a client component. The full page markup is injected via
  `dangerouslySetInnerHTML` from a template string (`BODY_HTML`), and the original vanilla-JS
  behavior (theme toggle, scroll reveal, stat counters, terminal typing animation, contact form,
  report filter) runs inside a single `useEffect` on mount. This was a fast, faithful port of a
  static HTML file — it is **not** yet broken into React components.

## Common tasks

- **Editing content/copy**: find the relevant text inside the `BODY_HTML` template string in
  `app/page.tsx` and edit directly.
- **Editing styles**: edit `app/globals.css`. CSS variables for both themes are defined at the top
  under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.
- **Adding real form submission**: replace the mock handler in the `useEffect` script block (search
  for `contactForm`) with a call to an API route or a service like Resend/Formspree.
- **Componentizing**: if asked to refactor into proper React components, extract one section at a
  time (hero, about, skills, projects, experience, education, tools, contact) into files under
  `app/components/`, converting inline `onclick`/`class` to JSX and moving `useEffect` logic into
  the components that need it.

## Conventions

- TypeScript strict mode is on — keep new code typed, avoid `any`.
- No CSS framework; keep using the existing CSS variable system for colors/spacing.
- Don't introduce client state libraries for what can stay a static section.

## Commands

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```
