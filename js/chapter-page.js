/* ============================================================
   chapter-page.js — Data-Driven Chapter Page Renderer
   Shared by MathCore & LogicCore chapter pages.

   A chapter HTML page using this renderer needs only:

     <body data-page="chapter"
           data-chapter="dl5"
           data-module="logic"
           data-data-global="dlChapter5Data">
       <div id="chapter-root"></div>
       …script tags…

   Load order:  data file → progress.js → gamification.js →
                quiz.js → animations.js → chapter-page.js → app.js

   The renderer registers its DOMContentLoaded handler BEFORE
   app.js does, so the DOM it builds is fully in place when
   app.js runs initChapter() (section gating, quiz mounting,
   progress rings all work unchanged).

   Data schema additions consumed here (per section):
     subtitle        — string under the section title
     accent          — 'cyan' | 'green' | 'purple' | 'orange'
     content.formula — Unicode formula string (rendered highlighted)
     workedExample   — { problem, steps:[html,…], note } or array of such
     extraHtml       — raw HTML block inserted after worked example
   ============================================================ */

(function () {
  'use strict';

  /* ── Module chrome configuration ────────────────────────── */

  var MODULE_CFG = {
    net: {
      name: 'NetCore', sub: 'Academy', accent: 'var(--accent-cyan)',
      courseLabel: 'SCSR2213 — NETWORK COMMUNICATION',
      logo: '⇄',
      chapters: [
        ['Ch.4', 'chapter4.html'], ['Ch.5', 'chapter5.html'], ['Ch.6', 'chapter6.html'],
        ['Ch.7', 'chapter7.html'], ['Ch.8', 'chapter8.html']
      ],
      exam: 'exam-mode.html?module=net'
    },
    math: {
      name: 'MathCore', sub: 'Academy', accent: 'var(--accent-green)',
      courseLabel: 'SECI1113 — COMPUTATIONAL MATHEMATICS',
      logo: '∫',
      chapters: [
        ['Ch.5', 'math-chapter5.html'], ['Ch.6', 'math-chapter6.html'],
        ['Ch.7', 'math-chapter7.html'], ['Ch.8', 'math-chapter8.html'],
        ['Ch.9', 'math-chapter9.html'], ['Ch.10', 'math-chapter10.html']
      ],
      exam: 'exam-mode.html?module=math'
    },
    logic: {
      name: 'LogicCore', sub: 'Academy', accent: 'var(--accent-purple)',
      courseLabel: 'SECR1013 — DIGITAL LOGIC',
      logo: '⊕',
      chapters: [
        ['Ch.5', 'logic-chapter5.html'], ['Ch.6', 'logic-chapter6.html'],
        ['Ch.7', 'logic-chapter7.html'], ['Ch.8', 'logic-chapter8.html']
      ],
      exam: 'exam-mode.html?module=logic'
    }
  };

  var ACCENT_VARS = {
    cyan: 'var(--accent-cyan)', green: 'var(--accent-green)',
    purple: 'var(--accent-purple)', orange: 'var(--accent-orange)'
  };

  /* ── Style injection (worked example / formula blocks) ──── */

  function injectStyles() {
    if (document.getElementById('chapter-page-styles')) return;
    var s = document.createElement('style');
    s.id = 'chapter-page-styles';
    s.textContent = [
      '.formula-highlight{font-family:var(--font-display,monospace);color:var(--accent-green);',
      ' letter-spacing:.04em;list-style:none;padding:10px 14px;background:rgba(57,255,20,.06);',
      ' border-left:3px solid var(--accent-green);border-radius:4px;margin:8px 0;}',
      '.worked-example{padding:20px 24px;}',
      '.worked-example__eyebrow{display:flex;align-items:center;gap:8px;',
      ' font-family:var(--font-display,monospace);font-size:.68rem;font-weight:700;',
      ' letter-spacing:.14em;color:var(--accent-green);margin-bottom:12px;}',
      '.worked-example__problem{font-size:.95rem;font-weight:600;color:var(--text-primary);',
      ' margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.08);}',
      '.worked-example__note{margin-top:14px;font-size:.8rem;color:var(--text-muted);font-style:italic;}',
      '.cp-table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.8rem;}',
      '.cp-table th,.cp-table td{border:1px solid rgba(255,255,255,.09);padding:6px 10px;text-align:center;}',
      '.cp-table th{font-family:var(--font-display,monospace);font-size:.68rem;letter-spacing:.08em;',
      ' color:var(--text-muted);background:rgba(255,255,255,.03);}',
      '.cp-table td{font-family:var(--font-display,monospace);color:var(--text-primary);}',
      '.cp-table .hl{color:var(--accent-green);font-weight:700;}',
      '.cp-table-wrap{overflow-x:auto;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Tiny HTML helpers ──────────────────────────────────── */

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function eyebrowSVG(color, glyph) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<circle cx="8" cy="8" r="7" stroke="' + color + '" stroke-width="1.5"/>' +
      '<text x="8" y="12" text-anchor="middle" fill="' + color + '" font-size="9" font-family="monospace">' +
      glyph + '</text></svg>';
  }

  /* ── Chrome builders ────────────────────────────────────── */

  function buildHeader(cfg, currentHref) {
    var nav = cfg.chapters.map(function (c) {
      var active = location.pathname.toLowerCase().indexOf(c[1].toLowerCase()) !== -1;
      return '<a href="' + c[1] + '" class="nav-link' + (active ? ' nav-link--active" aria-current="page' : '') + '">' + c[0] + '</a>';
    }).join('');

    return el(
      '<header class="site-header" id="site-header"><div class="header-inner">' +
        '<a href="index.html" class="header-logo" aria-label="Hub dashboard">' +
          '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
            '<circle cx="14" cy="14" r="13" stroke="' + cfg.accent + '" stroke-width="1.5"/>' +
            '<text x="14" y="19" text-anchor="middle" fill="' + cfg.accent + '" font-size="12" font-weight="bold">' + cfg.logo + '</text>' +
          '</svg>' +
          '<span class="logo-text">' + cfg.name + '<span class="logo-accent" style="color:' + cfg.accent + '">' + cfg.sub + '</span></span>' +
        '</a>' +
        '<nav class="header-nav" aria-label="Chapter navigation">' +
          '<a href="index.html" class="nav-link">Hub</a>' + nav +
          '<a href="' + cfg.exam + '" class="nav-link">Exam</a>' +
        '</nav>' +
        '<div class="header-right">' +
          '<div class="rank-badge" id="header-rank">' +
            '<span class="rank-level" id="header-level">Lv.1</span>' +
            '<span class="rank-title" id="header-rank-title"></span>' +
          '</div>' +
          '<div class="xp-bar-wrap" title="XP progress to next level">' +
            '<div class="xp-bar-track"><div class="xp-bar-fill" id="header-xp-fill" style="width:0%"></div></div>' +
            '<span class="xp-label" id="header-xp-label">0 XP</span>' +
          '</div>' +
        '</div>' +
      '</div></header>');
  }

  function buildStatusBar(data, sectionCount) {
    return el(
      '<div class="status-bar" id="status-bar" role="status" aria-live="polite">' +
        '<span class="status-item"><span class="status-dot status-dot--green"></span>' +
          '<span>' + (data.statusLabel || data.title.toUpperCase()) + '</span></span>' +
        '<span class="status-item"><span class="status-dot status-dot--cyan"></span>' +
          '<span id="status-progress-text">0 / ' + sectionCount + ' TOPICS</span></span>' +
        '<span class="status-item status-item--right">' +
          '<span id="status-xp-earned">0 XP EARNED THIS SESSION</span></span>' +
      '</div>');
  }

  function buildHero(cfg, data, key) {
    return el(
      '<div class="chapter-hero glass-card anim-fade-in-up">' +
        '<div class="chapter-hero__meta">' +
          '<span class="section-label">' + cfg.courseLabel + '</span>' +
          '<h1 class="chapter-hero__title">' + data.heroTitle + '</h1>' +
          '<p class="chapter-hero__desc">' + data.heroDesc + '</p>' +
          '<div class="chapter-hero__actions">' +
            '<a href="#' + data.sections[0].id + '" class="btn btn--primary">Start Learning</a>' +
            '<a href="index.html" class="btn btn--ghost">← Hub</a>' +
          '</div>' +
        '</div>' +
        '<div class="chapter-hero__ring" aria-label="Chapter completion progress">' +
          '<svg width="100" height="100" viewBox="0 0 100 100">' +
            '<circle class="ring-track" cx="50" cy="50" r="40"/>' +
            '<circle class="ring-fill ring-fill--cyan" id="' + key + '-progress-ring" cx="50" cy="50" r="40"' +
              ' stroke-dasharray="251.3" stroke-dashoffset="251.3" transform="rotate(-90 50 50)"/>' +
          '</svg>' +
          '<div class="ring-label"><span class="ring-pct" id="' + key + '-ring-pct">0%</span>' +
          '<span class="ring-sub">complete</span></div>' +
        '</div>' +
      '</div>');
  }

  function buildWorkedExample(we, accentVar) {
    var steps = (we.steps || []).map(function (s, i) {
      return '<div class="step-item"><kbd>' + (i + 1) + '</kbd><span>' + s + '</span></div>';
    }).join('');
    return (
      '<div class="worked-example glass-card">' +
        '<div class="worked-example__eyebrow" style="color:' + accentVar + '">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
            '<rect x="2" y="2" width="12" height="12" rx="2" stroke="' + accentVar + '" stroke-width="1.5"/>' +
            '<text x="8" y="11" text-anchor="middle" fill="' + accentVar + '" font-size="8" font-family="monospace">σ</text>' +
          '</svg>' + (we.title || 'WORKED EXAMPLE') +
        '</div>' +
        '<p class="worked-example__problem">' + we.problem + '</p>' +
        '<div class="step-sequence">' + steps + '</div>' +
        (we.note ? '<p class="worked-example__note">' + we.note + '</p>' : '') +
      '</div>');
  }

  function buildSection(sec, idx, total, chapterKey) {
    var accent    = ACCENT_VARS[sec.accent] || ACCENT_VARS.cyan;
    var accentCls = sec.accent ? ' glass-card--' + sec.accent : ' glass-card--cyan';
    var locked    = idx > 0;   // app.js re-evaluates from Progress state on init

    var bullets = (sec.content.bullets || []).map(function (b) {
      return '<li>' + b + '</li>';
    }).join('');
    var formula = sec.content.formula
      ? '<li class="formula-highlight">' + sec.content.formula + '</li>'
      : '';

    var workedHtml = '';
    var wes = sec.workedExample
      ? (Array.isArray(sec.workedExample) ? sec.workedExample : [sec.workedExample])
      : [];
    wes.forEach(function (we) { workedHtml += buildWorkedExample(we, accent); });

    var analogyText = typeof sec.content.analogy === 'string'
      ? sec.content.analogy
      : (sec.content.analogy && sec.content.analogy.html) || '';

    return el(
      '<section class="topic-section' + (locked ? ' topic-section--locked' : '') + '" id="' + sec.id + '"' +
        ' data-section-id="' + sec.id + '" data-section-index="' + idx + '">' +

        '<div class="topic-section__header">' +
          '<div class="topic-section__label">' +
            '<span class="section-label">SECTION ' + (idx + 1) + ' OF ' + total + '</span>' +
            '<div class="topic-badge tag tag--' + (locked ? 'muted' : 'cyan') + '" id="badge-' + sec.id + '">' +
              (locked ? 'LOCKED' : 'UNLOCKED') + '</div>' +
          '</div>' +
          '<h2 class="topic-section__title">' + sec.title + '</h2>' +
          (sec.subtitle ? '<p class="topic-section__subtitle">' + sec.subtitle + '</p>' : '') +
        '</div>' +

        '<div class="section-lock-overlay" aria-hidden="true">' +
          '<svg width="40" height="40" viewBox="0 0 40 40" fill="none">' +
            '<rect x="10" y="18" width="20" height="16" rx="3" stroke="var(--text-muted)" stroke-width="1.5"/>' +
            '<path d="M14 18v-5a6 6 0 0 1 12 0v5" stroke="var(--text-muted)" stroke-width="1.5" fill="none"/>' +
            '<circle cx="20" cy="26" r="2" fill="var(--text-muted)"/>' +
          '</svg>' +
          '<p class="lock-message">Complete <strong>Section ' + idx + '</strong> to unlock</p>' +
        '</div>' +

        '<div class="topic-section__body">' +

          '<div class="learn-block glass-card' + accentCls + '">' +
            '<div class="learn-block__eyebrow">' + eyebrowSVG(accent, 'i') + ' EXPLAIN</div>' +
            '<p class="learn-block__summary">' + sec.content.summary + '</p>' +
            '<ul class="learn-block__bullets">' + formula + bullets + '</ul>' +
          '</div>' +

          workedHtml +
          (sec.extraHtml || '') +

          (analogyText ?
          '<div class="analogy-card glass-card">' +
            '<div class="analogy-card__eyebrow">' +
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
                '<circle cx="8" cy="6" r="4" stroke="var(--accent-orange)" stroke-width="1.5"/>' +
                '<line x1="8" y1="10" x2="8" y2="15" stroke="var(--accent-orange)" stroke-width="1.5"/>' +
              '</svg> THINK OF IT LIKE…</div>' +
            '<p class="analogy-card__text">' + analogyText + '</p>' +
          '</div>' : '') +

          '<div class="quiz-wrapper">' +
            '<div class="quiz-eyebrow">' +
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
                '<rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--accent-purple)" stroke-width="1.5"/>' +
                '<text x="8" y="11" text-anchor="middle" fill="var(--accent-purple)" font-size="9" font-family="monospace">?</text>' +
              '</svg> MINI QUIZ</div>' +
            '<div class="quiz-mount-point" data-quiz-topic="' + sec.id + '" data-chapter="' + chapterKey + '"' +
              ' id="quiz-' + sec.id + '" aria-label="' + sec.title + ' quiz"></div>' +
          '</div>' +

        '</div>' +
      '</section>');
  }

  function buildCompleteCTA(data, key) {
    var next = data.nextChapter;
    return el(
      '<div class="chapter-complete-cta glass-card" id="' + key + '-complete-cta" aria-hidden="true">' +
        '<div class="chapter-complete-cta__inner">' +
          '<div class="chapter-complete-cta__icon" aria-hidden="true">' +
            '<svg width="48" height="48" viewBox="0 0 48 48" fill="none">' +
              '<circle cx="24" cy="24" r="22" stroke="var(--accent-green)" stroke-width="2"/>' +
              '<polyline points="14,25 21,32 34,18" stroke="var(--accent-green)" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
            '</svg></div>' +
          '<h2 class="chapter-complete-cta__title">' + data.title + ' Complete!</h2>' +
          '<p class="chapter-complete-cta__text">' + (data.completeText || 'All topics mastered. Test yourself in Exam Mode.') + '</p>' +
          '<div class="chapter-complete-cta__actions">' +
            (next ? '<a href="' + next.href + '" class="btn btn--primary btn--lg">' + next.label + ' →</a>' : '') +
            '<a href="' + (MODULE_CFG[document.body.dataset.module] || MODULE_CFG.net).exam +
              '" class="btn ' + (next ? 'btn--ghost' : 'btn--primary btn--lg') + '">Test Yourself → Exam Mode</a>' +
          '</div>' +
        '</div>' +
      '</div>');
  }

  /* ── Boot ───────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    var ds   = document.body.dataset;
    var key  = ds.chapter;
    var cfg  = MODULE_CFG[ds.module];
    var data = window[ds.dataGlobal];
    var root = document.getElementById('chapter-root');

    if (!key || !cfg || !data || !root) {
      console.error('[chapter-page] Missing config: chapter=', key, 'module=', ds.module,
        'dataGlobal=', ds.dataGlobal, 'root=', !!root);
      return;
    }

    injectStyles();

    var frag = document.createDocumentFragment();
    frag.appendChild(buildHeader(cfg));
    frag.appendChild(buildStatusBar(data, data.sections.length));

    var main = el('<main class="page-wrapper" id="main-content"></main>');
    main.appendChild(buildHero(cfg, data, key));
    data.sections.forEach(function (sec, i) {
      main.appendChild(buildSection(sec, i, data.sections.length, key));
    });
    main.appendChild(buildCompleteCTA(data, key));
    frag.appendChild(main);

    // Gamification / app.js shell elements
    frag.appendChild(el('<div id="xp-toast-container" aria-live="assertive" aria-atomic="true"></div>'));
    frag.appendChild(el('<div id="level-up-overlay" class="level-up-overlay" aria-hidden="true" role="dialog" aria-label="Level up notification"></div>'));

    root.appendChild(frag);

    // Reveal the chapter-complete CTA once every topic is done
    function checkComplete() {
      if (!window.Progress) return;
      var topics = Progress.CHAPTER_TOPICS[key] || [];
      var done = topics.every(function (t) { return Progress.isTopicComplete(t); });
      var cta = document.getElementById(key + '-complete-cta');
      if (cta) cta.setAttribute('aria-hidden', done ? 'false' : 'true');
    }
    window.addEventListener('progress:topic', checkComplete);
    checkComplete();
  });

})();
