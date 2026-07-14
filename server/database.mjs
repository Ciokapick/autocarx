import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataDirectory = path.resolve(process.env.DATA_DIR || path.join(root, "data"));
mkdirSync(dataDirectory, { recursive: true });

export const databasePath = path.join(dataDirectory, "autocarx.sqlite");
const db = new DatabaseSync(databasePath);
db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    service TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'contact',
    status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','quoted','booked','closed')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const decodeLead = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  service: row.service,
  message: row.message,
  source: row.source,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export function createLead(input) {
  const id = `ACX-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
  db.prepare(`INSERT INTO leads (id, name, email, phone, service, message, source)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(id, input.name, input.email, input.phone || "", input.service || "", input.message, input.source || "contact");
  return getLead(id);
}

export function getLead(id) {
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id);
  return row ? decodeLead(row) : null;
}

export function listLeads() {
  return db.prepare("SELECT * FROM leads ORDER BY datetime(created_at) DESC").all().map(decodeLead);
}

export function updateLeadStatus(id, status) {
  const result = db.prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, id);
  return result.changes ? getLead(id) : null;
}

