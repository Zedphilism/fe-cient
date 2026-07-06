# CLAUDE.md — Study Hub (NetCore · MathCore · LogicCore)

This file is the authoritative specification for every module in this repository.
Read it **in full** before touching any content file.

---

## 1 — Project Overview

Browser-only (no build step, no framework) gamified study platform hosting **three course modules**
that share one engine:

| Module key | Academy | Course | Chapters | Chapter keys | Pages |
|---|---|---|---|---|---|
| `net` | NetCore | Network Communication (SCSR2213) | 4–8 | `ch4`–`ch8` | `chapter4.html` … |
| `math` | MathCore | Computational Mathematics (SECI1113) | 5–10 | `math5`–`math10` | `math-chapter5.html` … |
| `logic` | LogicCore | Digital Logic (SECR1013) | 5–8 | `dl5`–`dl8` | `logic-chapter5.html` … |

- Entry hub: `index.html` (3 module cards, per-module progress + continue + exam buttons)
- Exam mode: `exam-mode.html?module=net|math|logic` (omit param = combined exam)
- Network chapters 1–3 were **deleted** (2026-07); old localStorage saves may still hold their topic IDs — harmless.

Shared engines: `js/progress.js`, `js/gamification.js`, `js/quiz.js`, `js/animations.js`,
`js/chapter-page.js`, `js/app.js`, `js/exam-mode.js` + CSS `css/style.css|animations.css|components.css`.

---

## 2 — Two Kinds of Chapter Pages

### 2.1 Legacy static pages (network `chapter4.html`–`chapter8.html`, `math-chapter10.html`)
Full HTML with hand-written sections, sims (`data-sim-id`) and an inline init script that mounts
quizzes via `Quiz.mount(...)` + `App.onTopicQuizComplete`.

### 2.2 Renderer pages (all other math/logic chapters) — **preferred for new chapters**
Thin shells; `js/chapter-page.js` builds the entire page (header, status bar, hero, sections,
lock overlays, quiz mounts, complete-CTA) from the data file:

```html
<body data-page="chapter" data-chapter="dl5" data-module="logic" data-data-global="dlChapter5Data">
  <div id="chapter-root"></div>
  <script src="data/logic-chapter5-data.js"></script>
  <script src="js/progress.js"></script>
  <script src="js/gamification.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/chapter-page.js"></script>   <!-- BEFORE app.js -->
  <script src="js/app.js"></script>
</body>
```

`chapter-page.js` registers its DOMContentLoaded handler before `app.js`, so the DOM exists when
`app.js` runs `initChapter()` (section gating, quiz mounting, ring updates are all generic).

---

## 3 — Adding a New Chapter (any module)

1. **Data file** `data/<module>-chapterN-data.js` → `window.<global>` (see §5 schema).
   Globals: `chapterNData` (net) · `mathChapterNData` (math) · `dlChapterNData` (logic).
2. **HTML page** — copy any thin renderer shell (§2.2) and adjust the 4 body attributes + script src.
3. **`js/progress.js`** — add the chapter's topic array to `CHAPTER_TOPICS` and the chapter key to
   the right `MODULES.<mod>.chapters` list. (First topic auto-unlocks; nothing else needed.)
4. **`js/app.js`** — add entries to `DATA_GLOBALS` and `PAGE_URLS`.
5. **`js/chapter-page.js`** — add the chapter link to `MODULE_CFG.<mod>.chapters` (nav).
6. **`data/quiz-data.js`** — add `[window.<global>, "<chapterKey>", "<moduleKey>"]` to `SOURCES`,
   plus `quizTopicMeta` entries (one per section) and a `quizChapterMeta` entry.
7. **`exam-mode.html`** — add the data file `<script>` tag (before quiz-data.js).
8. **`index.html`** — add a `.chapter-link[data-chapter=…]` pill in the module card.

Section ID convention: `<chapterKey>-<topic>` (e.g. `dl7-jk-t`, `math6-newton`) — the chapter key
is everything before the first hyphen (`_getTopicQuestions` relies on this).

---

## 4 — Module/Engine Behaviours to Preserve

- `Progress.CHAPTER_TOPICS` is the single source of truth for chapters/topics.
  `MODULES` maps module → chapter list. `FIRST_TOPICS` (first of each chapter) auto-unlock on load.
- Badges: `net_complete`, `math_complete`, `logic_complete` fire when every topic of the module is done.
- Section unlocking is sequential within a chapter (quiz completion unlocks the next section).
- Exam mode filters `window.quizData` by the injected `module` field (`?module=` URL param);
  weak-topic retry is also module-scoped.
- Keyboard: `H` hub · `E` exam (scoped to current module on chapter pages) · `?` help · `ESC` close.

---

## 5 — Data Schema (renderer pages)

```js
window.dlChapter5Data = {
  id: "logic-chapter5",
  key: "dl5",                       // chapter key = topic-ID prefix
  title: "Chapter 5: …",            // used in status bar + complete CTA
  heroTitle: "…", heroDesc: "…",
  statusLabel: "MODULE 5 — …",      // optional; defaults to title
  nextChapter: { label: "…", href: "…" } | null,
  completeText: "…",                // shown in the chapter-complete CTA

  sections: [{
    id: "dl5-and-or",               // must match CHAPTER_TOPICS entry
    title: "…",
    subtitle: "…",                  // shown under the section title
    xpReward: 10,
    accent: "cyan" | "green" | "purple" | "orange",

    content: {
      summary: "One-paragraph HTML explanation.",
      formula: "Unicode formula string | null",   // rendered as highlighted first bullet
      bullets: ["HTML string", …],
      analogy: "Memory hook (HTML ok)"
    },

    workedExample: {                // or an ARRAY of these; optional
      title: "WORKED EXAMPLE",      // optional override
      problem: "Problem statement",
      steps: ["<strong>Step label:</strong> working …", …],   // numbered kbd list
      note: "Exact value / exam tip footer"                    // optional
    },

    extraHtml: "<div>…</div>",      // optional raw block (comparison tables etc.)
    quiz: [ /* §6 */ ]
  }]
};
```

Legacy static pages use the older `content.visual` sim field — see chapter4-data.js.

---

## 6 — Question Types Reference

Shared required fields: `id` (globally unique, `q-<chapterKey>-NNN` or `q-<ch>-hwNN` for
homework-derived), `type`, `question`, `explanation`, `xpReward`.

### 6.1 `mcq` — `options: [4 strings]`, `answer: <zero-based index>`
### 6.2 `truefalse` — `answer: 0` (True) or `1` (False); options auto-generated
### 6.3 `fillblank` — question contains `______`; `answer: "string"` (case-insensitive, partial-friendly)
### 6.4 `match` — `pairs: [{term, definition} ×3–4]`, `answer: [0,1,2,…]` (always sequential)
### 6.5 `calc` — numerical:
```js
{ type: "calc",
  setup: "Given: …\n(multi-line, shown in a box)",
  hint:  "Formula reminder",
  answer: 2.75, tolerance: 0.01,   // |input − answer| ≤ tolerance
  unit: "≈", calcType: "numeric" }
```
**calc rules:** setup must give ALL needed values unless computing them IS the skill being tested;
tolerance 0.01 for 2-d.p., 0.001 for 4-d.p.; explanation shows the full worked calculation.

---

## 7 — Pedagogy Guidelines (all modules)

Section structure (renderer builds this order automatically):
**EXPLAIN** (summary + formula + bullets) → **WORKED EXAMPLE** (numbered steps, exam-style) →
**THINK OF IT LIKE…** (concrete, spatial analogy explaining WHY it works) → **MINI QUIZ** (5–8 questions).

Question distribution per section: ~2 recall + 1–2 procedural (`calc` where numeric) + 2–3 conceptual.
Every `explanation` must: state the correct answer, give the technical reason (formula/law/error order),
and add one sentence of intuition or exam-tactics ("this is the classic trap…").

Exam focus: questions mirror real exam formats — hand iterations (bisection/Newton/power method),
truth-table and timing traces (flip-flops/counters), subnetting/VLSM/fragmentation tables (network),
"compare & choose the method/architecture" discussions. Homework-derived questions are tagged
`[Homework 4]` in the question text.

---

## 8 — Simulation System (network module only)

Math/logic chapters use static worked-example blocks — do NOT add `data-sim-id` there.
Network sims must be registered in `SIM_BUILDERS` in `js/animations.js`.

---

## 9 — Content Map

### net — SCSR2213 (chapters 1–3 deleted)
| Chapter | Data file | Topics |
|---|---|---|
| Ch4 Network Layer: Data Plane | `data/chapter4-data.js` | `ch4-planes ch4-ip-format ch4-fragmentation ch4-addressing ch4-dhcp-nat ch4-ipv6` (+Homework 4 questions `q-ch4-hw01..14`) |
| Ch5 Control Plane | `data/chapter5-data.js` | `ch5-link-state ch5-distance-vector ch5-ospf-bgp ch5-sdn ch5-icmp` (+`q-ch5-hw01..03`) |
| Ch6 Link Layer | `data/chapter6-data.js` | `ch6-*` (5 topics) |
| Ch7 Wireless | `data/chapter7-data.js` | `ch7-*` (5 topics) |
| Ch8 Security | `data/chapter8-data.js` | `ch8-*` (5 topics) |

### math — SECI1113
| Chapter | Data file | Topics |
|---|---|---|
| Ch5 Accuracy & Error | `math-chapter5-data.js` | `math5-error-types math5-abs-rel-error math5-propagation` |
| Ch6 Non-Linear Equations | `math-chapter6-data.js` | `math6-ivt math6-bisection math6-newton math6-secant` |
| Ch7 Eigenvalues | `math-chapter7-data.js` | `math7-definition math7-characteristic math7-power-method` |
| Ch8 Interpolation | `math-chapter8-data.js` | `math8-concept math8-forward math8-backward` |
| Ch9 Numerical Differentiation | `math-chapter9-data.js` | `math9-finite-diff math9-central` |
| Ch10 Numerical Integration | `math-chapter10-data.js` | `math10-trapezoidal math10-simpsons math10-comparison` (static page) |

### logic — SECR1013
| Chapter | Data file | Topics |
|---|---|---|
| Ch5 Combinational Logic | `logic-chapter5-data.js` | `dl5-and-or dl5-universal dl5-dual-symbols dl5-design` |
| Ch6 Combinational Functions | `logic-chapter6-data.js` | `dl6-adders dl6-parity dl6-comparator dl6-decoder-encoder dl6-mux-demux` |
| Ch7 Latches & Flip-Flops | `logic-chapter7-data.js` | `dl7-latches dl7-edge-ff dl7-jk-t dl7-async-timing` |
| Ch8 Counters | `logic-chapter8-data.js` | `dl8-async dl8-sync dl8-modulus dl8-design dl8-shift-registers` |

Source materials live in `SCSR2213-network-communication/`, `SECI1113-computational-mathematic/`,
`SECR1013-digital-logic/` (lecture PDFs + atomic markdown notes) — always ground new content in them.

---

## 10 — CSS Variables & Accents

```css
--accent-cyan: #00f5ff   /* net */      --accent-green: #39ff14  /* math */
--accent-purple: #bf5fff /* logic */    --accent-orange: #ff6b35 /* analogy/warning */
--accent-red: #ff3366    --accent-gold: #ffd700
```
Glass-card modifiers: `glass-card--cyan|--green|--purple|--orange`.

---

## 11 — Naming Conventions

| Type | Convention | Examples |
|---|---|---|
| HTML page | `chapterN.html` / `math-chapterN.html` / `logic-chapterN.html` | |
| Data file | mirrors page name + `-data.js` | `logic-chapter7-data.js` |
| window global | `chapterNData` / `mathChapterNData` / `dlChapterNData` | |
| Chapter key | `chN` / `mathN` / `dlN` | prefix of every topic ID |
| Section ID | `<chapterKey>-<topic>` | `dl8-modulus` |
| Question ID | `q-<chapterKey>-NNN` (or `-hwNN`, `-calc-NNN`) | `q-math7-013` |
