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
The hero pairs a pride statement (தமிழைப் படி, தலை நிமிர் · Read Tamil, stand tall) with a rotating card of famous lines from the classics, each linking to its book.

## Layout
Header → hero (headline, search, rotating classics card) → counters (2,000+ years, books, authors, sections) → Did you know? fact cards with count-up numbers → Shelves (Start here, Sangam, Bhakti, Epics, Ethics, Modern) → My reading (Kural of the day, book of the day, reading journey, recently opened, collection, titles by first letter) → Library → quick-view drawer.

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
