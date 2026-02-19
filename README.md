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

## Deploy on Railway

1. **Push this repo to GitHub**
   - Create a new repository on GitHub (e.g. `aae-guestbook`).
   - Then in this folder:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aae-guestbook.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app) and sign in (GitHub is easiest).
   - **New Project** → **Deploy from GitHub repo** → choose this repo.
   - Railway will detect `package.json`, run `npm install` and `npm start`. The app serves the static site on the provided `PORT`.
   - After deploy, open **Settings** → **Generate Domain** to get a public URL (e.g. `https://aae-guestbook.up.railway.app`).

3. **Optional:** Add env vars later (e.g. `EVENT_PASSWORD` when you add the shared-password flow).

### If you get "Application failed to respond" (502)

- **Deploy logs:** In Railway → your service → **Deployments** → latest deploy → **View Logs**. After the build you should see `Server listening on 0.0.0.0:XXXX`. If you don’t, the app is crashing at startup (check for errors in the log).
- **Target port:** In the service → **Settings** → **Networking** / **Public networking**, do **not** set a custom "Target port". Leave it blank so Railway uses the `PORT` your app listens on.
- **Start command:** In **Settings** → **Deploy**, the start command should be `node server.js` (or leave empty to use `npm start` from `package.json`).
