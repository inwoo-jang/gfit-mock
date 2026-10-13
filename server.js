#!/usr/bin/env node
/* G-Fit mock — local server.
   Serves this folder at http://localhost:5173 and relays POST /api/ask to one AI provider:
   - claude    → Claude Code CLI (`claude -p`), using your Claude Code login
   - codex     → Codex CLI (`codex exec`), using your Codex/ChatGPT login
   - anthropic → Anthropic Messages API (ANTHROPIC_API_KEY)
   - openai    → OpenAI Chat Completions API (OPENAI_API_KEY)
   Pick with AI_PROVIDER=…; otherwise the first available in the order above is used.
   Response: NDJSON lines  {"t":"text delta"} … {"done":true}  or  {"error":"message"} */
"use strict";
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawn, spawnSync } = require("child_process");

const PORT = Number(process.env.PORT) || 5173;
const HOST = "127.0.0.1";
const ROOT = __dirname;
const CLAUDE_BIN = process.env.CLAUDE_BIN || "claude";
const CODEX_BIN = process.env.CODEX_BIN || "codex";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5";
const CODEX_MODEL = process.env.CODEX_MODEL || ""; // empty = Codex default
const MODELS = {
  quick:   { cli: "sonnet", api: "claude-sonnet-5-5" },
  default: { cli: "sonnet", api: "claude-sonnet-5-5" },
  complex: { cli: "sonnet", api: "claude-sonnet-5-5" }
};
const EL_KEY = process.env.ELEVENLABS_API_KEY || "";
const EL_VOICE = process.env.ELEVENLABS_VOICE_ID || "yj30vwTGJxSHezdAGsv9";
const EL_MODEL = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
// tts-cache: shared audio committed to git · tts-cache-local: personal/on-demand audio (git-ignored)
const TTS_DIRS = { shared: path.join(ROOT, "tts-cache"), local: path.join(ROOT, "tts-cache-local") };
const SYSTEM = "You are an assistant embedded in a local business-English practice web app. Follow the instructions in the conversation and reply only with your answer text.";
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

const has = bin => spawnSync(bin, ["--version"], { encoding: "utf8" }).status === 0;
const AVAILABLE = {
  claude: () => has(CLAUDE_BIN),
  codex: () => has(CODEX_BIN),
  anthropic: () => !!API_KEY,
  openai: () => !!OPENAI_KEY
};
const LABELS = { claude: "Claude Code 로그인", codex: "Codex 로그인", anthropic: "Anthropic API", openai: "OpenAI API", none: "연결 없음" };
const WANT = (process.env.AI_PROVIDER || "").toLowerCase();
if (WANT && !AVAILABLE[WANT]) console.warn(`AI_PROVIDER=${WANT} 은(는) 지원하지 않습니다. (claude | codex | anthropic | openai)`);
const MODE = AVAILABLE[WANT] ? (AVAILABLE[WANT]() ? WANT : "none") : (Object.keys(AVAILABLE).find(k => AVAILABLE[k]()) || "none");

function sendJSON(res, code, obj) { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(obj)); }
function originOk(req) {
  const o = req.headers.origin;
  return !o || o === `http://localhost:${PORT}` || o === `http://127.0.0.1:${PORT}`;
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", c => { size += c.length; if (size > 1_000_000) { reject(new Error("요청이 너무 큽니다.")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/* ---- Claude Code CLI ---- */
function flatten(messages) {
  if (messages.length === 1) return messages[0].content;
  return "Continue this conversation as the ASSISTANT. Reply with the assistant's next message only.\n\n" +
    messages.map(m => `[${m.role.toUpperCase()}]\n${m.content}`).join("\n\n");
}
function askCLI(messages, tier, emit, done, onAbort) {
  const args = ["-p", "--output-format", "stream-json", "--verbose", "--include-partial-messages",
    "--model", (MODELS[tier] || MODELS.default).cli, "--tools", "", "--no-session-persistence",
    "--setting-sources", "", "--strict-mcp-config", "--system-prompt", SYSTEM];
  const child = spawn(CLAUDE_BIN, args, { cwd: os.tmpdir(), env: process.env });
  let buf = "", sent = false, err = "", finished = false;
  const finish = e => { if (finished) return; finished = true; done(e); };
  child.stdout.on("data", d => {
    buf += d.toString("utf8"); let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1);
      if (!line.trim()) continue;
      let ev; try { ev = JSON.parse(line); } catch (e) { continue; }
      if (ev.type === "stream_event" && ev.event && ev.event.type === "content_block_delta" && ev.event.delta && ev.event.delta.type === "text_delta") {
        sent = true; emit(ev.event.delta.text);
      } else if (ev.type === "result") {
        if (ev.is_error) finish(ev.result || "Claude Code 오류");
        else { if (!sent && ev.result) emit(ev.result); finish(null); }
      }
    }
  });
  child.stderr.on("data", d => { err += d.toString("utf8"); });
  child.on("error", e => finish("claude 실행 실패: " + e.message));
  child.on("close", code => finish(code === 0 ? null : (err.trim().split("\n").pop() || `claude 종료 코드 ${code}`)));
  child.stdin.end(flatten(messages));
  onAbort(() => { if (!finished) { finished = true; child.kill("SIGTERM"); } });
}

/* ---- Codex CLI (no token streaming: the final message is sent at once) ---- */
function askCodex(messages, tier, emit, done, onAbort) {
  const out = path.join(os.tmpdir(), `gfit-codex-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`);
  const args = ["exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "--color", "never", "-o", out];
  if (CODEX_MODEL) args.push("-m", CODEX_MODEL);
  args.push("-");
  const child = spawn(CODEX_BIN, args, { cwd: os.tmpdir(), env: process.env });
  let err = "", finished = false;
  const finish = e => { if (finished) return; finished = true; fs.rm(out, { force: true }, () => {}); done(e); };
  child.stdout.on("data", () => {});
  child.stderr.on("data", d => { err += d.toString("utf8"); if (err.length > 20000) err = err.slice(-10000); });
  child.on("error", e => finish("codex 실행 실패: " + e.message));
  child.on("close", code => {
    let text = ""; try { text = fs.readFileSync(out, "utf8").trim(); } catch (e) {}
    if (code === 0 && text) { emit(text); finish(null); }
    else finish(err.trim().split("\n").pop() || `codex 종료 코드 ${code}`);
  });
  child.stdin.end(`${SYSTEM} Do not run commands or edit files.\n\n${flatten(messages)}`);
  onAbort(() => { if (!finished) { finished = true; child.kill("SIGTERM"); fs.rm(out, { force: true }, () => {}); } });
}

/* ---- OpenAI API ---- */
async function askOpenAI(messages, tier, emit, done, onAbort) {
  const ctl = new AbortController(); onAbort(() => ctl.abort());
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", signal: ctl.signal,
      headers: { "content-type": "application/json", authorization: `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ model: OPENAI_MODEL, stream: true, messages: [{ role: "system", content: SYSTEM }, ...messages] })
    });
    if (!r.ok) { done(`OpenAI 오류 ${r.status}: ${(await r.text()).slice(0, 300)}`); return; }
    const reader = r.body.getReader(), dec = new TextDecoder(); let buf = "";
    for (;;) {
      const { done: end, value } = await reader.read(); if (end) break;
      buf += dec.decode(value, { stream: true }); let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith("data:") || line === "data: [DONE]") continue;
        let ev; try { ev = JSON.parse(line.slice(5)); } catch (e) { continue; }
        if (ev.error) { done(ev.error.message || "OpenAI 오류"); return; }
        const t = ev.choices && ev.choices[0] && ev.choices[0].delta && ev.choices[0].delta.content;
        if (t) emit(t);
      }
    }
    done(null);
  } catch (e) { done(e.name === "AbortError" ? null : "OpenAI 연결 실패: " + e.message); }
}

/* ---- Anthropic API ---- */
async function askAPI(messages, tier, emit, done, onAbort) {
  const ctl = new AbortController(); onAbort(() => ctl.abort());
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", signal: ctl.signal,
      headers: { "content-type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: (MODELS[tier] || MODELS.default).api, max_tokens: 2048, system: SYSTEM, stream: true, messages })
    });
    if (!r.ok) { done(`API 오류 ${r.status}: ${(await r.text()).slice(0, 300)}`); return; }
    const reader = r.body.getReader(), dec = new TextDecoder(); let buf = "";
    for (;;) {
      const { done: end, value } = await reader.read(); if (end) break;
      buf += dec.decode(value, { stream: true }); let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith("data:")) continue;
        let ev; try { ev = JSON.parse(line.slice(5)); } catch (e) { continue; }
        if (ev.type === "content_block_delta" && ev.delta && ev.delta.type === "text_delta") emit(ev.delta.text);
        else if (ev.type === "error") { done(ev.error && ev.error.message || "API 오류"); return; }
      }
    }
    done(null);
  } catch (e) { done(e.name === "AbortError" ? null : "API 연결 실패: " + e.message); }
}

/* ---- ElevenLabs TTS (cached on disk: each sentence is billed once) ---- */
const ttsPending = new Map();
function ttsFile(text, store) {
  const name = crypto.createHash("sha1").update(`${EL_VOICE}|${EL_MODEL}|${text}`).digest("hex") + ".mp3";
  for (const dir of Object.values(TTS_DIRS)) { const f = path.join(dir, name); if (fs.existsSync(f)) return Promise.resolve(f); }
  if (!EL_KEY) return Promise.reject(Object.assign(new Error("저장된 음성이 없고 ELEVENLABS_API_KEY도 없습니다."), { status: 404 }));
  const dir = TTS_DIRS[store] || TTS_DIRS.local, file = path.join(dir, name);
  if (ttsPending.has(name)) return ttsPending.get(name);
  const p = (async () => {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${EL_VOICE}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "content-type": "application/json", "xi-api-key": EL_KEY, accept: "audio/mpeg" },
      body: JSON.stringify({ text, model_id: EL_MODEL })
    });
    if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    return file;
  })().finally(() => ttsPending.delete(name));
  ttsPending.set(name, p);
  return p;
}

/* ---- HTTP ---- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/api/health") return sendJSON(res, 200, { ok: MODE !== "none", mode: MODE, label: LABELS[MODE], tts: !!EL_KEY || Object.values(TTS_DIRS).some(d => fs.existsSync(d)) });

  if (url.pathname === "/api/tts") {
    if (req.method !== "POST") return sendJSON(res, 405, { error: "POST only" });
    if (!originOk(req)) return sendJSON(res, 403, { error: "forbidden origin" });
    let text, store;
    try { const b = JSON.parse(await readBody(req)); text = String(b.text || "").trim(); store = b.store; } catch (e) { return sendJSON(res, 400, { error: "잘못된 요청" }); }
    if (!text || text.length > 1500) return sendJSON(res, 400, { error: "text must be 1–1500 chars" });
    try {
      const data = fs.readFileSync(await ttsFile(text, store));
      res.writeHead(200, { "Content-Type": "audio/mpeg", "Content-Length": data.length, "Cache-Control": "no-store" });
      return res.end(data);
    } catch (e) { if (!e.status) console.error(e.message); return sendJSON(res, e.status || 502, { error: e.message }); }
  }

  if (url.pathname === "/api/ask") {
    if (req.method !== "POST") return sendJSON(res, 405, { error: "POST only" });
    if (!originOk(req)) return sendJSON(res, 403, { error: "forbidden origin" });
    if (MODE === "none") return sendJSON(res, 503, { error: "AI에 연결할 수 없습니다. Claude Code/Codex에 로그인하거나 ANTHROPIC_API_KEY/OPENAI_API_KEY를 설정하세요." });
    let body;
    try { body = JSON.parse(await readBody(req)); } catch (e) { return sendJSON(res, 400, { error: "잘못된 요청" }); }
    const messages = Array.isArray(body.messages) ? body.messages.filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string") : [];
    if (!messages.length || messages[messages.length - 1].role !== "user") return sendJSON(res, 400, { error: "messages must end with a user turn" });
    res.writeHead(200, { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache" });
    let aborter = null, closed = false;
    res.on("close", () => { closed = true; if (aborter) aborter(); });
    const emit = t => { if (!closed) res.write(JSON.stringify({ t }) + "\n"); };
    const done = e => { if (closed) return; res.end(JSON.stringify(e ? { error: String(e) } : { done: true }) + "\n"); };
    const onAbort = fn => { aborter = fn; };
    ({ claude: askCLI, codex: askCodex, anthropic: askAPI, openai: askOpenAI })[MODE](messages, body.tier, emit, done, onAbort);
    return;
  }

  // static files
  let rel = decodeURIComponent(url.pathname); if (rel === "/") rel = "/index.html";
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err && rel === "/data.local.js") { res.writeHead(200, { "Content-Type": MIME[".js"] }); return res.end("/* no personal overrides */"); }
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  const how = MODE === "none" ? "연결 없음 — Claude Code/Codex 로그인 또는 ANTHROPIC_API_KEY/OPENAI_API_KEY 필요"
    : `${LABELS[MODE]}${MODE === "openai" ? ` (${OPENAI_MODEL})` : MODE === "codex" && CODEX_MODEL ? ` (${CODEX_MODEL})` : ""}  · 바꾸려면 AI_PROVIDER=claude|codex|anthropic|openai`;
  console.log(`\n  G-Fit 모의고사 →  http://localhost:${PORT}\n  AI 연결: ${how}\n  음성: ${EL_KEY ? `ElevenLabs (${EL_VOICE}, ${EL_MODEL})` : "저장된 음성(tts-cache)만 · 없는 문장은 브라우저 TTS (ELEVENLABS_API_KEY 없음)"}\n  종료: Ctrl+C\n`);
});
server.on("error", e => {
  if (e.code === "EADDRINUSE") console.error(`포트 ${PORT}이(가) 사용 중입니다. 이미 실행 중이면 http://localhost:${PORT} 로 접속하거나, PORT=5174 node server.js 로 실행하세요.`);
  else console.error(e);
  process.exit(1);
});
