# React SSR Made Simple

Minimal, production-ready SSR for React with Vite, React Router, TailwindCSS and DaisyUI.

## Scripts

- `npm run dev` — Start SSR dev server (Vite middleware + HMR)
- `npm run build` — Build client and server bundles
- `npm run preview` — Run production SSR server
- `npm run lint` — Lint

## Pages

- Home `/` — headline, short description, GitHub and Get Started buttons
- Get Started `/get-started` — step-by-step SSR guide with snippets

## Tech

- Vite + React 19
- Express SSR server (dev + prod)
- React Router for routing
- TailwindCSS + DaisyUI for styling

## Structure

- `server/index.js` — SSR server (Express)
- `src/entry-client.jsx` — Client entry (hydrate)
- `src/entry-server.jsx` — Server entry (render)
- `src/pages/*` — Page components
- `index.html` — HTML template with `<!--app-html-->` outlet
