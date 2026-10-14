/* G-Fit mock exam — app logic (vanilla JS). Needs data.js (TASKS, TEMPLATES, PATTERNS, DIALOGUE). */
(function () {
"use strict";

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const fmt2 = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const wait = ms => new Promise(r => setTimeout(r, ms));
const ls = {
  get(k, d) { try { const v = localStorage.getItem("gfitmock." + k); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("gfitmock." + k, v); } catch (e) { /* storage unavailable */ } }
};
const words = t => (t.trim().match(/\S+/g) || []).length;
const ICON_PLAY = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor"/></svg>';

const BRIEF = {
  T1: "Your first team meeting with Clair. Introduce yourself and answer her questions about the email you just wrote.",
  T2: "Clair wants to review your vendor recommendation before it goes to the client. Defend your choice and address her concerns.",
  T3: "Mr. Weber, the client's operations director, has read your email and joined a call. He is not happy about the delay.",
  T4: "David, the strategy director, will challenge your market recommendation before the leadership review.",
  T5: "Clair is meeting you to discuss your automation proposal and the concerns raised by the team."
};
const briefOf = t => t.brief || BRIEF[t.id] || "";
const AV = { C: "linear-gradient(135deg,#3C6FD8,#7A5BD6)", W: "linear-gradient(135deg,#C2643A,#7E3426)", D: "linear-gradient(135deg,#1E8C6E,#2C5E8E)", S: "linear-gradient(135deg,#7A3FC2,#B0428E)", T: "linear-gradient(135deg,#2B7A8C,#1F4E79)", L: "linear-gradient(135deg,#B8862B,#7A4E1E)", J: "linear-gradient(135deg,#3B5BA5,#1E3A6E)", E: "linear-gradient(135deg,#A23B5B,#5E2A6E)" };
const OPENER = "Thanks for sharing your work. Could you briefly walk me through the main points of what you wrote?";

/* ---------- state ---------- */
const S = {
  ti: Math.min(TASKS.length - 1, Math.max(0, parseInt(ls.get("ti", "1"), 10) || 0)),
  mode: ls.get("mode", "real"),
  left: 0, elapsed: 0, tick: null, clockOn: false,
  chat: [], busy: null, taskSecs: 0,
  outHTML: "", outText: "", memo: "",
  qList: [], qi: -1, answers: [], phase: "idle", replay: 2, qtick: null, qLeft: 0, ans0: 0,
  aiQ: null, aiQPending: null
};

/* ---------- AI connection ----------
   1) claude.ai artifact viewer → built-in "sample" capability
   2) local server (node server.js, http://localhost) → POST /api/ask, same call shape
   3) file:// → no AI */
let sample = null, aiMode = "none", aiLabel = "";
function localSample() {
  return async function (input, opts = {}) {
    const messages = typeof input === "string" ? [{ role: "user", content: input }] : input;
    let text = "";
    let res;
    try {
      res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, signal: opts.signal,
        body: JSON.stringify({ messages, tier: opts.modelTier || "default" }) });
    } catch (e) { throw { code: e.name === "AbortError" ? "cancelled" : "local_down", message: String(e) }; }
    if (!res.ok) { let m = ""; try { m = (await res.json()).error; } catch (e) { /* not json */ } throw { code: "upstream_error", message: m || "HTTP " + res.status }; }
    const reader = res.body.getReader(), dec = new TextDecoder(); let buf = "";
    try {
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true }); let i;
        while ((i = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, i); buf = buf.slice(i + 1);
          if (!line.trim()) continue;
          const ev = JSON.parse(line);
          if (ev.t) { text += ev.t; if (opts.onText) opts.onText({ text, delta: ev.t }); }
          else if (ev.error) throw { code: "upstream_error", message: ev.error, text };
        }
      }
    } catch (e) {
      if (opts.signal && opts.signal.aborted) throw { code: "cancelled", message: "cancelled", text };
      throw e && e.code ? e : { code: "local_down", message: String(e), text };
    }
    if (!text.trim()) throw { code: "empty_completion", message: "빈 응답" };
    return { text, truncated: false };
  };
}
const samplePromise = (window.claude && typeof window.claude.use === "function")
  ? window.claude.use("sample").then(s => { sample = s; aiMode = s ? "claude.ai" : "none"; return s; }).catch(() => null)
  : /^https?:$/.test(location.protocol)
    ? fetch("/api/health").then(r => r.ok ? r.json() : null).then(j => { if (j && j.ok) { sample = localSample(); aiMode = "local-" + j.mode; aiLabel = j.label || j.mode; } return sample; }).catch(() => null)
    : Promise.resolve(null);
samplePromise.then(() => {
  const el = $("#aiStatus"); if (!el) return;
  el.textContent = aiMode === "claude.ai" ? "AI 연결됨 (claude.ai)" : aiMode !== "none" ? `AI 연결됨 (${aiLabel})` : "AI 미연결";
  el.classList.toggle("ok", aiMode !== "none"); el.classList.toggle("off", aiMode === "none");
});
function errCopy(err) {
  const code = err && err.code;
  if (code === "local_down") return "로컬 서버에 연결할 수 없습니다. 터미널에서 server.js가 실행 중인지 확인하세요.";
  if (code === "upstream_error" && err.message) return "AI 응답 실패: " + err.message;
  return ({
    not_granted: "AI 사용이 허용되지 않았습니다. 페이지를 새로고침하면 다시 허용할 수 있어요.",
    rate_limited: "요청이 많습니다. 잠시 후 다시 보내 주세요.",
    session_expired: "로그인이 만료되었습니다. claude.ai에 다시 로그인해 주세요.",
    prompt_too_large: "대화가 너무 깁니다. + New chat으로 새 대화를 시작하세요.",
    sampling_disabled: "이 계정에서는 AI 호출이 꺼져 있습니다.",
    refused: "이 요청에는 답할 수 없습니다. 질문을 바꿔 보세요."
  })[code] || "응답을 받지 못했습니다. 다시 시도해 주세요.";
}
const NO_AI = location.protocol === "file:"
  ? "AI Agent가 연결되지 않았습니다. 파일을 직접 열면(file://) AI를 쓸 수 없어요.\n\n연결 방법:\n- 폴더의 start.command 더블클릭 (또는 터미널에서 node server.js)\n- 브라우저에서 http://localhost:5173 으로 접속"
  : "AI Agent에 연결할 수 없습니다. 로컬 서버를 쓰는 경우 Claude Code·Codex 로그인 또는 ANTHROPIC_API_KEY·OPENAI_API_KEY 설정을 확인하세요.";

/* ---------- TTS ---------- */
const synth = window.speechSynthesis || null;
let voices = [], tk = 0, elOk = false, elAudio = null;
function loadVoices() {
  voices = (synth ? synth.getVoices() : []).filter(v => /^en/i.test(v.lang));
  const sel = $("#setVoice"), saved = ls.get("voice", "");
  sel.innerHTML = (elOk ? '<option value="__el">ElevenLabs (원어민)</option>' : "") + '<option value="">기본 영어</option>' + voices.map(v => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${esc(v.lang)})</option>`).join("");
  if (elOk && (!saved || saved === "__el")) { sel.value = "__el"; return; }
  let pick = saved && voices.find(v => v.voiceURI === saved);
  // Prefer neural/high-quality voices (macOS Premium/Enhanced, Edge "Natural"), then decent defaults.
  if (!pick) for (const re of [/Premium|Natural|Neural/i, /Enhanced/i, /Google US English/i, /Samantha|Aria|Jenny|Ava/i]) {
    pick = voices.find(v => re.test(v.name) && /en[-_]US/i.test(v.lang)) || voices.find(v => re.test(v.name)); if (pick) break;
  }
  if (!pick) pick = voices.find(v => v.lang === "en-US");
  if (pick) sel.value = pick.voiceURI;
}
loadVoices(); if (synth) synth.onvoiceschanged = loadVoices;
if (location.protocol.startsWith("http")) fetch("/api/health").then(r => r.ok ? r.json() : null).then(j => { if (j && j.tts) { elOk = true; loadVoices(); } }).catch(() => {});
const elUrls = new Map();
function elFetch(text) {
  if (!elUrls.has(text)) elUrls.set(text, fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) })
    .then(r => { if (!r.ok) throw new Error("tts " + r.status); return r.blob(); }).then(b => URL.createObjectURL(b))
    .catch(e => { elUrls.delete(text); throw e; }));
  return elUrls.get(text);
}
// ElevenLabs voice; resolves false on failure so the caller can fall back to browser TTS.
async function sayEL(text, my) {
  let url; try { url = await elFetch(text); } catch (e) { console.warn(e); return false; }
  if (my !== tk) return true;
  return new Promise(res => {
    const a = elAudio = new Audio(url);
    a.playbackRate = parseFloat($("#setRate").value) || 1; a.preservesPitch = true;
    let done = false; const fin = () => { if (!done) { done = true; if (elAudio === a) elAudio = null; res(true); } };
    a.onended = fin; a.onerror = fin; a.onpause = fin;
    a.play().catch(fin);
  });
}
// Loads ElevenLabs audio ahead of playback (no-op for browser TTS); never rejects.
function ttsReady(text) { return elOk && $("#setVoice").value === "__el" ? elFetch(text).then(() => {}, () => {}) : Promise.resolve(); }
async function say(text) {
  if (elOk && $("#setVoice").value === "__el" && await sayEL(text, tk)) return;
  return sayTTS(text);
}
function sayTTS(text) {
  return new Promise(res => {
    if (!synth) { setTimeout(res, Math.max(1200, text.length * 60)); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = parseFloat($("#setRate").value) || 1;
    const v = voices.find(x => x.voiceURI === $("#setVoice").value); if (v) { u.voice = v; u.lang = v.lang; }
    let done = false; const fin = () => { if (!done) { done = true; res(); } };
    u.onend = fin; u.onerror = fin;
    setTimeout(fin, 4000 + text.length * 140 / u.rate);
    synth.speak(u);
  });
}
function clearMarks() { $$(".ln.on,.ln.cue").forEach(e => e.classList.remove("on", "cue")); $$(".cuebar").forEach(e => e.remove()); }
function stopAll() { tk++; if (synth) synth.cancel(); if (elAudio) elAudio.pause(); clearMarks(); }
const REG = [], BLK = [];
function lineHTML(id, l) {
  const sp = l[2] && l[2] !== "★" ? `<span class="sp">${esc(l[2])}</span>` : "";
  const star = l[2] === "★" ? ' <span class="star" title="자주 쓰는 핵심 표현">★</span>' : "";
  return `<div class="ln" data-ln="${id}"><button class="pl" data-say="${id}" aria-label="듣기">${ICON_PLAY}</button><div style="min-width:0"><p class="en">${sp}${esc(l[0])}${star}</p>${l[1] ? `<p class="ko">${esc(l[1])}</p>` : ""}</div><button class="rp" data-rep="${id}" title="이 문장 3번 쉐도잉">×3</button></div>`;
}
function block(lines) {
  const ids = lines.map(l => REG.push(l[0]) - 1), b = BLK.push(ids) - 1;
  return `<div class="blk"><div class="bctl"><button class="btn sm" data-bplay="${b}">${ICON_PLAY.replace("<svg", '<svg style="width:10px"')} 전체 듣기</button><button class="btn sm primary" data-bshadow="${b}">쉐도잉</button><button class="btn sm" data-stop>정지</button></div>${lines.map((l, k) => lineHTML(ids[k], l)).join("")}</div>`;
}
async function playSeq(ids, mode) {
  stopAll(); const my = tk, gap = parseFloat($("#setGap").value) || 1.4;
  for (const [k, id] of ids.entries()) {
    if (my !== tk) return;
    await ttsReady(REG[id]); if (my !== tk) return;
    if (k + 1 < ids.length) ttsReady(REG[ids[k + 1]]);
    const el = $(`[data-ln="${id}"]`);
    clearMarks(); if (el) { el.classList.add("on"); if (ids.length > 1) el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    const t0 = performance.now(); await say(REG[id]); if (my !== tk) return;
    if (mode === "shadow") {
      const d = Math.max(900, (performance.now() - t0) * gap);
      if (el) {
        el.classList.remove("on"); el.classList.add("cue");
        const bar = document.createElement("div"); bar.className = "cuebar"; el.children[1].appendChild(bar);
        bar.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], { duration: d, easing: "linear", fill: "forwards" });
      }
      await wait(d + 200);
    } else await wait(300);
  }
  if (my === tk) clearMarks();
}
async function sayList(texts) { stopAll(); const my = tk; for (const t of texts) { if (my !== tk) return; await say(t); await wait(250); } }
// "English || 한국어" per line → [en, ko]; falls back to plain sentence split.
function enKoLines(text) {
  const rows = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (!rows.some(l => l.includes("||"))) return sentences(text).map(s => [s, ""]);
  return rows.map(l => { const [en, ...ko] = l.split("||"); return [en.trim(), ko.join("||").trim()]; }).filter(l => l[0]);
}
const sentences = t => (t.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || []).map(s => s.trim()).filter(Boolean);

/* ---------- views & clock ---------- */
function show(v) {
  $$(".view").forEach(s => { s.hidden = s.id !== "v-" + v; });
  $("#btnReset").textContent = v === "study" ? "← 홈으로" : "← 시험 재설정";
  $("#btnReset").hidden = $("#btnReset").nextElementSibling.hidden = v === "intro";
  $("#stTask").className = "step" + (v === "task" ? " on" : (v === "meet" || v === "result") ? " done" : "");
  $("#stMeet").className = "step" + (v === "meet" ? " on" : v === "result" ? " done" : "");
  $("#stTask i").textContent = (v === "meet" || v === "result") ? "✓" : "1";
  $("#stMeet i").textContent = v === "result" ? "✓" : "2";
  if (v !== "task" && v !== "meet") { clearInterval(S.tick); $("#timer").textContent = "--:--"; $("#timer").classList.remove("warn"); $("#timerLbl").textContent = "Time Left"; }
}
function paintClock() {
  const real = S.mode === "real";
  $("#timerLbl").textContent = real ? "Time Left" : "Elapsed";
  $("#timer").textContent = fmt2(real ? Math.max(0, S.left) : S.elapsed);
  $("#timer").classList.toggle("warn", real && S.left <= 180);
}
function startClock(total, onEnd) {
  clearInterval(S.tick); S.left = total; S.elapsed = 0; paintClock();
  S.tick = setInterval(() => {
    S.elapsed++;
    if (S.mode === "real") { S.left--; if (S.left <= 0) { clearInterval(S.tick); paintClock(); onEnd(); return; } }
    paintClock();
  }, 1000);
}

/* ---------- confirm modal ---------- */
let cfAction = null;
function confirmBox(k, title, body, yes, action) {
  $("#cfK").textContent = k; $("#cfT").textContent = title; $("#cfP").textContent = body; $("#cfYes").textContent = yes;
  cfAction = action; $("#ovConfirm").hidden = false; $("#cfYes").focus();
}
$("#cfNo").onclick = () => { $("#ovConfirm").hidden = true; cfAction = null; };
$("#cfYes").onclick = () => { $("#ovConfirm").hidden = true; const a = cfAction; cfAction = null; if (a) a(); };

/* ---------- intro ---------- */
function renderIntro() {
  $("#picker").innerHTML = TASKS.map((t, i) => `<button class="pick" data-pick="${i}" aria-pressed="${i === S.ti}">${t.id} · ${esc(t.short)}<small>${t.track ? "AX · " : ""}${esc(t.persona.name)} · ${esc(t.sub)}</small></button>`).join("");
  $$("[data-mode]").forEach(b => b.setAttribute("aria-pressed", b.dataset.mode === S.mode));
}

/* ---------- task ---------- */
const editor = $("#editor"), memo = $("#memo"), ask = $("#ask"), chatEl = $("#chat");
const T = () => TASKS[S.ti];
function defaultDraft(t) {
  return t.head.split(" · ").map(p => { const i = p.indexOf(":"); return i > 0 ? `<p><b>${esc(p.slice(0, i))}:</b>${esc(p.slice(i + 1))}</p>` : `<p><b>${esc(p)}</b></p>`; }).join("") + "<p><br></p>";
}
function tableMD(tb) { return tb ? [tb.h.join(" | "), ...tb.r.map(r => r.join(" | "))].join("\n") : "(none)"; }
function renderScenario() {
  const t = T(), n = t.scenario.length;
  $("#scn").innerHTML = `<h2>${esc(t.title)}</h2>
    <p><button class="listen" data-listen>${ICON_PLAY} Listen</button></p>
    ${t.scenario.map((s, i) => `<p>${i === 0 ? "[Context] " : i === n - 1 ? "[Writing Task] " : ""}${esc(s[0])}</p>`).join("")}
    ${t.table ? `<div class="tbl"><table><thead><tr>${t.table.h.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.table.r.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
    <hr><h4>Checklist (연습용)</h4><ul>${t.reqs.map(r => `<li>${esc(r)}</li>`).join("")}</ul>`;
}
function updateWC() {
  const n = words(editor.innerText);
  $("#wc").textContent = `${n} / 500 WORDS`; $("#wc").classList.toggle("over", n > 500);
}
let saveT = null;
function markSaved() {
  clearTimeout(saveT); $("#saved").textContent = "저장 중…";
  saveT = setTimeout(() => { ls.set("last." + T().id, editor.innerHTML); ls.set("lastmemo." + T().id, memo.value); const d = new Date(); $("#saved").textContent = `자동 저장됨 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }, 600);
}
editor.addEventListener("input", () => { updateWC(); markSaved(); });
memo.addEventListener("input", markSaved);
editor.addEventListener("paste", e => {
  const txt = (e.clipboardData || window.clipboardData).getData("text/plain"); if (!txt) return;
  e.preventDefault();
  const html = txt.split(/\n{2,}/).map(p => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
  document.execCommand("insertHTML", false, html);
});
$$(".toolbar button").forEach(b => {
  b.addEventListener("mousedown", e => e.preventDefault());
  b.addEventListener("click", () => {
    editor.focus();
    const c = b.dataset.cmd;
    if (c === "h1" || c === "h2" || c === "p") document.execCommand("formatBlock", false, c.toUpperCase());
    else if (c === "ul") document.execCommand("insertUnorderedList");
    else if (c === "ol") document.execCommand("insertOrderedList");
    else if (c === "table") document.execCommand("insertHTML", false, "<table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p>");
    else document.execCommand(c);
    updateWC(); markSaved();
  });
});
$$("[data-side]").forEach(b => b.onclick = () => {
  $$("[data-side]").forEach(x => x.setAttribute("aria-selected", x === b));
  $("#sideAgent").style.display = b.dataset.side === "agent" ? "flex" : "none";
  memo.hidden = b.dataset.side !== "memo";
});

function md(text) {
  const out = []; let list = null;
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<b>$1</b>");
  text.split("\n").forEach(raw => {
    const l = raw.trimEnd();
    const m = l.match(/^\s*[-*•]\s+(.*)/);
    if (m) { if (!list) { list = []; } list.push(`<li>${inline(m[1])}</li>`); return; }
    if (list) { out.push(`<ul>${list.join("")}</ul>`); list = null; }
    if (!l.trim()) return;
    const h = l.match(/^#{1,4}\s+(.*)/);
    out.push(h ? `<p><b>${inline(h[1])}</b></p>` : `<p>${inline(l)}</p>`);
  });
  if (list) out.push(`<ul>${list.join("")}</ul>`);
  return out.join("");
}
function renderChat() {
  chatEl.innerHTML = `<div class="msg bot hello">Hi! I'm your AI Agent. I don't know your task yet — share the context you need help with.</div>` +
    S.chat.map((m, i) => m.role === "user" ? `<div class="msg user">${esc(m.content)}</div>`
      : `<div class="msg bot${m.err ? " err" : ""}">${m.err ? esc(m.content) : md(m.content)}${m.err ? "" : `<div class="tools"><button data-copy="${i}">Copy</button><button data-insert="${i}">에디터에 붙이기</button></div>`}</div>`).join("");
  chatEl.scrollTop = chatEl.scrollHeight;
}
function agentRules() {
  // No scenario, role, data or draft is injected: the candidate must supply that context in their own prompts.
  return `You are a general-purpose AI assistant. You have no information about the user's task beyond what they tell you in this conversation.

How to respond:
- Reply in the language of the user's latest message (Korean or English). Any wording meant for an English deliverable must be natural business English.
- Keep it under 200 words unless the user asks for a full draft.
- Do not invent facts or numbers. Label anything not given by the user as "Assumption:".
- Plain text with short paragraphs or "- " bullets. No tables, no headings.`;
}
function setSend(busy) { const b = $("#btnSend"); b.textContent = busy ? "Stop" : "Send"; b.classList.toggle("stop", busy); }
async function send() {
  if (S.busy) { S.busy.abort(); return; }
  const text = ask.value.trim(); if (!text) return;
  ask.value = ""; $("#askCnt").textContent = "0 / 4000";
  S.chat.push({ role: "user", content: text }); renderChat();
  const bubble = document.createElement("div"); bubble.className = "msg bot"; bubble.innerHTML = '<span class="think">Thinking...</span>';
  chatEl.appendChild(bubble); chatEl.scrollTop = chatEl.scrollHeight;
  const ctl = new AbortController(); S.busy = ctl; setSend(true);
  await samplePromise;
  if (!sample) { S.chat.push({ role: "assistant", content: NO_AI, err: true }); S.busy = null; setSend(false); renderChat(); return; }
  const turns = [{ role: "user", content: agentRules() }, { role: "assistant", content: "Understood." },
    ...S.chat.slice(-40).map(m => ({ role: m.role, content: m.content }))];
  try {
    const r = await sample(turns, { cache: false, signal: ctl.signal, modelTier: "default", onText: ({ text }) => { bubble.innerHTML = md(text); chatEl.scrollTop = chatEl.scrollHeight; } });
    S.chat.push({ role: "assistant", content: r.text + (r.truncated ? "\n\n(답변이 길어 잘렸습니다. 나눠서 물어보세요.)" : "") });
  } catch (e) {
    const kept = (e && e.text) || "";
    if (e && e.code === "cancelled") S.chat.push({ role: "assistant", content: kept || "(중지됨)" });
    else S.chat.push({ role: "assistant", content: (kept ? kept + "\n\n" : "") + errCopy(e), err: !kept });
  } finally { S.busy = null; setSend(false); renderChat(); }
}
$("#btnSend").onclick = send;
ask.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); } });
ask.addEventListener("input", () => { $("#askCnt").textContent = `${ask.value.length} / 4000`; });
/* recommended prompts panel */
const pp = $("#promptPanel"), PP = [];
function renderPrompts() {
  PP.length = 0;
  const item = (p, why) => `<button data-pp="${PP.push(p) - 1}">${esc(p)}<span>${esc(why)}</span></button>`;
  const t = T();
  pp.innerHTML = `<div class="tip">공식: <b>${esc(PROMPT_GUIDE.formula)}</b> · 클릭하면 입력창에 들어갑니다. ___ 부분을 채워 보내세요.</div>
    <div class="grp"><b>이 시나리오 추천</b><small>${esc(t.id)}</small>${t.prompts.map(x => item(x[1], x[0] === "KO" ? "한국어 프롬프트" : "영어 프롬프트")).join("")}</div>` +
    PROMPT_GUIDE.stages.map(s => `<div class="grp"><b>${esc(s.name)}</b><small>${esc(s.time)}</small>${s.items.map(x => item(x[0], x[1])).join("")}</div>`).join("");
}
function togglePrompts(open) {
  const on = open === undefined ? pp.hidden : open;
  if (on) renderPrompts();
  pp.hidden = !on; $("#btnPrompts").setAttribute("aria-expanded", on);
}
$("#btnPrompts").onclick = () => togglePrompts();
pp.addEventListener("click", e => {
  const b = e.target.closest("[data-pp]"); if (!b) return;
  ask.value = PP[+b.dataset.pp]; ask.dispatchEvent(new Event("input"));
  togglePrompts(false); ask.focus();
  const i = ask.value.indexOf("___"); if (i >= 0) ask.setSelectionRange(i, i + 3);
});
$("#btnNewChat").onclick = () => { if (S.busy) S.busy.abort(); S.chat = []; renderChat(); };
chatEl.addEventListener("click", e => {
  const c = e.target.closest("[data-copy]"), ins = e.target.closest("[data-insert]");
  if (c) {
    const txt = S.chat[+c.dataset.copy].content;
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => { c.textContent = "Copied"; }).catch(() => { c.textContent = "선택해서 복사하세요"; });
  }
  if (ins) {
    const txt = S.chat[+ins.dataset.insert].content.replace(/\*\*/g, "");
    editor.insertAdjacentHTML("beforeend", txt.split(/\n{2,}/).map(p => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join(""));
    updateWC(); markSaved(); ins.textContent = "붙임";
  }
});

function startTask() {
  stopAll(); const t = T();
  S.chat = []; S.answers = []; S.aiQ = null; S.aiQPending = null;
  renderScenario(); editor.innerHTML = defaultDraft(t); memo.value = ""; $("#mMemo").value = "";
  $$("[data-side]")[0].click(); togglePrompts(false); renderChat(); updateWC(); $("#saved").textContent = "자동 저장됨";
  show("task"); startClock(1200, () => submitTask(true));
  editor.focus();
}
$("#btnSubmit").onclick = () => confirmBox("SUBMIT", "Task를 제출하시겠습니까?", "제출 후에는 수정할 수 없으며, Meeting 단계로 이동합니다.", "제출하기", () => submitTask(false));

function submitTask(auto) {
  clearInterval(S.tick); stopAll(); if (S.busy) S.busy.abort();
  S.taskSecs = S.elapsed;
  S.outHTML = editor.innerHTML; S.outText = editor.innerText.trim(); S.memo = memo.value;
  const t = T(), p = t.persona;
  S.qList = [{ q: OPENER, a: null, opener: true }, ...t.qs.map(q => ({ q: q.q, a: q.a }))];
  $("#brDoc").innerHTML = S.outHTML; $("#brAv").textContent = p.init; $("#brAv").style.background = AV[p.init];
  $("#brName").textContent = p.name; $("#brRole").textContent = "| " + p.role; $("#brScn").textContent = briefOf(t);
  $("#brT").textContent = auto ? "Time's up · Meeting Briefing" : "Meeting Briefing";
  $("#brAI").textContent = "";
  $("#ovBrief").hidden = false;
  prepAIQuestion();
}
async function prepAIQuestion() {
  const t = T(), p = t.persona;
  await samplePromise;
  if (!sample || words(S.outText) < 15) return;
  $("#brAI").textContent = `${p.name}이(가) 당신의 산출물을 읽고 첫 질문을 준비 중입니다…`;
  const prompt = `You are ${p.name}, ${p.role}, in a business meeting simulation. Context: ${briefOf(t)}
Scenario: ${t.scenario.map(s => s[0]).join(" ")}
The candidate wrote this document:
"""
${S.outText.slice(0, 5000)}
"""
Ask ONE opening question, in natural spoken English (max 30 words), that asks the candidate to explain or justify a specific point from THEIR document (or a clearly missing point). Return only the question sentence.`;
  S.aiQPending = sample(prompt, { modelTier: "default" }).then(r => {
    const q = r.text.trim().replace(/^["']|["']$/g, "");
    if (q && q.length < 300) { S.aiQ = q; S.qList[0] = { q, a: null, opener: true, ai: true }; $("#brAI").textContent = `${p.name}의 첫 질문 준비 완료 (당신의 산출물 기반)`; }
  }).catch(() => { $("#brAI").textContent = ""; });
}

/* ---------- meeting ---------- */
function setPersona() {
  const p = T().persona;
  ["#bigAv", "#miniAv"].forEach(s => { $(s).textContent = p.init; $(s).style.background = AV[p.init]; });
  $("#pName").textContent = p.name; $("#pRole").textContent = p.role; $("#pTag").textContent = p.name;
  $("#miniNm").innerHTML = `${esc(p.name)}<small>${esc(p.role)}</small>`;
}
function shareView(which) {
  $$("[data-share]").forEach(b => b.setAttribute("aria-pressed", b.dataset.share === which));
  const t = T();
  $("#sharedoc").innerHTML = which === "out" ? (S.outHTML || "<p>(empty)</p>")
    : `<p><b>${esc(t.title)}</b></p>${t.scenario.map(s => `<p>${esc(s[0])}</p>`).join("")}${t.table ? `<table><tr>${t.table.h.map(h => `<th>${esc(h)}</th>`).join("")}</tr>${t.table.r.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>` : ""}`;
}
$$("[data-share]").forEach(b => b.onclick = () => shareView(b.dataset.share));
function meetUI(phase) {
  S.phase = phase;
  $("#thinkBox").hidden = phase !== "thinking"; $("#infoBox").hidden = phase !== "thinking";
  $("#recBox").hidden = phase !== "answering"; $("#ansClock").hidden = phase !== "answering";
  $("#btnAnswer").hidden = phase === "answering"; $("#btnStopAns").hidden = phase !== "answering";
  $("#btnAnswer").disabled = phase !== "thinking";
  $("#btnReplay").disabled = !(phase === "thinking" && S.replay > 0);
  $("#btnReplay").textContent = `↻ Replay (${S.replay}/2)`;
  const talking = phase === "asking";
  $("#speakBadge").hidden = !talking; $("#tileP").classList.toggle("speaking", talking); $("#bigAv").classList.toggle("talk", talking);
  $("#tileMe").querySelector(".rec")?.remove();
  if (phase === "answering") $("#tileMe").insertAdjacentHTML("beforeend", '<span class="rec">REC</span>');
}
function caption() {
  const q = S.qList[S.qi]; const on = $("#setCap").checked && q && (S.phase === "asking" || S.phase === "thinking" || S.phase === "answering");
  $("#caption").hidden = !on; if (on) $("#caption").textContent = q.q;
}
async function speakQ() {
  const my = ++tk; if (synth) synth.cancel();
  const p = T().persona;
  meetUI("asking"); caption(); $("#meetSt").textContent = `${p.name} is speaking…`;
  await say(S.qList[S.qi].q);
  return my === tk;
}
async function nextQuestion() {
  if (S.phase === "ended") return;
  S.qi++;
  if (S.qi >= S.qList.length) {
    meetUI("done"); caption(); $("#meetSt").textContent = "모든 질문이 끝났습니다. End Meeting을 눌러 미팅을 종료하세요.";
    $("#btnEnd").disabled = false; return;
  }
  S.replay = 2;
  if (!(await speakQ())) return;
  startThinking();
}
function startThinking() {
  clearInterval(S.qtick); S.qLeft = 30; meetUI("thinking"); caption();
  $("#meetSt").textContent = `Question ${S.qi + 1} of ${S.qList.length} · 준비 시간`;
  $("#thinkT").textContent = fmt2(S.qLeft);
  S.qtick = setInterval(() => { S.qLeft--; $("#thinkT").textContent = fmt2(Math.max(0, S.qLeft)); if (S.qLeft <= 0) startAnswer(); }, 1000);
}
function startAnswer() {
  if (S.phase !== "thinking") return;
  clearInterval(S.qtick); stopAll(); S.qLeft = 120; S.ans0 = Date.now(); meetUI("answering"); caption();
  $("#meetSt").textContent = "Recording your answer… (소리 내어 답변하세요)";
  $("#ansClock").textContent = "⏱ " + fmt(S.qLeft);
  S.qtick = setInterval(() => { S.qLeft--; $("#ansClock").textContent = "⏱ " + fmt(Math.max(0, S.qLeft)); $("#ansClock").style.color = S.qLeft <= 20 ? "#FF8A8A" : ""; if (S.qLeft <= 0) stopAnswer(); }, 1000);
}
function stopAnswer() {
  if (S.phase !== "answering") return;
  clearInterval(S.qtick);
  S.answers[S.qi] = { secs: Math.round((Date.now() - S.ans0) / 1000) };
  meetUI("waiting"); caption();
  $("#meetSt").textContent = `Answer submitted. ${T().persona.name} is preparing the next question…`;
  setTimeout(nextQuestion, 1800);
}
$("#btnAnswer").onclick = startAnswer;
$("#btnStopAns").onclick = stopAnswer;
$("#btnReplay").onclick = () => {
  if (S.phase !== "thinking" || S.replay <= 0) return;
  S.replay--; $("#btnReplay").textContent = `↻ Replay (${S.replay}/2)`; $("#btnReplay").disabled = true;
  stopAll(); say(S.qList[S.qi].q).then(() => { if (S.phase === "thinking") $("#btnReplay").disabled = S.replay <= 0; });
};
async function startMeeting() {
  $("#ovBrief").hidden = true;
  if (S.aiQPending) { $("#meetSt").textContent = "Connecting…"; await Promise.race([S.aiQPending, wait(4000)]); }
  S.qi = -1; S.phase = "idle"; $("#btnEnd").disabled = true;
  setPersona(); shareView("out"); meetUI("idle"); show("meet");
  startClock(1800, () => endMeeting());
  $("#meetSt").textContent = `${T().persona.name} joined the meeting.`;
  await wait(1400);
  nextQuestion();
}
$("#btnJoin").onclick = startMeeting;
$("#btnEnd").onclick = () => endMeeting();
function endMeeting() {
  S.phase = "ended"; clearInterval(S.qtick); clearInterval(S.tick); stopAll();
  meetUI("ended"); renderResult(); show("result");
}

/* ---------- result ---------- */
function modelLines(t) { return t.output; }
function renderResult() {
  const t = T(), p = t.persona, aiMsgs = S.chat.filter(m => m.role === "user").length;
  const answered = S.answers.filter(Boolean).length;
  $("#resultIn").innerHTML = `
  <div><div class="k2">Review · ${esc(t.id)} · ${esc(t.title)}</div><h1>모의고사 복습</h1>
    <p style="margin:6px 0 0;color:#5C6778">Task ${fmt(S.taskSecs)} 사용 · ${words(S.outText)} words · AI Agent 질문 ${aiMsgs}회 · Meeting 답변 ${answered}/${S.qList.length}</p></div>
  <div class="card">
    <h2>Task Output</h2>
    <div class="cols">
      <div><div class="k2">내 답안</div><div class="doc-view">${S.outHTML || "<p>(empty)</p>"}</div>
        <div class="rowbtn" style="margin-top:10px"><button class="btn sm primary" data-fb="task">AI 피드백 받기</button></div><div class="fb" id="fbTask" hidden style="margin-top:10px"></div></div>
      <div><div class="k2">모범 답안 · 쉐도잉</div>${block(modelLines(t))}</div>
    </div>
  </div>
  <div class="card">
    <h2>AI Agent 활용 · Memo</h2>
    <div class="cols">
      <div><div class="k2">내 Memo</div><div class="doc-view" style="white-space:pre-wrap">${esc(S.memo || "(작성하지 않음) — 실제 시험에서는 AI 활용 판단 근거를 Memo에 남기세요.")}</div></div>
      <div><div class="k2">Memo 예시</div><ul style="margin:0;padding-left:18px">${t.memo.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
        <div class="k2" style="margin-top:12px">이 시나리오에 좋은 AI 프롬프트</div>${t.prompts.map(x => `<div class="prompt"><small>${x[0] === "KO" ? "한국어" : "English"}</small>${esc(x[1])}</div>`).join("")}</div>
    </div>
  </div>
  <div class="card">
    <h2>Meeting · ${esc(p.name)} (${esc(p.role)})</h2>
    ${S.qList.map((q, i) => { const a = S.answers[i]; const s = a ? a.secs : null;
      const pill = s === null ? '<span class="pill warn">미응답</span>' : `<span class="pill ${s >= 40 && s <= 100 ? "ok" : "warn"}">답변 ${fmt(s)}${s < 40 ? " · 짧음" : s > 100 ? " · 김" : " · 적정"}</span>`;
      return `<div class="qa">
        <div class="q"><button class="pl" data-sayt="${i}" aria-label="질문 듣기">${ICON_PLAY}</button><span>Q${i + 1}. ${esc(q.q)} ${q.ai ? '<span class="pill">AI 생성 질문</span>' : ""}</span></div>
        <div>${pill}</div>
        <label class="k2" for="said${i}" style="margin:4px 0 0">내가 말한 내용 (기억나는 대로, 선택)</label>
        <textarea id="said${i}" placeholder="I recommend ... because ..."></textarea>
        <div class="rowbtn"><button class="btn sm" data-fb="q${i}">AI 피드백</button>${q.a ? "" : `<button class="btn sm primary" data-model="${i}">AI 모범답변 만들기</button>`}</div>
        <div class="fb" id="fbq${i}" hidden></div>
        <div id="model${i}">${q.a ? `<details><summary style="cursor:pointer;font-weight:700;color:#2F6FE4">모범 답변 · 쉐도잉</summary><div style="margin-top:8px">${block(q.a)}</div></details>` : ""}</div>
      </div>`; }).join("")}
  </div>
  <div class="rowbtn"><button class="btn primary" id="rAgain">같은 시나리오 다시</button><button class="btn" id="rHome">시나리오 선택</button><button class="btn" id="rStudy">학습 모드</button></div>`;
  $("#rAgain").onclick = startTask; $("#rHome").onclick = goHome; $("#rStudy").onclick = () => openStudy("scn");
}
async function aiInto(box, prompt, tier) {
  box.hidden = false; box.innerHTML = '<span style="color:#8A95A5">Thinking…</span>';
  await samplePromise;
  if (!sample) { box.textContent = NO_AI; return null; }
  try { const r = await sample(prompt, { modelTier: tier || "default", onText: ({ text }) => { box.innerHTML = md(text); } }); box.innerHTML = md(r.text); return r.text; }
  catch (e) { box.textContent = errCopy(e); return null; }
}
$("#resultIn").addEventListener("click", async e => {
  const t = T(), p = t.persona;
  const fb = e.target.closest("[data-fb]"), mdl = e.target.closest("[data-model]"), sq = e.target.closest("[data-sayt]");
  if (sq) { stopAll(); say(S.qList[+sq.dataset.sayt].q); return; }
  if (fb && fb.dataset.fb === "task") {
    fb.disabled = true;
    await aiInto($("#fbTask"), `You are a strict but encouraging assessor for a business-English work-simulation test. Evaluate the candidate's written deliverable.
SCENARIO: ${t.scenario.map(s => s[0]).join(" ")}
DATA: ${tableMD(t.table)}
REQUIRED ELEMENTS: ${t.reqs.join("; ")}
CANDIDATE OUTPUT:
"""
${S.outText.slice(0, 6000) || "(empty)"}
"""
Write the feedback in Korean (English example sentences stay in English). Format, plain text with "- " bullets, under 300 words:
- 5 criteria scored 1–5 with one-line reason each: 요구사항 충족, 결론 먼저·구조, 근거·숫자 정확성(시나리오 대비), 비즈니스 톤, 문법·명확성
- 가장 중요한 수정 3가지, each with a corrected English sentence
- 한 줄 총평`, "default");
    fb.disabled = false; return;
  }
  if (fb) {
    const i = +fb.dataset.fb.slice(1), q = S.qList[i], said = $("#said" + i).value.trim(), a = S.answers[i];
    if (!said) { const box = $("#fbq" + i); box.hidden = false; box.textContent = "먼저 위 칸에 실제로 말한 내용을 기억나는 대로 적어 주세요."; return; }
    fb.disabled = true;
    await aiInto($("#fbq" + i), `You are a coach for a business-English meeting simulation where "message delivery matters more than fluency".
Speaker asking: ${p.name}, ${p.role}. Context: ${briefOf(t)}
Question: ${q.q}
The candidate's own written document: """${S.outText.slice(0, 3000)}"""
What the candidate said (their recollection): """${said}"""
Answer length: ${a ? a.secs + " seconds" : "unknown"} (target 60–90 s, max 120 s).
Give feedback in Korean (English examples stay English), plain text with "- " bullets, under 220 words:
- 메시지 전달 점검: 결론 먼저 / 근거·숫자 / 상대 우려 인정 / 다음 단계 — each ✓ or ✗ with a short note
- 개선된 답변 (English, 80–110 words, spoken style)
- 다음에 써먹을 표현 2개`, "default");
    fb.disabled = false; return;
  }
  if (mdl) {
    const i = +mdl.dataset.model, q = S.qList[i]; mdl.disabled = true;
    const box = $("#model" + i);
    const text = await aiInto(box, `Write a model spoken answer for a business-English meeting simulation.
Speaker asking: ${p.name}, ${p.role}. Context: ${briefOf(t)}
Scenario: ${t.scenario.map(s => s[0]).join(" ")}
The candidate's document: """${S.outText.slice(0, 4000) || t.output.map(l => l[0]).join(" ")}"""
Question: ${q.q}
Write the answer the candidate could say in 60–90 seconds (110–150 words): answer first, two reasons using numbers from the document or scenario, address a likely concern, end with a next step. No bullets, no headings, no quotation marks.
Output format: one English sentence per line, followed by " || " and a natural Korean translation of that sentence. Example:
I'd recommend Vendor B. || 저는 Vendor B를 추천합니다.`, "default");
    if (text) box.innerHTML = `<div class="k2">AI 모범답변 · 쉐도잉</div>` + block(enKoLines(text));
    else mdl.disabled = false;
  }
});

/* ---------- study mode ---------- */
let studyTab = "scn", studyTi = S.ti;
function openStudy(tab) { stopAll(); studyTab = tab || studyTab; studyTi = S.ti; renderStudy(); show("study"); }
function renderStudy() {
  const tabs = [["scn", "시나리오별 모범답안"], ["prompt", "AI 프롬프트"], ["tpl", "템플릿 회화"], ["pat", "핵심 패턴"], ["intro", "직무별 자기소개"]];
  let body = "";
  if (studyTab === "scn") {
    const t = TASKS[studyTi];
    body = `<div class="rowbtn">${TASKS.map((x, i) => `<button class="chip" data-sti="${i}" aria-pressed="${i === studyTi}">${x.id} · ${esc(x.short)}</button>`).join("")}</div>
    <div class="card"><div class="k2">Scenario</div><h2>${esc(t.title)}</h2>${block(t.scenario)}
      ${t.table ? `<div class="tbl2"><table><tr>${t.table.h.map(h => `<th>${esc(h)}</th>`).join("")}</tr>${t.table.r.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>` : ""}</div>
    <div class="card"><div class="k2">모범 답안 · ${esc(t.head)}</div>${block(t.output)}</div>
    <div class="card"><div class="k2">예상 Meeting 질문 · ${esc(t.persona.name)} (${esc(t.persona.role)})</div>
      ${t.qs.map((q, i) => `<div class="qa"><div class="q"><span>Q${i + 1}. ${esc(q.q)}</span></div><details><summary style="cursor:pointer;font-weight:700;color:#2F6FE4">모범 답변 · 쉐도잉</summary><div style="margin-top:8px">${block(q.a)}</div></details></div>`).join("")}</div>`;
  } else if (studyTab === "intro") {
    body = `<div class="card"><h2>자기소개 공통 원칙</h2><ul style="margin:0;padding-left:18px">${INTRO_GENERAL.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` +
      INTRO_TRACKS.map(tr => `<div class="card"><div class="k2">모집분야</div><h2>${esc(tr.track)}</h2>
        <div class="cols" style="margin-bottom:10px"><div><div class="k2">강조 포인트</div><ul style="margin:0;padding-left:18px">${tr.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><div class="k2">넣을 키워드</div><div class="rowbtn">${tr.keys.map(k => `<span class="pill">${esc(k)}</span>`).join("")}</div></div></div>
        <div class="k2">30~45초 자기소개 · 쉐도잉</div>${block(tr.intro)}
        <div class="k2" style="margin-top:12px">“Why this track?” 답변</div>${block(tr.why)}</div>`).join("");
  } else if (studyTab === "prompt") {
    const G = PROMPT_GUIDE;
    body = `<div class="card"><h2>좋은 프롬프트 공식</h2><p style="margin:0 0 8px;font-weight:700">${esc(G.formula)}</p><ul style="margin:0;padding-left:18px">${G.principles.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="card"><h2>피해야 할 프롬프트</h2><ul style="margin:0;padding-left:18px">${G.avoid.map(x => `<li><b>${esc(x[0])}</b> · ${esc(x[1])}</li>`).join("")}</ul></div>` +
      G.stages.map(s => `<div class="card"><div class="k2">${esc(s.time)}</div><h2>${esc(s.name)}</h2>${s.items.map(x => `<div class="prompt" style="white-space:pre-line"><small>${esc(x[1])}</small>${esc(x[0])}</div>`).join("")}</div>`).join("") +
      `<div class="card"><h2>시나리오별 추천 프롬프트</h2>${TASKS.map(t => `<div style="margin-top:10px"><b>${esc(t.id)} · ${esc(t.short)}</b>${t.prompts.map(x => `<div class="prompt"><small>${x[0] === "KO" ? "한국어" : "English"}</small>${esc(x[1])}</div>`).join("")}</div>`).join("")}</div>`;
  } else if (studyTab === "tpl") {
    body = `<p class="ko" style="margin:0 0 10px">★ 자주 쓰고 활용도 높은 핵심 표현</p>` + TEMPLATES.map(c => `<div class="card"><h2>${esc(c.cat)}</h2>${block(c.items)}</div>`).join("");
  } else {
    body = `<div class="card">${PATTERNS.map((p, i) => `<div class="pat"><h3><span>${i + 1}. ${esc(p.p)}</span><span class="m">${esc(p.m)}</span></h3>${p.note ? `<p class="ko">${esc(p.note)}</p>` : ""}${block(p.ex)}</div>`).join("")}</div>
      <div class="card"><h2>실전 회의 대화</h2>${block(DIALOGUE)}</div>`;
  }
  $("#studyIn").innerHTML = `
    <div><div class="k2">Study Mode</div><h1>리스닝 · 쉐도잉</h1><p style="margin:6px 0 0;color:#5C6778">▶ 한 문장 · ×3 반복 쉐도잉 · 쉐도잉 = 문장마다 따라 말할 시간(주황 바) · 속도/목소리는 우측 상단 ⚙</p></div>
    <div class="studybar"><div class="tabs">${tabs.map(([k, l]) => `<button data-stab="${k}" aria-selected="${k === studyTab}">${l}</button>`).join("")}</div>
      <span style="flex:1"></span><button class="chip" id="cKo" aria-pressed="${!document.body.classList.contains("hide-ko")}">해석</button><button class="chip" id="cBlind" aria-pressed="${document.body.classList.contains("blind")}">영어 가리기</button><button class="chip" data-stop>정지</button><button class="chip" id="cHome">← 처음으로</button></div>
    ${body}`;
}
$("#studyIn").addEventListener("click", e => {
  const g = s => e.target.closest(s); let el;
  if ((el = g("[data-stab]"))) { stopAll(); studyTab = el.dataset.stab; renderStudy(); return; }
  if ((el = g("[data-sti]"))) { stopAll(); studyTi = +el.dataset.sti; renderStudy(); return; }
  if ((el = g("#cKo"))) { const on = el.getAttribute("aria-pressed") !== "true"; el.setAttribute("aria-pressed", on); document.body.classList.toggle("hide-ko", !on); return; }
  if ((el = g("#cBlind"))) { const on = el.getAttribute("aria-pressed") !== "true"; el.setAttribute("aria-pressed", on); document.body.classList.toggle("blind", on); return; }
  if (g("#cHome")) { goHome(); }
});

/* ---------- global events ---------- */
document.addEventListener("click", e => {
  const g = s => e.target.closest(s); let el;
  if ((el = g("[data-say]"))) { playSeq([+el.dataset.say], "once"); return; }
  if ((el = g("[data-rep]"))) { const i = +el.dataset.rep; playSeq([i, i, i], "shadow"); return; }
  if ((el = g("[data-bplay]"))) { playSeq(BLK[+el.dataset.bplay], "listen"); return; }
  if ((el = g("[data-bshadow]"))) { playSeq(BLK[+el.dataset.bshadow], "shadow"); return; }
  if (g("[data-stop]")) { stopAll(); return; }
  if (g("[data-listen]")) { sayList(T().scenario.map(s => s[0])); return; }
  if ((el = g("[data-pick]"))) { S.ti = +el.dataset.pick; ls.set("ti", S.ti); renderIntro(); return; }
  if ((el = g("[data-mode]"))) { S.mode = el.dataset.mode; ls.set("mode", S.mode); renderIntro(); return; }
  if (document.body.classList.contains("blind") && (el = g(".en"))) el.classList.toggle("reveal");
});
function goHome() {
  stopAll(); clearInterval(S.tick); clearInterval(S.qtick); if (S.busy) S.busy.abort();
  S.phase = "ended"; $("#ovBrief").hidden = true; renderIntro(); show("intro");
}
$("#btnStart").onclick = startTask;
$("#btnStudy").onclick = () => openStudy("scn");
$("#btnReset").onclick = () => {
  if (!$("#v-intro").hidden) return;
  if (!$("#v-study").hidden) { goHome(); return; }
  confirmBox("RESET", "시험을 재설정할까요?", "진행 중인 답안과 미팅 기록이 사라지고 처음 화면으로 돌아갑니다.", "재설정", goHome);
};
$("#btnSettings").onclick = () => { $("#settings").hidden = !$("#settings").hidden; };
$("#setClose").onclick = () => { $("#settings").hidden = true; };
["setRate", "setGap"].forEach(id => { const s = $("#" + id); s.value = ls.get(id, s.value); s.onchange = () => ls.set(id, s.value); });
$("#setVoice").onchange = e => ls.set("voice", e.target.value);
$("#setCap").checked = ls.get("cap", "0") === "1";
$("#setCap").onchange = e => { ls.set("cap", e.target.checked ? "1" : "0"); caption(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") { $("#settings").hidden = true; if (!$("#ovConfirm").hidden) $("#cfNo").click(); } });
window.addEventListener("beforeunload", e => { if (!$("#v-task").hidden || !$("#v-meet").hidden) { e.preventDefault(); e.returnValue = ""; } });

renderIntro(); show("intro");
})();
