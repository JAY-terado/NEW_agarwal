import { createServer } from 'node:http';
import { mkdirSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

process.umask(0o077);
const dbPath = process.env.NEWSLETTER_DB
  ? process.env.NEWSLETTER_DB
  : resolve(process.cwd(), 'private-data/subscribers.sqlite');

if (!isAbsolute(dbPath)) {
  throw new Error('Set NEWSLETTER_DB to an absolute private SQLite file path.');
}
mkdirSync(dirname(dbPath), { recursive: true });

const initSql = `
  PRAGMA busy_timeout = 5000;
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email TEXT PRIMARY KEY NOT NULL COLLATE NOCASE,
    subscribed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    source TEXT NOT NULL DEFAULT 'website-footer'
  );
`;

let insertEmail;
let closeDb = () => { };

try {
  // Use native node:sqlite on Node 22.5+ / Node 24
  const { DatabaseSync } = await import('node:sqlite');
  const db = new DatabaseSync(dbPath);
  db.exec(initSql);
  const stmt = db.prepare('INSERT INTO newsletter_subscribers(email) VALUES (?) ON CONFLICT(email) DO NOTHING');
  insertEmail = (email) => stmt.run(email);
  closeDb = () => db.close();
} catch {
  // Fallback for Node < 22.5 using Python's built-in sqlite3 module
  const pyInit = `
import sqlite3, sys
conn = sqlite3.connect(sys.argv[1], timeout=5.0)
conn.executescript(sys.argv[2])
conn.commit()
conn.close()
`;
  execFileSync('python3', ['-c', pyInit, dbPath, initSql], { stdio: 'inherit' });

  const pyInsert = `
import sqlite3, sys
conn = sqlite3.connect(sys.argv[1], timeout=5.0)
conn.execute('INSERT INTO newsletter_subscribers(email) VALUES (?) ON CONFLICT(email) DO NOTHING', (sys.argv[2],))
conn.commit()
conn.close()
`;
  insertEmail = (email) => {
    execFileSync('python3', ['-c', pyInsert, dbPath, email]);
  };
}

const localPart = /^[a-z0-9!#$%&'*+/=?^_\x60{|}~.-]+$/i;
const domainLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

function validEmail(email) {
  const parts = email.split('@');
  if (parts.length !== 2 || email.length > 254) return false;
  const [local, domain] = parts;
  const labels = domain.split('.');
  return (
    local.length <= 64 &&
    localPart.test(local) &&
    !local.startsWith('.') &&
    !local.endsWith('.') &&
    !local.includes('..') &&
    labels.length >= 2 &&
    labels.every((label) => domainLabel.test(label))
  );
}

function reply(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(body));
}

const server = createServer({ requestTimeout: 15000, headersTimeout: 10000 }, async (req, res) => {
  if (req.url !== '/v1/newsletter/subscribe') return reply(res, 404, { error: 'Not found' });
  if (req.method !== 'POST') return reply(res, 405, { error: 'Use POST' }, { Allow: 'POST' });
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return reply(res, 415, { error: 'JSON required' });
  }
  try {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 2048) return reply(res, 413, { error: 'Body too large' });
      chunks.push(chunk);
    }
    let data;
    try {
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return reply(res, 400, { error: 'Invalid JSON' });
    }
    const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
    if (!validEmail(email)) return reply(res, 422, { error: 'Invalid email' });
    insertEmail(email);
    return reply(res, 200, { subscribed: true });
  } catch {
    console.error('Newsletter request could not be completed.');
    if (!res.headersSent && !res.destroyed) reply(res, 503, { error: 'Temporarily unavailable' });
  }
});

server.listen(Number(process.env.NEWSLETTER_PORT || 3107), '127.0.0.1', () => {
  console.log('Newsletter API listening on port', server.address().port);
});

for (const sig of ['SIGTERM', 'SIGINT']) {
  process.once(sig, () => server.close(() => closeDb()));
}
