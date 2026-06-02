<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Domain Character Counter</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f8f8fc;
    --surface: #ffffff;
    --surface2: #f2f2f8;
    --border: rgba(0,0,0,0.07);
    --border2: rgba(0,0,0,0.12);
    --accent: #5b4ef8;
    --accent2: #9b4fd4;
    --green: #0ea87a;
    --amber: #d97706;
    --red: #e03b3b;
    --text: #18172b;
    --muted: #8885a8;
    --mono: 'Space Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem 4rem;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(91,78,248,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91,78,248,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  .glow-orb {
    position: fixed;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91,78,248,0.07) 0%, transparent 70%);
    top: -200px; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 0;
  }

  .container { position: relative; z-index: 1; width: 100%; max-width: 680px; }

  header { text-align: center; margin-bottom: 2.5rem; }

  .tag {
    display: inline-block;
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent);
    background: rgba(91,78,248,0.08);
    border: 1px solid rgba(91,78,248,0.18);
    padding: 5px 14px; border-radius: 20px; margin-bottom: 1.25rem;
  }

  h1 {
    font-family: var(--mono);
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 700; line-height: 1.2;
    letter-spacing: -0.02em; margin-bottom: 0.6rem;
  }

  h1 span {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .subtitle { font-size: 14px; color: var(--muted); line-height: 1.6; }

  .input-section {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 1.75rem; margin-bottom: 1.25rem;
  }

  .input-label {
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 10px; display: block;
  }

  .input-wrapper { position: relative; display: flex; align-items: center; }

  .domain-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 14px 110px 14px 18px;
    font-family: var(--mono); font-size: 17px;
    color: var(--text); outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .domain-input::placeholder { color: rgba(122,121,148,0.45); }
  .domain-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(91,78,248,0.1);
  }

  .tld-badge {
    position: absolute; right: 48px;
    font-family: var(--mono); font-size: 12px;
    color: var(--accent2);
    background: rgba(155,79,212,0.08);
    border: 1px solid rgba(155,79,212,0.18);
    padding: 3px 9px; border-radius: 7px;
    pointer-events: none;
  }

  .clear-btn {
    position: absolute; right: 14px;
    background: none; border: none;
    color: var(--muted); cursor: pointer;
    font-size: 20px; padding: 2px; line-height: 1;
    transition: color 0.15s; display: none;
  }
  .clear-btn.visible { display: block; }
  .clear-btn:hover { color: var(--text); }

  .char-map { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 1rem; min-height: 10px; }

  .char-pill {
    font-family: var(--mono); font-size: 13px;
    padding: 3px 7px; border-radius: 6px;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); animation: popIn 0.15s ease backwards;
  }
  .char-pill.invalid {
    color: var(--red);
    background: rgba(224,59,59,0.06);
    border-color: rgba(224,59,59,0.18);
  }

  @keyframes popIn {
    from { transform: scale(0.6); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; margin-bottom: 1.25rem;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 1.1rem 1rem;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
  }
  .stat-card:hover { border-color: var(--border2); transform: translateY(-2px); }

  .stat-value {
    font-family: var(--mono); font-size: 1.8rem;
    font-weight: 700; line-height: 1; margin-bottom: 5px;
  }

  .stat-label {
    font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); font-family: var(--mono);
  }

  .rating-section {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.25rem; margin-bottom: 1.25rem;
  }

  .rating-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }

  .rating-title {
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
  }

  .rating-badge {
    font-family: var(--mono); font-size: 11px;
    padding: 3px 11px; border-radius: 20px; font-weight: 700;
    letter-spacing: 0.05em; transition: all 0.3s;
  }

  .bar-track { height: 7px; background: var(--surface2); border-radius: 4px; overflow: hidden; margin-bottom: 9px; }
  .bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s; }

  .rating-hint { font-size: 13px; color: var(--muted); line-height: 1.5; }

  .legend { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .legend-item {
    font-family: var(--mono); font-size: 10px;
    padding: 2px 8px; border-radius: 4px; opacity: 0.45; transition: opacity 0.2s;
  }
  .legend-item.active { opacity: 1; }

  .quick-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.25rem; }

  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 16px; border-radius: 11px;
    font-family: var(--mono); font-size: 11px;
    letter-spacing: 0.05em; font-weight: 700;
    text-decoration: none; border: 1px solid var(--border2);
    background: var(--surface); color: var(--text);
    cursor: pointer; transition: all 0.2s; flex: 1;
    justify-content: center; min-width: 120px;
  }
  .btn:hover {
    background: var(--surface2); border-color: var(--accent);
    color: var(--accent); transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(91,78,248,0.12);
  }
  .btn:active { transform: translateY(0); }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), rgba(91,78,248,0.75));
    border-color: var(--accent); color: #fff;
  }
  .btn-primary:hover { color: #fff; box-shadow: 0 4px 20px rgba(91,78,248,0.28); }

  /* Domain results section */
  .results-section {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 20px; overflow: hidden;
  }

  .results-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px;
  }

  .results-title {
    font-family: var(--mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text); font-weight: 700;
    display: flex; align-items: center; gap: 8px;
  }

  .results-count {
    font-family: var(--mono); font-size: 11px;
    background: rgba(91,78,248,0.08);
    color: var(--accent); border: 1px solid rgba(91,78,248,0.18);
    padding: 2px 10px; border-radius: 20px;
  }

  .fetch-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 10px;
    font-family: var(--mono); font-size: 11px; font-weight: 700;
    letter-spacing: 0.05em;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff; border: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }
  .fetch-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .fetch-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .results-body { padding: 0; }

  .loading-state {
    padding: 2.5rem 1.5rem; text-align: center;
    color: var(--muted); font-family: var(--mono); font-size: 12px;
    letter-spacing: 0.05em;
  }

  .spinner {
    width: 28px; height: 28px; margin: 0 auto 12px;
    border: 2px solid var(--border2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-state {
    padding: 2.5rem 1.5rem; text-align: center;
    color: var(--muted); font-family: var(--mono); font-size: 12px; letter-spacing: 0.05em;
  }

  .domain-table { width: 100%; border-collapse: collapse; }

  .domain-row {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 12px;
    padding: 11px 1.5rem;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
    animation: fadeIn 0.25s ease backwards;
  }
  .domain-row:last-child { border-bottom: none; }
  .domain-row:hover { background: var(--surface2); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

  .domain-name {
    font-family: var(--mono); font-size: 14px;
    color: var(--text); font-weight: 700;
    display: flex; align-items: center; gap: 8px;
  }

  .domain-name .tld { color: var(--muted); font-weight: 400; }

  .avail-badge {
    font-family: var(--mono); font-size: 10px;
    padding: 2px 9px; border-radius: 20px; font-weight: 700;
    letter-spacing: 0.05em; white-space: nowrap;
  }
  .avail-yes { background: rgba(14,168,122,0.1); color: var(--green); border: 1px solid rgba(14,168,122,0.2); }
  .avail-no  { background: rgba(224,59,59,0.07); color: var(--red);   border: 1px solid rgba(224,59,59,0.15); }
  .avail-unknown { background: var(--surface2); color: var(--muted); border: 1px solid var(--border); }

  .char-count-badge {
    font-family: var(--mono); font-size: 11px;
    color: var(--accent2); background: rgba(155,79,212,0.07);
    border: 1px solid rgba(155,79,212,0.15);
    padding: 2px 9px; border-radius: 6px; white-space: nowrap;
  }

  .domain-link {
    font-size: 11px; color: var(--muted); text-decoration: none;
    transition: color 0.15s;
  }
  .domain-link:hover { color: var(--accent); }

  .table-header {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 12px;
    padding: 8px 1.5rem;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }
  .th {
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
  }
  .th-right { text-align: right; }

  .idle-hint {
    text-align: center; padding: 2rem 0 0.5rem;
    color: var(--muted); font-size: 13px; font-family: var(--mono); letter-spacing: 0.05em;
  }
  .cursor {
    display: inline-block; width: 2px; height: 1em;
    background: var(--accent); margin-left: 4px;
    vertical-align: -2px; animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .hidden { display: none !important; }

  footer {
    text-align: center; margin-top: 2.5rem;
    font-size: 11px; color: var(--muted);
    font-family: var(--mono); letter-spacing: 0.05em;
    z-index: 1; position: relative;
  }
  footer a { color: var(--accent); text-decoration: none; }
  footer a:hover { text-decoration: underline; }

  .sort-bar {
    display: flex; gap: 6px; align-items: center; flex-wrap: wrap;
  }
  .sort-btn {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.07em;
    padding: 3px 10px; border-radius: 6px; border: 1px solid var(--border2);
    background: var(--surface); color: var(--muted); cursor: pointer;
    transition: all 0.15s;
  }
  .sort-btn.active { background: rgba(91,78,248,0.08); border-color: var(--accent); color: var(--accent); }
  .sort-btn:hover { border-color: var(--accent); color: var(--accent); }

  .error-msg {
    padding: 1.5rem; text-align: center;
    font-family: var(--mono); font-size: 12px; color: var(--red);
  }
</style>
</head>
<body>
<div class="glow-orb"></div>
<div class="container">
  <header>
    <div class="tag">Domain Tools</div>
    <h1>Domain <span>Character</span> Counter</h1>
    <p class="subtitle">Type a keyword → fetch available domains from InstantDomainSearch → count characters of each</p>
  </header>

  <div class="input-section">
    <label class="input-label" for="domain-input">Enter your keyword</label>
    <div class="input-wrapper">
      <input type="text" class="domain-input" id="domain-input" placeholder="e.g. cloudpulse" autocomplete="off" spellcheck="false" />
      <button class="clear-btn" id="clear-btn" onclick="clearInput()">×</button>
      <span class="tld-badge">.com</span>
    </div>
    <div class="char-map" id="char-map"></div>
  </div>

  <div id="idle-hint" class="idle-hint">type a keyword to begin<span class="cursor"></span></div>

  <div id="main-ui" class="hidden">
    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" id="stat-total" style="color:var(--accent)">0</div>
        <div class="stat-label">Total chars</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="stat-valid" style="color:var(--green)">0</div>
        <div class="stat-label">Valid chars</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="stat-full" style="color:var(--accent2)">0</div>
        <div class="stat-label">With .com</div>
      </div>
    </div>

    <!-- Rating -->
    <div class="rating-section">
      <div class="rating-header">
        <span class="rating-title">Length rating</span>
        <span class="rating-badge" id="rating-badge">—</span>
      </div>
      <div class="bar-track"><div class="bar-fill" id="bar-fill" style="width:0%"></div></div>
      <div class="rating-hint" id="rating-hint">—</div>
      <div class="legend">
        <span class="legend-item" id="leg-1" style="background:rgba(14,168,122,0.1);color:var(--green);border:1px solid rgba(14,168,122,0.2)">1–4 premium</span>
        <span class="legend-item" id="leg-2" style="background:rgba(91,78,248,0.1);color:var(--accent);border:1px solid rgba(91,78,248,0.2)">5–7 great</span>
        <span class="legend-item" id="leg-3" style="background:rgba(217,119,6,0.1);color:var(--amber);border:1px solid rgba(217,119,6,0.2)">8–11 good</span>
        <span class="legend-item" id="leg-4" style="background:rgba(224,59,59,0.08);color:var(--red);border:1px solid rgba(224,59,59,0.2)">12+ long</span>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="quick-actions">
      <a class="btn btn-primary" id="btn-search" href="#" target="_blank">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        Search Domains
      </a>
      <a class="btn" id="btn-generator" href="#" target="_blank">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Generator
      </a>
      <button class="btn" onclick="copyDomain()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        <span id="copy-label">Copy .com</span>
      </button>
    </div>

    <!-- Domain results -->
    <div class="results-section">
      <div class="results-header">
        <div>
          <div class="results-title">
            Available domains
            <span class="results-count" id="results-count">0 found</span>
          </div>
          <div class="sort-bar" style="margin-top:8px" id="sort-bar">
            <span style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:0.07em">SORT:</span>
            <button class="sort-btn active" onclick="sortDomains('chars')" id="sort-chars">chars ↑</button>
            <button class="sort-btn" onclick="sortDomains('alpha')" id="sort-alpha">A–Z</button>
            <button class="sort-btn" onclick="sortDomains('avail')" id="sort-avail">available first</button>
          </div>
        </div>
        <button class="fetch-btn" id="fetch-btn" onclick="fetchDomains()">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Fetch domains
        </button>
      </div>

      <div class="results-body" id="results-body">
        <div class="empty-state">
          click "Fetch domains" to load available domain suggestions from InstantDomainSearch
        </div>
      </div>
    </div>
  </div>
</div>

<footer>
  data from <a href="https://instantdomainsearch.com" target="_blank">instantdomainsearch.com</a> via AI · built with claude
</footer>

<script>
const input = document.getElementById('domain-input');
let allDomains = [];
let currentSort = 'chars';
let fetchController = null;

function getRating(len) {
  if (!len) return null;
  if (len <= 4) return { label:'PREMIUM', hint:`${len} chars — ultra-short, extremely rare and memorable.`, bar:22, color:'var(--green)', idx:0 };
  if (len <= 7) return { label:'GREAT',   hint:`${len} chars — ideal length for branding. Easy to type and remember.`, bar:52, color:'var(--accent)', idx:1 };
  if (len <= 11) return { label:'GOOD',   hint:`${len} chars — still memorable. Widely available across TLDs.`, bar:76, color:'var(--amber)', idx:2 };
  return { label:'LONG', hint:`${len} chars — consider shortening. Harder to recall and type.`, bar:100, color:'var(--red)', idx:3 };
}

function update() {
  const raw = input.value;
  document.getElementById('clear-btn').classList.toggle('visible', raw.length > 0);

  if (!raw.length) {
    document.getElementById('idle-hint').classList.remove('hidden');
    document.getElementById('main-ui').classList.add('hidden');
    document.getElementById('char-map').innerHTML = '';
    allDomains = [];
    return;
  }

  document.getElementById('idle-hint').classList.add('hidden');
  document.getElementById('main-ui').classList.remove('hidden');

  const valid = raw.replace(/[^a-zA-Z0-9-]/g,'');
  document.getElementById('stat-total').textContent = raw.length;
  document.getElementById('stat-valid').textContent = valid.length;
  document.getElementById('stat-full').textContent = valid.length ? valid.length + 4 : 0;

  const r = getRating(valid.length);
  if (r) {
    document.getElementById('bar-fill').style.width = r.bar+'%';
    document.getElementById('bar-fill').style.background = `linear-gradient(90deg,${r.color},${r.color}99)`;
    const rb = document.getElementById('rating-badge');
    rb.textContent = r.label;
    rb.style.background = `${r.color}18`; rb.style.border = `1px solid ${r.color}44`; rb.style.color = r.color;
    document.getElementById('rating-hint').textContent = r.hint;
    [0,1,2,3].forEach(i => document.getElementById('leg-'+(i+1)).classList.toggle('active', i===r.idx));
  }

  const enc = encodeURIComponent(valid || raw);
  document.getElementById('btn-search').href = `https://instantdomainsearch.com/?q=${enc}`;
  document.getElementById('btn-generator').href = `https://instantdomainsearch.com/domain-generator?q=${enc}`;

  // Char map
  const cm = document.getElementById('char-map');
  cm.innerHTML = '';
  [...raw].forEach((ch, i) => {
    const p = document.createElement('span');
    p.className = 'char-pill' + (/[^a-zA-Z0-9-]/.test(ch) ? ' invalid' : '');
    p.textContent = ch;
    p.style.animationDelay = (i*25)+'ms';
    cm.appendChild(p);
  });

  // Reset results if keyword changed
  document.getElementById('results-body').innerHTML = '<div class="empty-state">click "Fetch domains" to load available domain suggestions from InstantDomainSearch</div>';
  document.getElementById('results-count').textContent = '0 found';
  allDomains = [];
}

function clearInput() {
  input.value = ''; input.focus(); update();
}

function copyDomain() {
  const v = input.value.replace(/[^a-zA-Z0-9-]/g,'');
  if (!v) return;
  navigator.clipboard.writeText(v+'.com').then(() => {
    const lbl = document.getElementById('copy-label');
    lbl.textContent = 'Copied!';
    setTimeout(() => lbl.textContent = 'Copy .com', 1800);
  });
}

async function fetchDomains() {
  const raw = input.value.trim();
  const keyword = raw.replace(/[^a-zA-Z0-9-]/g,'');
  if (!keyword) return;

  if (fetchController) fetchController.abort();
  fetchController = new AbortController();

  const btn = document.getElementById('fetch-btn');
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="width:14px;height:14px;border-width:2px;margin:0"></div> Fetching...`;

  document.getElementById('results-body').innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      querying instantdomainsearch.com for "${keyword}"...
    </div>`;
  document.getElementById('results-count').textContent = 'loading…';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: fetchController.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a domain availability assistant. Use the InstantDomainSearch MCP tools to fetch domain suggestions for the given keyword.
Call generate_domain_variations with the keyword to get domain suggestions.
Then respond ONLY with a valid JSON array (no markdown, no explanation) where each object has:
- "domain": full domain name including TLD (e.g. "cloudpulse.com")
- "available": true/false/null (null if unknown)
Return at least 20 domains if possible.`,
        messages: [{ role: 'user', content: `Fetch domain suggestions for keyword: "${keyword}". Return JSON array only.` }],
        mcp_servers: [{
          type: 'url',
          url: 'https://instantdomainsearch.com/mcp/sse',
          name: 'instant-domain-search'
        }]
      })
    });

    const data = await response.json();

    // Extract text content from response (could be from text blocks or tool results)
    let rawText = '';
    if (data.content) {
      for (const block of data.content) {
        if (block.type === 'text') rawText += block.text;
        if (block.type === 'mcp_tool_result') {
          const c = block.content;
          if (Array.isArray(c)) c.forEach(x => { if (x.text) rawText += x.text; });
          else if (typeof c === 'string') rawText += c;
        }
      }
    }

    // Try to parse JSON from the response
    let domains = [];
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try { domains = JSON.parse(jsonMatch[0]); } catch(e) {}
    }

    if (!domains.length) {
      // Fallback: generate variations client-side and mark as needing verification
      domains = generateFallbackDomains(keyword);
    }

    allDomains = domains;
    renderDomains();

  } catch (err) {
    if (err.name === 'AbortError') return;
    // Fallback to client-side generation
    allDomains = generateFallbackDomains(keyword);
    renderDomains();
  }

  btn.disabled = false;
  btn.innerHTML = `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Refresh`;
}

function generateFallbackDomains(kw) {
  const prefixes = ['get','my','the','go','use','try','hey','app','pro','top','new','best','fast','easy','smart','open','next'];
  const suffixes = ['app','hq','hub','io','ly','ify','fy','lab','labs','ai','co','pro','net','online','site','web','now'];
  const tlds = ['.com','.io','.co','.ai','.app','.net'];
  const result = [];
  // exact
  tlds.forEach(t => result.push({ domain: kw+t, available: null }));
  // prefix combos
  prefixes.forEach(p => result.push({ domain: p+kw+'.com', available: null }));
  // suffix combos
  suffixes.forEach(s => result.push({ domain: kw+s+'.com', available: null }));
  return result.slice(0, 40);
}

function sortDomains(mode) {
  currentSort = mode;
  ['chars','alpha','avail'].forEach(m => {
    document.getElementById('sort-'+m).classList.toggle('active', m === mode);
  });
  renderDomains();
}

function renderDomains() {
  const body = document.getElementById('results-body');
  if (!allDomains.length) {
    body.innerHTML = '<div class="empty-state">no domain suggestions returned</div>';
    document.getElementById('results-count').textContent = '0 found';
    return;
  }

  let sorted = [...allDomains];
  if (currentSort === 'chars') {
    sorted.sort((a,b) => {
      const na = a.domain.split('.')[0].length;
      const nb = b.domain.split('.')[0].length;
      return na - nb;
    });
  } else if (currentSort === 'alpha') {
    sorted.sort((a,b) => a.domain.localeCompare(b.domain));
  } else if (currentSort === 'avail') {
    sorted.sort((a,b) => {
      const av = v => v === true ? 0 : v === null ? 1 : 2;
      return av(a.available) - av(b.available);
    });
  }

  const available = allDomains.filter(d => d.available === true).length;
  const unknown = allDomains.filter(d => d.available === null).length;
  document.getElementById('results-count').textContent =
    available > 0 ? `${available} available` : unknown > 0 ? `${allDomains.length} to check` : `${allDomains.length} found`;

  body.innerHTML = `
    <div class="table-header">
      <div class="th">domain name</div>
      <div class="th th-right">name chars</div>
      <div class="th th-right">status</div>
      <div class="th th-right">link</div>
    </div>
  `;

  sorted.forEach((d, i) => {
    const parts = d.domain.split('.');
    const name = parts[0];
    const tld = '.'+parts.slice(1).join('.');
    const nameLen = name.length;
    const fullLen = d.domain.length;

    const availHtml = d.available === true
      ? `<span class="avail-badge avail-yes">✓ available</span>`
      : d.available === false
      ? `<span class="avail-badge avail-no">✗ taken</span>`
      : `<span class="avail-badge avail-unknown">? check</span>`;

    const row = document.createElement('div');
    row.className = 'domain-row';
    row.style.animationDelay = (i*18)+'ms';
    row.innerHTML = `
      <div class="domain-name">${name}<span class="tld">${tld}</span></div>
      <div class="char-count-badge" title="${fullLen} chars total">${nameLen} chars</div>
      ${availHtml}
      <a class="domain-link" href="https://instantdomainsearch.com/?q=${encodeURIComponent(name)}" target="_blank">check ↗</a>
    `;
    body.appendChild(row);
  });
}

input.addEventListener('input', update);
input.focus();
</script>
</body>
</html>