// GET /api/books — the full catalogue from Neon, in the compact row format the page uses:
// [pm_no, title, author, genre, section, pdf_ids[], unicode_ids[]]
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    res.status(500).json({ error: 'DATABASE_URL is not set' });
    return;
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT pm_no, title, author, genre, section, pdf_ids, unicode_ids
      FROM books ORDER BY id`;
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({
      count: rows.length,
      books: rows.map(r => [r.pm_no, r.title, r.author, r.genre, r.section, r.pdf_ids, r.unicode_ids]),
    });
  } catch (err) {
    console.error('books query failed', err);
    res.status(502).json({ error: 'catalogue unavailable' });
  }
}
