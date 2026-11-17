# Philomath Bingo

Full-screen live caller display for Philomath Middle School Turkey Bingo. Static client-only app — no backend, auth, or database.

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Night-of checklist

1. Open the app URL on the projector laptop **early** (first load caches the shell via the service worker).
2. Keep the tab open for the whole event.
3. Disable OS sleep / screen lock on the laptop.
4. Prefer wired display; gym Wi‑Fi is flaky — after first load the app should keep working offline.
5. Optional backup: copy the `dist/` folder to a USB drive and open `index.html` via a local static server if needed.
6. Game state survives refresh via `localStorage`. Use **Reset** (with confirm) to start a clean round.

## Deploy

Deploy the Vite static build to Vercel (separate project). Point `bingo.hazeltine.co` at that project when ready.
