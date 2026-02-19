# AAE Guestbook · Attentive Art Encounters

Interactive neural-web guestbook for the Louisiana art walk. Swipe, zoom, tap an artwork to see who else chose it and add your response.

## Run locally

From this folder in a terminal:

```bash
npx serve .
```

Then open **http://localhost:3000** in your browser (or the URL shown). Use your phone on the same Wi‑Fi and visit `http://<your-computer-ip>:3000` for a real mobile test.

## What’s in the box

- **Graph**: Artworks as nodes, connected in a web. Pan (swipe) and pinch to zoom; tap a node to open it.
- **Detail view**: Artwork image, “X people chose this” hint, list of contributions, form to add yours.
- **Persistence**: New contributions are stored in the browser’s `localStorage` so they survive refresh when testing locally.

## Data

- **Artworks**: `js/data.js` (placeholder images from picsum.photos).
- **Contributions**: Seed data in `js/data.js` plus any you add via the form (stored in `localStorage`).

Replace placeholder images and seed data with real artworks and real responses when you’re ready.
