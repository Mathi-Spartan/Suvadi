# Suvadi · design notes

Every Project Madurai book on its own palm-leaf (ஓலைச்சுவடி) cover, in a light editorial page.

## Colour meanings
| Token | Meaning |
|---|---|
| `--paper`, `--card` | page and surfaces |
| `--ink`, `--ink-2`, `--ink-3` | text, secondary text, labels |
| `--blue` | the one interface accent: primary action (Read online), focus ring, active filter |
| `--orange` | PDF downloads, and the "kept" ribbon |
| `--yellow` | active-filter chips, highlight stats |
| Section colours (`SPAL` in the script) | book covers only, one colour per section, like a publisher's series. Never used for interface chrome. |

## Type roles
- **Anek Tamil**: headings and UI Tamil
- **Noto Serif Tamil**: book titles on covers and palm leaves, cover initials
- **Bricolage Grotesque**: English UI
- **Instrument Serif (italic)**: English sub-labels next to Tamil
- **JetBrains Mono**: numbers, release Nº, small labels

Fluid sizes use `--step-*` tokens (utopia-style clamps).

## Motion scale
Easing: `--ease-out`, `--ease-spring`, `--ease-in-out`.
Durations: `--dur-1` 120ms (hover feedback), `--dur-2` 240ms (state changes), `--dur-3` 450ms (panels, chips), `--dur-4` 720ms (page transitions, cover flip).
The script reads these tokens with `tok()` / `ms()`. Never hard-code a bezier or a millisecond value. Everything turns off under `prefers-reduced-motion`.

## Radius scale
`--r-1` 4 · `--r-2` 8 · `--r-3` 14 · `--r-4` 22 · `--r-pill`.

## Data
- Neon Postgres: tables `sections` and `books` (pm_no, title, author, genre, section, pdf_ids[], unicode_ids[]).
- `/api/books` serves the catalogue; `public/data/books.json` is the offline fallback copy.
- Read and PDF buttons link to the original files on projectmadurai.org. No texts are copied.

## Checks
`npm run check` (also the Vercel build command) fails the deploy if the page loader, the fallback catalogue or any CSS token is broken.
