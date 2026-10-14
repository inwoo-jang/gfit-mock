#!/usr/bin/env node
/* Pre-generates ElevenLabs audio for every built-in script line, so the app plays it without an API key.
   Requires the server running with ELEVENLABS_API_KEY.
   Usage: node prebuild-tts.js          → data.js lines into tts-cache/ (shared, committed)
          node prebuild-tts.js --local  → data.js + data.local.js lines into tts-cache-local/ (personal, git-ignored)
   PORT env overrides 5173. Lines that already have audio are skipped. */
"use strict";
const fs = require("fs"), vm = require("vm"), path = require("path");
const PORT = Number(process.env.PORT) || 5173;
const LOCAL = process.argv.includes("--local");
const localFile = path.join(__dirname, "data.local.js");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "data.js"), "utf8") +
  (LOCAL && fs.existsSync(localFile) ? "\n" + fs.readFileSync(localFile, "utf8") : "") +
  "\n;this.D = { TASKS, TEMPLATES, PATTERNS, DIALOGUE, INTRO_TRACKS, MEETING100 };", ctx);
const { TASKS, TEMPLATES, PATTERNS, DIALOGUE, INTRO_TRACKS, MEETING100 } = ctx.D;
const OPENER = (fs.readFileSync(path.join(__dirname, "app.js"), "utf8").match(/const OPENER = "([^"]+)"/) || [])[1];

// Same sources the app passes to block() / say().
const lines = l => (l || []).map(x => x[0]);
const texts = [
  OPENER,
  ...TASKS.flatMap(t => [...lines(t.scenario), ...lines(t.output), ...(t.qs || []).flatMap(q => [q.q, ...lines(q.a)])]),
  ...TEMPLATES.flatMap(c => lines(c.items)),
  ...PATTERNS.flatMap(p => lines(p.ex)),
  ...lines(DIALOGUE),
  ...INTRO_TRACKS.flatMap(tr => [...lines(tr.intro), ...lines(tr.why)]),
  ...MEETING100.flatMap(c => lines(c.items))
].filter(Boolean).map(s => s.trim());
const uniq = [...new Set(texts)];
console.log(`${uniq.length} lines, ${uniq.reduce((a, s) => a + s.length, 0)} chars`);

let done = 0, failed = 0, i = 0;
async function worker() {
  while (i < uniq.length) {
    const text = uniq[i++];
    for (let attempt = 1; ; attempt++) {
      const r = await fetch(`http://localhost:${PORT}/api/tts`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text, store: LOCAL ? "local" : "shared" }) });
      if (r.ok) { await r.arrayBuffer(); done++; break; }
      const msg = await r.text();
      if (attempt >= 4) { failed++; console.error(`FAIL: ${text.slice(0, 60)} → ${msg.slice(0, 200)}`); break; }
      await new Promise(res => setTimeout(res, 2000 * attempt));
    }
    if ((done + failed) % 25 === 0) console.log(`${done + failed}/${uniq.length}`);
  }
}
Promise.all(Array.from({ length: 3 }, worker)).then(() => console.log(`done ${done}, failed ${failed}`));
