# Suvadi · சுவடி · தமிழ் நூலகம்

A modern, bilingual (Tamil + English) library of all 1,281 Project Madurai books, with search, section and letter filters, cards, covers and list views, and a page for every book with Read online (Unicode) and PDF links.

- **Site:** static page in `public/` (no framework)
- **API:** `api/books.js`, `api/sections.js` (Vercel functions, reading Neon Postgres)
- **Database:** Neon project `suvadi`, tables `sections`, `books`
- **Env:** `DATABASE_URL` (set in Vercel)

All texts belong to [Project Madurai](https://www.projectmadurai.org/). Every Read/PDF button opens their original files.
