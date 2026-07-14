import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { createLead, databasePath, listLeads, updateLeadStatus } from "./database.mjs";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 3002);
const sessions = new Map();
const leadAttempts = new Map();
const loginAttempts = new Map();
const leadStatuses = new Set(["new", "contacted", "quoted", "booked", "closed"]);
const sessionLifetime = Math.max(50, Number(process.env.SESSION_TTL_MS) || 8 * 60 * 60 * 1000);

const json = (res, status, payload, headers = {}) => {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers });
  res.end(JSON.stringify(payload));
};

const readJson = async (req) => {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 250_000) throw new Error("Request is too large.");
  }
  return JSON.parse(raw || "{}");
};

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

const sessionId = (req) => req.headers.cookie?.split(";").map((part) => part.trim()).find((part) => part.startsWith("acx_session="))?.split("=")[1];
const isAdmin = (req) => {
  const token = sessionId(req);
  const expiresAt = token ? sessions.get(token) : null;
  if (!token || !expiresAt || expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return false;
  }
  return true;
};
const clientIp = (req) => {
  const address = process.env.TRUST_PROXY === "true" ? req.headers["x-forwarded-for"] : req.socket.remoteAddress;
  return String(address || "unknown").split(",")[0].trim();
};

const rateLimited = (attempts, key, maximum, windowMs) => {
  const now = Date.now();
  if (!attempts.has(key) && attempts.size >= 10_000) {
    for (const [storedKey, times] of attempts) {
      if (times.every((time) => now - time >= windowMs)) attempts.delete(storedKey);
    }
    if (attempts.size >= 10_000) return true;
  }
  const recent = (attempts.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= maximum) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
};

const leadRateLimited = (req) => rateLimited(leadAttempts, clientIp(req), 5, 60_000);
const loginRateLimited = (req) => rateLimited(loginAttempts, clientIp(req), 5, 10 * 60_000);

const validateLead = (body) => {
  const lead = {
    name: String(body.name || "").trim().slice(0, 100),
    email: String(body.email || "").trim().toLowerCase().slice(0, 180),
    phone: String(body.phone || "").trim().slice(0, 50),
    service: String(body.service || "").trim().slice(0, 120),
    message: String(body.message || "").trim().slice(0, 4000),
    source: String(body.source || "contact").trim().slice(0, 50),
  };
  if (body.website) throw new Error("Invalid request.");
  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email) || lead.message.length < 10) {
    throw new Error("Name, valid email and a project description are required.");
  }
  return lead;
};

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") return json(res, 200, { status: "ok", database: path.basename(databasePath) });
  if (req.method === "POST" && url.pathname === "/api/leads") {
    if (leadRateLimited(req)) return json(res, 429, { error: "Too many requests. Please try again shortly." });
    const lead = createLead(validateLead(await readJson(req)));
    return json(res, 201, { id: lead.id, createdAt: lead.createdAt });
  }
  if (req.method === "POST" && url.pathname === "/api/admin/login") {
    if (process.env.NODE_ENV === "production" && (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD)) {
      return json(res, 503, { error: "Admin access is not configured." });
    }
    if (loginRateLimited(req)) return json(res, 429, { error: "Too many login attempts. Please try again later." });
    const body = await readJson(req);
    const email = process.env.ADMIN_EMAIL || "workshop@autocarx.local";
    const password = process.env.ADMIN_PASSWORD || "autocarx-demo-2026";
    if (!safeEqual(body.email, email) || !safeEqual(body.password, password)) return json(res, 401, { error: "Invalid credentials." });
    loginAttempts.delete(clientIp(req));
    const token = randomBytes(32).toString("hex");
    sessions.set(token, Date.now() + sessionLifetime);
    return json(res, 200, { authenticated: true }, { "Set-Cookie": `acx_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${Math.ceil(sessionLifetime / 1000)}${process.env.NODE_ENV === "production" ? "; Secure" : ""}` });
  }
  if (req.method === "GET" && url.pathname === "/api/admin/session") return json(res, isAdmin(req) ? 200 : 401, { authenticated: isAdmin(req) });
  if (req.method === "POST" && url.pathname === "/api/admin/logout") {
    sessions.delete(sessionId(req));
    return json(res, 200, { authenticated: false }, { "Set-Cookie": "acx_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });
  }
  if (url.pathname.startsWith("/api/admin/") && !isAdmin(req)) return json(res, 401, { error: "Authentication required." });
  if (req.method === "GET" && url.pathname === "/api/admin/leads") return json(res, 200, listLeads());
  if (req.method === "PATCH" && /^\/api\/admin\/leads\/[^/]+$/.test(url.pathname)) {
    const body = await readJson(req);
    if (!leadStatuses.has(body.status)) return json(res, 400, { error: "Invalid status." });
    const lead = updateLeadStatus(decodeURIComponent(url.pathname.split("/").pop()), body.status);
    return lead ? json(res, 200, lead) : json(res, 404, { error: "Lead not found." });
  }
  return json(res, 404, { error: "API route not found." });
}

const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4", ".ico": "image/x-icon" };

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    const requested = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
    let file = path.resolve(dist, requested);
    if (!file.startsWith(dist)) return json(res, 403, { error: "Forbidden." });
    try { if (!(await stat(file)).isFile()) file = path.join(dist, "index.html"); } catch { file = path.join(dist, "index.html"); }
    res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" });
    res.end(await readFile(file));
  } catch (error) {
    console.error(error);
    json(res, error instanceof SyntaxError ? 400 : 422, { error: error.message || "Internal error." });
  }
});

setInterval(() => {
  const now = Date.now();
  for (const [token, expiresAt] of sessions) {
    if (expiresAt <= now) sessions.delete(token);
  }
}, 60_000).unref();

server.listen(port, () => console.log(`AutoCar X: http://localhost:${port} | SQLite: ${databasePath}`));
