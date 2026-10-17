// Pre-build check: fails the deploy if the page or the fallback catalogue is broken.
import { readFileSync } from 'node:fs';

const fail = (m) => { console.error('✗ ' + m); process.exit(1); };
const html = readFileSync('public/index.html', 'utf8');
const data = JSON.parse(readFileSync('public/data/books.json', 'utf8'));

if (!html.includes('window.__boot=function')) fail('index.html: boot function missing');
if (!html.includes("fetch('/api/books')")) fail('index.html: catalogue loader missing');
if (html.includes('/*DATA*/')) fail('index.html: unresolved data placeholder');
if (!Array.isArray(data.books) || data.books.length < 1000) fail('books.json: catalogue looks incomplete');
for (const [i, b] of data.books.entries()) {
  if (b.length !== 7 || typeof b[1] !== 'string' || !b[1]) fail(`books.json: row ${i} is malformed`);
}
// every CSS custom property the page uses must be defined
const used = new Set([...html.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1])); // vars with a fallback are allowed
const defined = new Set([...html.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
const missing = [...used].filter(v => !defined.has(v));
if (missing.length) fail('undefined CSS tokens: ' + missing.join(', '));
// Palayakkarar Resistance section: page plus both story files, every item in both languages
{
  const r = readFileSync('public/resistance/index.html', 'utf8');
  const ctx = { window: {} };
  for (const l of ['en', 'ta']) new Function('window', readFileSync(`public/resistance/stories-${l}.js`, 'utf8'))(ctx.window);
  const S = ctx.window.STORIES || {};
  const ids = [...r.matchAll(/id:"(e\w+)"/g)].map(m => m[1]);
  if (ids.length < 20) fail('resistance: timeline events missing');
  for (const id of ids) for (const l of ['en', 'ta']) if (!S[l] || !S[l][id]) fail(`resistance: no ${l} story for ${id}`);
  const usedR = new Set([...r.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1]));
  const defR = new Set([...r.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
  const missR = [...usedR].filter(v => !defR.has(v));
  if (missR.length) fail('resistance: undefined CSS tokens: ' + missR.join(', '));
  console.log(`✓ resistance ok · ${ids.length} events, ${Object.keys(S.en).length} stories in each language`);
}
console.log(`✓ page ok · ${data.books.length} books in fallback catalogue`);
