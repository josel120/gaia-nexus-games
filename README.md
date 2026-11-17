# Gaia Nexus Games

Free browser games from [Gaia Nexus](https://www.gaia-nexus.com/). No sign-up, no downloads, no ads yet — built for traffic and daily play first.

## Games

| # | Game | Folder | Hook |
|---|------|--------|------|
| 1 | Nexus Snake | `snake/` | Classic snake, speed ramps up |
| 2 | Gaia 2048 | `2048/` | Slide and merge to 2048 |
| 3 | Memory Bloom | `memory/` | Flip and match all pairs against the clock |
| 4 | Brick Breaker Nexus | `breakout/` | Paddle, ball and bricks |
| 5 | Orbit Flap | `orbit-flap/` | One-tap flight through gates |
| 6 | Minefield Logic | `minesweeper/` | Clear the field without hitting a mine |
| 7 | Echo Sequence | `echo/` | Watch, listen, repeat the pattern |
| 8 | Block Drop | `block-drop/` | Stack falling blocks, clear lines |
| 9 | Daily Word | `word-guess/` | Five letters, six tries, new word daily |
| 10 | Star Catcher | `star-catcher/` | Catch stars, dodge bombs |

## Run locally

```powershell
python -m http.server 8765
# open http://localhost:8765/
```

Any static host works (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

## Publish to GitHub

This folder is its own repository. From inside it:

```powershell
git init
git add .
git commit -m "Gaia Nexus Games: 10 free browser games"
gh repo create gaia-nexus-games --public --source=. --push
```

Then enable GitHub Pages (Settings → Pages → `main` / root) or import the repo in Vercel, and point `games.gaia-nexus.com` at it.

## Monetisation (later, in order)

1. **Traffic first (now):** SEO pages, daily word, shareable scores, links from gaia-nexus.com.
2. **Portals:** submit to CrazyGames / Poki / GameDistribution for revenue share — no ad account needed.
3. **Ads:** AdSense / Playwire slots on the hub and between games once traffic justifies approval.
4. **Premium:** one-off "no ads + extra themes" pass; sponsored themes for local businesses.

## Licence

MIT — see the hub page footer.
