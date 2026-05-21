import { createClient, type Client } from "@libsql/client";

declare global {
  var __bmDbClient: Client | undefined;
  var __bmDbReady: Promise<void> | undefined;
}

const databaseUrl = process.env.DATABASE_URL ?? "file:./data/bmgroup.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

function getClient(): Client {
  if (!globalThis.__bmDbClient) {
    globalThis.__bmDbClient = createClient({
      url: databaseUrl,
      ...(authToken ? { authToken } : {}),
    });
  }
  return globalThis.__bmDbClient;
}

async function ensureSchema(): Promise<void> {
  const client = getClient();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'website',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  await client.execute(
    "CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);",
  );
  await client.execute(
    "CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);",
  );
}

export async function db(): Promise<Client> {
  if (!globalThis.__bmDbReady) {
    globalThis.__bmDbReady = ensureSchema();
  }
  await globalThis.__bmDbReady;
  return getClient();
}

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  source: string;
  status: LeadStatus;
  created_at: string;
};

export async function insertLead(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  source?: string;
}): Promise<number> {
  const client = await db();
  const result = await client.execute({
    sql: `INSERT INTO leads (name, email, phone, company, subject, message, source)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.name,
      input.email,
      input.phone ?? null,
      input.company ?? null,
      input.subject ?? null,
      input.message,
      input.source ?? "website",
    ],
  });
  return Number(result.lastInsertRowid ?? 0);
}

export async function listLeads(): Promise<Lead[]> {
  const client = await db();
  const result = await client.execute(
    "SELECT id, name, email, phone, company, subject, message, source, status, created_at FROM leads ORDER BY created_at DESC, id DESC",
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone === null ? null : String(row.phone),
    company: row.company === null ? null : String(row.company),
    subject: row.subject === null ? null : String(row.subject),
    message: String(row.message),
    source: String(row.source),
    status: String(row.status) as LeadStatus,
    created_at: String(row.created_at),
  }));
}

export async function updateLeadStatus(
  id: number,
  status: LeadStatus,
): Promise<boolean> {
  const client = await db();
  const result = await client.execute({
    sql: "UPDATE leads SET status = ? WHERE id = ?",
    args: [status, id],
  });
  return result.rowsAffected > 0;
}
