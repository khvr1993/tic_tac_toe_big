# Big Tic-Tac-Toe

A **12 × 12 five-in-a-row** game (Gomoku) that runs entirely in the browser. No build step, no dependencies — one HTML file plus a few PWA assets.

Play: **https://khvr1993.github.io/tic_tac_toe_big/**

## Features

- **Landing screen** to pick your side, opponent and level before every match. No coin toss.
- **◯ O always moves first**, then ✕ X. Choosing ✕ means you play second.
- **Two modes** — hot-seat for two players on one device, or a computer opponent.
- **Three AI levels** — Easy, Medium and Hard. The AI scores every candidate point by line patterns (open fours, open threes, double threats) and Hard adds a two-ply lookahead.
- **Win detection** in every direction, including overlines (six or more still wins).
- **Hints** — ask the engine for a suggestion; the cell pulses and the coordinate appears in a toast.
- **Undo** — in AI mode it rewinds the pair so the turn comes back to you.
- **Moves popup** — a button opens the full move list with a replay scrubber, so the board stays uncluttered during play.
- **Local stats** — wins/losses/draws per mode and difficulty, persisted in `localStorage`.
- **Polish** — animated stone drops, last-move ring, winning line, sound toggle, keyboard navigation (arrows + Enter), responsive board.
- **Installable PWA** — add it to your phone's home screen and play offline.

## Install on your phone

**iPhone / iPad (Safari)**
1. Open https://khvr1993.github.io/tic_tac_toe_big/
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Launch it from the home screen — it opens full screen and works offline.

**Android (Chrome)**
1. Open the link above.
2. Tap the **Install app** button in the header (or Chrome's ⋮ menu → **Install app**).
3. Confirm — it appears in your app drawer and works offline.

On desktop Chrome/Edge the same **Install app** button installs it as a standalone window.

## Rules

- The board is 12 × 12 (columns `A–L`, rows `1–12`).
- ◯ O always moves first, then ✕ X.
- The first player to line up **five** stones in a row, column or diagonal wins.
- Six or more in a row also counts as a win.
- If the board fills with no five, the game is a draw.

## Screens

1. **Landing** — choose ✕ or ◯, vs Computer or 2 Players, difficulty, then Start.
2. **Game** — the board plus a slim panel: turn status, New game / Undo / Hint, Moves and Menu.
3. **Moves popup** — the numbered move list and replay slider.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

A local server is needed for the service worker (offline mode); opening `index.html` directly still plays fine.

## Project layout

```
index.html              the whole game (markup, styles, logic)
manifest.webmanifest    PWA metadata
sw.js                   offline cache (network-first pages, cache-first assets)
icon.svg                vector icon
pwa-*.png               install icons (192, 512, maskable)
apple-touch-icon.png    iOS home-screen icon
.github/workflows/deploy.yml   deploys to GitHub Pages on push
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which stages the static files and publishes them with GitHub Pages. Pages must be set to **GitHub Actions** as the source (Settings → Pages → Build and deployment → GitHub Actions).
