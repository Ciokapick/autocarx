import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer as createNetServer } from "node:net";
import { once } from "node:events";
import os from "node:os";
import path from "node:path";

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const availablePort = async () => {
  const socket = createNetServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const address = socket.address();
  const port = typeof address === "object" && address ? address.port : 0;
  socket.close();
  await once(socket, "close");
  return port;
};

const startServer = async (overrides = {}) => {
  const port = await availablePort();
  const dataDirectory = await mkdtemp(path.join(os.tmpdir(), "autocarx-test-"));
  const env = {
    ...process.env,
    NODE_ENV: "production",
    PORT: String(port),
    DATA_DIR: dataDirectory,
    ...overrides,
  };
  delete env.TRUST_PROXY;
  if (!("ADMIN_EMAIL" in overrides)) delete env.ADMIN_EMAIL;
  if (!("ADMIN_PASSWORD" in overrides)) delete env.ADMIN_PASSWORD;

  const child = spawn(process.execPath, ["server/index.mjs"], {
    cwd: process.cwd(),
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stdout.on("data", (chunk) => { logs += chunk; });
  child.stderr.on("data", (chunk) => { logs += chunk; });

  const baseUrl = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) break;
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) {
        return {
          baseUrl,
          async stop() {
            if (child.exitCode === null) {
              child.kill("SIGTERM");
              await Promise.race([once(child, "exit"), delay(1_000)]);
            }
            await rm(dataDirectory, { recursive: true, force: true });
          },
        };
      }
    } catch {
      // The process may still be starting.
    }
    await delay(50);
  }

  if (child.exitCode === null) child.kill("SIGTERM");
  await rm(dataDirectory, { recursive: true, force: true });
  throw new Error(`Server did not start.\n${logs}`);
};

const postJson = (url, payload, headers = {}) => fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: JSON.stringify(payload),
});

test("production admin login fails closed without configured credentials", async (t) => {
  const server = await startServer();
  t.after(() => server.stop());

  const response = await postJson(`${server.baseUrl}/api/admin/login`, {
    email: "workshop@autocarx.local",
    password: "autocarx-demo-2026",
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "Admin access is not configured." });
});

test("login and lead rate limits are separate, and lead input is validated", async (t) => {
  const server = await startServer({ ADMIN_EMAIL: "owner@example.test", ADMIN_PASSWORD: "strong-test-password" });
  t.after(() => server.stop());

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await postJson(`${server.baseUrl}/api/admin/login`, {
      email: "owner@example.test",
      password: "wrong-password",
    });
    assert.equal(response.status, 401);
  }

  const blockedLogin = await postJson(`${server.baseUrl}/api/admin/login`, {
    email: "owner@example.test",
    password: "wrong-password",
  });
  assert.equal(blockedLogin.status, 429);

  const invalidLead = await postJson(`${server.baseUrl}/api/leads`, {
    name: "A",
    email: "not-an-email",
    message: "short",
  });
  assert.equal(invalidLead.status, 422);

  const validLead = await postJson(`${server.baseUrl}/api/leads`, {
    name: "Ana Test",
    email: "ana@example.test",
    phone: "+40 700 000 000",
    service: "diagnostics",
    message: "I need help diagnosing an intermittent warning light.",
    source: "contact",
  });
  assert.equal(validLead.status, 201);
  assert.match((await validLead.json()).id, /^ACX-/);
});

test("admin sessions expire on the server", async (t) => {
  const server = await startServer({
    ADMIN_EMAIL: "owner@example.test",
    ADMIN_PASSWORD: "strong-test-password",
    SESSION_TTL_MS: "80",
  });
  t.after(() => server.stop());

  const login = await postJson(`${server.baseUrl}/api/admin/login`, {
    email: "owner@example.test",
    password: "strong-test-password",
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);

  const activeSession = await fetch(`${server.baseUrl}/api/admin/session`, { headers: { Cookie: cookie } });
  assert.equal(activeSession.status, 200);

  await delay(130);
  const expiredSession = await fetch(`${server.baseUrl}/api/admin/session`, { headers: { Cookie: cookie } });
  assert.equal(expiredSession.status, 401);
});
