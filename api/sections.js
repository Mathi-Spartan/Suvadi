// GET /api/sections — the 14 sections with their book counts.
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT s.key, s.name_ta, s.name_en, count(b.id)::int AS books
      FROM sections s LEFT JOIN books b ON b.section = s.key
      GROUP BY s.key, s.name_ta, s.name_en, s.position ORDER BY s.position`;
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ sections: rows });
  } catch (err) {
    console.error('sections query failed', err);
    res.status(502).json({ error: 'sections unavailable' });
  }
}
