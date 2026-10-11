# Suvadi · design notes

A modern, app-style Tamil library in DigiCert blue with deep blue, orange and red accents, light and dark. No flag imagery.

## Colour meanings
| Token | Meaning |
|---|---|
| `--blue` (#0174C3, DigiCert blue) | primary actions (Read), links, focus ring, selected state, letter heatmap scale |
| `--nl-blue` (#21468B, deep blue) | brand surfaces: logo mark, Kural of the day widget |
| `--orange` (#FF7F00, orange) | PDF downloads, highlights, widget markers |
| `--red` (#AE1C28, red) | saved / "on my shelf" state only |
| `--bg`, `--surface*`, `--ink*`, `--line*` | page, cards, text and borders; redefined for dark mode |
| Section colours (`SEC` in the script) | book tiles, covers and section swatches only, all drawn from the same blue/orange/red family |

## Type roles
- **Anek Tamil** (width axis): Tamil display, hero, Kural, covers
- **Hind Madurai**: Tamil body text, titles in cards and lists
- **Onest**: English UI and headings
- **JetBrains Mono**: numbers, release Nº, keyboard hints

## Signature
The hero mosaic: every one of the 1,281 books is one tile, coloured by section. Hover acts as a magnifying lens (nearby tiles swell), the hovered book's section glows and its name shows below; a click sends a ripple across the tiles before the book opens. When idle, a slow shimmer passes and a few tiles twinkle. Legend chips highlight a section.

## Layout
Header (search palette ⌘K / Ctrl K, My shelf, theme) → hero (headline, search, mosaic) → Today bento (Kural of the day, book of the day, collection stats, letter heatmap, recently opened) → Library (filter rail + cards/list) → quick-view drawer for every book.

## Motion scale
`--dur-1` 120ms hover · `--dur-2` 220ms state · `--dur-3` 420ms panels · `--dur-4` 700ms drawer and mosaic entry.
Easing: `--ease-out`, `--ease-spring`, `--ease-in-out`. The script reads tokens with `tok()` / `ms()`. All motion stops under `prefers-reduced-motion`.

## Radius scale
`--r-1` 6 · `--r-2` 10 · `--r-3` 16 · `--r-4` 24 · `--r-pill`.

## Data
- Neon Postgres: tables `sections` and `books`. `/api/books` serves the catalogue; `public/data/books.json` is the fallback.
- Read and PDF buttons link to the original files on projectmadurai.org.
- My shelf, recently opened, view and theme are stored in the visitor's browser only.

## Checks
`npm run check` (the Vercel build command) fails the deploy if the loader, the fallback catalogue or a CSS token is broken.
