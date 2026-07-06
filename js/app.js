/* ============================================================
   app.js — Application Bootstrap & Global Orchestration
   NetCore Academy

   Responsibilities:
     1. Detect current page and route to its init function
     2. Run common startup (streak, header sync, toast shell)
     3. Attach global event delegation (keyboard, nav, modals)
     4. Expose App.navigate() for soft page transitions

   Depends on: progress.js, gamification.js  (load order matters)
   quiz.js and animations.js load on chapter/exam pages only.

   Load order in HTML:
     progress.js → gamification.js → quiz.js → animations.js → app.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     PAGE IDENTIFIERS
     Detected from <body data-page="..."> set in each HTML file.
  ---------------------------------------------------------- */

  const PAGES = {
    INDEX:   'index',
    EXAM:    'exam',
    CHAPTER: 'chapter'
  };

  /** Chapter key → window data global name (all 15 chapters) */
  const DATA_GLOBALS = {
    ch4: 'chapter4Data', ch5: 'chapter5Data', ch6: 'chapter6Data',
    ch7: 'chapter7Data', ch8: 'chapter8Data',
    math5: 'mathChapter5Data', math6: 'mathChapter6Data', math7: 'mathChapter7Data',
    math8: 'mathChapter8Data', math9: 'mathChapter9Data', math10: 'mathChapter10Data',
    dl5: 'dlChapter5Data', dl6: 'dlChapter6Data', dl7: 'dlChapter7Data', dl8: 'dlChapter8Data'
  };

  /** Chapter key → page URL */
  const PAGE_URLS = {
    ch4: 'chapter4.html', ch5: 'chapter5.html', ch6: 'chapter6.html',
    ch7: 'chapter7.html', ch8: 'chapter8.html',
    math5: 'math-chapter5.html', math6: 'math-chapter6.html', math7: 'math-chapter7.html',
    math8: 'math-chapter8.html', math9: 'math-chapter9.html', math10: 'math-chapter10.html',
    dl5: 'logic-chapter5.html', dl6: 'logic-chapter6.html',
    dl7: 'logic-chapter7.html', dl8: 'logic-chapter8.html'
  };

  /* ----------------------------------------------------------
     TEXT CONSTANTS
  ---------------------------------------------------------- */

  const TEXT = {
    streak_restored:  'Streak kept alive!',
    streak_broken:    'Streak reset — start fresh today',
    streak_new:       'First session logged!',
    welcome_back:     'Welcome back, ',
    keyboard_hint:    'Press ? for keyboard shortcuts',
    shortcut_title:   'Keyboard Shortcuts',
    reset_confirm:    'Reset ALL progress? This cannot be undone.',
    offline_warn:     'You appear to be offline. Progress saves locally.'
  };

  /* ----------------------------------------------------------
     CACHED DOM REFERENCES (set on DOMContentLoaded)
  ---------------------------------------------------------- */

  let _page       = null;   // current PAGES value
  let _chapterKey = null;   // e.g. 'ch4', 'math7', 'dl5' when on a chapter page
  let _modalStack = [];     // open modal IDs for ESC handling

  /* ----------------------------------------------------------
     PAGE DETECTION
  ---------------------------------------------------------- */

  /**
   * Identify the current page and (if a chapter page) the chapter key.
   * Chapter pages declare themselves in one of two ways:
   *   <body data-page="chapter" data-chapter="dl5">    (renderer pages)
   *   <body data-page="chapter4">                      (legacy static pages)
   */
  function detectPage() {
    const ds = document.body.dataset;

    if (ds.chapter && Progress.CHAPTER_TOPICS[ds.chapter]) {
      _chapterKey = ds.chapter;
      return PAGES.CHAPTER;
    }

    const dp = (ds.page || '').toLowerCase();
    if (dp === 'exam' || dp === 'index') return dp;

    // Legacy static pages: data-page="chapter4" / "math-chapter10"
    let m = dp.match(/^chapter(\d+)$/);
    if (m && Progress.CHAPTER_TOPICS['ch' + m[1]]) {
      _chapterKey = 'ch' + m[1];
      return PAGES.CHAPTER;
    }
    m = dp.match(/^math-chapter(\d+)$/);
    if (m && Progress.CHAPTER_TOPICS['math' + m[1]]) {
      _chapterKey = 'math' + m[1];
      return PAGES.CHAPTER;
    }

    // Fallback: infer from URL
    const path = window.location.pathname.toLowerCase();
    if (path.includes('exam')) return PAGES.EXAM;
    const pm = path.match(/(math-|logic-)?chapter(\d+)/);
    if (pm) {
      const key = pm[1] === 'math-' ? 'math' + pm[2]
                : pm[1] === 'logic-' ? 'dl' + pm[2]
                : 'ch' + pm[2];
      if (Progress.CHAPTER_TOPICS[key]) {
        _chapterKey = key;
        return PAGES.CHAPTER;
      }
    }
    return PAGES.INDEX;
  }

  /* ----------------------------------------------------------
     COMMON STARTUP (runs on every page)
  ---------------------------------------------------------- */

  /** Initialise modules shared by all pages */
  function commonInit() {
    // Gamification sets up header sync + progress event listeners
    if (window.Gamification) Gamification.init();

    // Check / update today's streak (fires once per calendar day)
    _handleStreak();

    // Wire global keyboard listeners
    _attachKeyboardListeners();

    // Wire global modal close (ESC key, overlay click)
    _attachModalListeners();

    // Show offline warning if needed
    if (!navigator.onLine) _showOfflineWarning();
    window.addEventListener('offline', _showOfflineWarning);

    // Inject reset-progress dev hook (only when ?dev=1 in URL)
    if (new URLSearchParams(window.location.search).get('dev') === '1') {
      _injectDevResetButton();
    }
  }

  /** Check streak status and optionally show a toast */
  function _handleStreak() {
    const result = Progress.updateStreak();

    if (result.streakUpdated) {
      const { streak, broken } = result;
      let msg;
      if (streak === 1 && broken)           msg = TEXT.streak_broken;
      else if (streak === 1 && !broken)     msg = TEXT.streak_new;
      else                                  msg = TEXT.streak_restored + ' 🔥 ' + streak + ' days';

      if (window.Gamification && result.awarded > 0) {
        Gamification.showXPToast(result.awarded, msg);
      }
    }

    // Refresh streak UI if on index
    if (_page === PAGES.INDEX) {
      const grid = document.getElementById('streakGrid');
      if (grid && window.Gamification) {
        const state = Progress.load();
        Gamification.renderStreakGrid(grid, state.lastStudied, state.streak);
      }
      const motivEl = document.getElementById('streakMotivator');
      if (motivEl) {
        const s = Progress.load();
        const msgs = [
          'Begin your first session to start the streak.',
          'First session logged. Come back tomorrow!',
          'Two days strong — keep the signal alive.',
          '3-day streak! Consistency is power.',
          'Four days — momentum is building.',
          'Five days of solid uptime.',
          'Six days — one more for the badge!',
          '7-day streak! Uptime Champion unlocked! 🏆'
        ];
        motivEl.textContent = msgs[Math.min(s.streak, msgs.length - 1)];
      }
    }
  }

  /* ----------------------------------------------------------
     PAGE INIT FUNCTIONS
  ---------------------------------------------------------- */

  /** Initialise the index / hub dashboard page */
  function initIndex() {
    _refreshDashboardStats();
    _animateDashboardCounters();
  }

  /** Refresh all stat values on the hub dashboard */
  function _refreshDashboardStats() {
    const s = Progress.getSummary();

    _setText('statXP',     s.xp.toLocaleString());
    _setText('statStreak', s.streak);
    _setText('statTopics', s.topicsDone);
    _setText('statBadges', s.badgeCount);
    _setText('streakCount', s.streak);

    const streakSubEl = document.getElementById('statStreakSub');
    if (streakSubEl) {
      streakSubEl.textContent = s.streak > 0
        ? `${s.streak} day${s.streak !== 1 ? 's' : ''} in a row`
        : 'Start studying today';
    }

    // Status bar
    const totalTopics = Object.keys(Progress.CHAPTER_TOPICS)
      .reduce((n, ch) => n + Progress.CHAPTER_TOPICS[ch].length, 0);
    _setText('statusTopics', `${s.topicsDone}/${totalTopics} TOPICS`);
    _setText('statusWeak',   `${s.weakCount} WEAK TOPIC${s.weakCount !== 1 ? 'S' : ''}`);

    const weakDot = document.getElementById('weakDot');
    if (weakDot) weakDot.className = s.weakCount > 0 ? 'status-dot warn' : 'status-dot';

    const examHistory = Progress.load().examHistory;
    _setText('statusExam', examHistory.length > 0
      ? `${examHistory.length} EXAM${examHistory.length !== 1 ? 'S' : ''} TAKEN`
      : 'NO EXAM HISTORY');

    const dateEl = document.getElementById('statusDate');
    if (dateEl) {
      dateEl.textContent = new Date()
        .toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })
        .toUpperCase();
    }

    // ── Per-module cards ──
    Object.keys(Progress.MODULES).forEach(function (modKey) {
      const mp = Progress.getModuleProgress(modKey);

      const fill = document.getElementById('mod-' + modKey + '-fill');
      if (fill) fill.style.width = mp.pct + '%';
      _setText('mod-' + modKey + '-pct', mp.pct + '%');
      _setText('mod-' + modKey + '-topics', mp.done + ' / ' + mp.total + ' topics');

      // Continue button → first chapter that isn't 100% complete
      const btn = document.getElementById('btn-continue-' + modKey);
      if (btn) {
        const chapters = Progress.MODULES[modKey].chapters;
        const target = chapters.find(ch => Progress.getChapterProgress(ch) < 100) || chapters[0];
        btn.href = PAGE_URLS[target] || '#';
      }
    });

    // Per-chapter link badges: .chapter-link[data-chapter]
    document.querySelectorAll('.chapter-link[data-chapter]').forEach(link => {
      const pct = Progress.getChapterProgress(link.dataset.chapter);
      link.classList.toggle('chapter-link--done', pct === 100);
      const pctEl = link.querySelector('.chapter-link__pct');
      if (pctEl) pctEl.textContent = pct > 0 ? pct + '%' : '';
    });

    // Recent achievements
    if (window.Gamification) Gamification.renderRecentAchievements();
  }

  /** Animate stat number counters on page load (dashboard only) */
  function _animateDashboardCounters() {
    if (!window.Gamification) return;
    const s = Progress.getSummary();

    [
      ['statXP',     s.xp],
      ['statStreak', s.streak],
      ['statTopics', s.topicsDone],
      ['statBadges', s.badgeCount]
    ].forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el && val > 0) Gamification.animateCounter(el, 0, val, 800);
    });
  }

  /** Initialise a chapter page (shared logic for ch1 and ch2) */
  function initChapter(chapterKey) {
    // Chapter pages build their own section logic via inline scripts.
    // app.js provides shared services: section unlock gating,
    // simulation mount, and quiz completion callbacks.
    _setupSectionUnlockGating();
    _setupSimulationMountPoints();
    _setupChapterQuizCallbacks(chapterKey);
    _setupSectionProgressMarkers();
    _refreshChapterProgress(chapterKey);
  }

  /** Lock/unlock sections based on progress state */
  function _setupSectionUnlockGating() {
    document.querySelectorAll('.topic-section[data-section-id]').forEach(sec => {
      const id       = sec.dataset.sectionId;
      const unlocked = Progress.isSectionUnlocked(id);
      sec.classList.toggle('topic-section--locked', !unlocked);
      
      const badge = sec.querySelector('.topic-badge');
      if (badge) {
        if (unlocked) {
          badge.textContent = 'UNLOCKED';
          badge.className = 'topic-badge tag tag--cyan';
        } else {
          badge.textContent = 'LOCKED';
          badge.className = 'topic-badge tag tag--muted';
        }
      }
    });
  }

  /** Auto-mount simulations when their containers enter the viewport */
  function _setupSimulationMountPoints() {
    if (!window.Animations) return;

    const mounts = document.querySelectorAll('[data-sim-id]');
    if (!mounts.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const simId = entry.target.dataset.simId;
        if (!entry.target.dataset.simMounted) {
          entry.target.dataset.simMounted = '1';
          Animations.runSimulation(simId, entry.target);
        }
      });
    }, { threshold: 0.3 });

    mounts.forEach(el => observer.observe(el));
  }

  /** Wire quiz completion → topic unlock → next section reveal */
  function _setupChapterQuizCallbacks(chapterKey) {
    // Support both selector conventions used across chapter pages.
    // Guard: skip containers already mounted by inline page scripts (data-quiz-mounted).
    const mounts = Array.from(document.querySelectorAll(
      '.quiz-mount[data-topic-id]:not([data-quiz-mounted]), .quiz-mount-point[data-quiz-topic]:not([data-quiz-mounted])'
    ));

    mounts.forEach(mount => {
      const topicId = mount.dataset.topicId || mount.dataset.quizTopic;
      if (!topicId) return;

      const questions = _getTopicQuestions(topicId);
      if (!questions || !questions.length) return;

      if (window.Quiz) {
        mount.dataset.quizMounted = '1';
        Quiz.mount(mount, questions, {
          topicId,
          chapter: chapterKey,
          onComplete: result => _onTopicQuizComplete(topicId, result, chapterKey)
        });
      }
    });
  }

  /** Called when a topic's quiz is finished */
  function _onTopicQuizComplete(topicId, result, chapterKey) {
    // Mark topic complete and award XP
    Progress.completeTopic(topicId);

    // Flash the parent section card
    const section = document.querySelector(`[data-section-id="${topicId}"]`);
    if (section && window.Gamification) {
      Gamification.flashXP(section);
      section.classList.add('completed');
    }

    // Unlock next section
    _unlockNextSection(topicId, chapterKey);

    // Refresh chapter progress ring in header area (if present)
    _refreshChapterProgress(chapterKey);
  }

  /** Unlock the section that follows topicId in chapter sequence */
  function _unlockNextSection(completedId, chapterKey) {
    const sequence = Progress.CHAPTER_TOPICS[chapterKey] || [];

    const idx  = sequence.indexOf(completedId);
    const next = sequence[idx + 1];
    if (!next) return;

    Progress.unlockSection(next);

    const nextSec = document.querySelector(`[data-section-id="${next}"]`);
    if (nextSec) {
      nextSec.classList.remove('topic-section--locked');
      const badge = nextSec.querySelector('.topic-badge');
      if (badge) {
        badge.textContent = 'UNLOCKED';
        badge.className = 'topic-badge tag tag--cyan';
      }
      nextSec.classList.add('anim-fade-in-up');
      nextSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /** Mark sections that have already been completed visually */
  function _setupSectionProgressMarkers() {
    const state = Progress.load();
    document.querySelectorAll('.topic-section[data-section-id]').forEach(sec => {
      if (state.completedTopics.includes(sec.dataset.sectionId)) {
        sec.classList.add('completed');
      }
    });
  }

  /** Refresh the chapter progress indicators in the chapter page header */
  function _refreshChapterProgress(chapterKey) {
    const pct = Progress.getChapterProgress(chapterKey);
    // HTML uses hyphenated IDs: ch1-progress-ring / ch1-ring-pct
    const ringId = chapterKey + '-progress-ring';
    const lblId  = chapterKey + '-ring-pct';
    const ring   = document.getElementById(ringId);
    const lbl    = document.getElementById(lblId);
    if (ring) _animateRing(ringId, pct);
    if (lbl)  lbl.textContent = pct + '%';

    // Also update status bar topic counter
    const statusEl = document.getElementById('status-progress-text');
    if (statusEl) {
      const topics = Progress.CHAPTER_TOPICS[chapterKey] || [];
      const state  = Progress.load();
      const done   = topics.filter(id => state.completedTopics.includes(id)).length;
      statusEl.textContent = done + ' / ' + topics.length + ' TOPICS';
    }
  }

  /** Look up questions for a topic from the globally loaded chapter data */
  function _getTopicQuestions(topicId) {
    const prefix = topicId.split('-')[0]; // 'ch4', 'math7', 'dl5', …
    const data = window[DATA_GLOBALS[prefix]];
    if (!data) return [];
    const section = (data.sections || []).find(s => s.id === topicId);
    return section ? (section.quiz || []) : [];
  }

  /* ----------------------------------------------------------
     RING ANIMATION HELPER
  ---------------------------------------------------------- */

  /** Animate an SVG progress ring to the target percent */
  function _animateRing(ringId, pct) {
    const ring = document.getElementById(ringId);
    if (!ring) return;
    const circ   = 2 * Math.PI * 40;  // r=40
    const offset = circ * (1 - pct / 100);
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 300);
  }

  /* ----------------------------------------------------------
     OFFLINE WARNING
  ---------------------------------------------------------- */

  /** Show a subtle offline banner */
  function _showOfflineWarning() {
    if (document.getElementById('offlineBanner')) return;
    const banner = document.createElement('div');
    banner.id    = 'offlineBanner';
    banner.style.cssText = `
      position:fixed; bottom:0; left:0; right:0;
      background:rgba(255,107,53,0.12); border-top:1px solid rgba(255,107,53,0.3);
      padding:8px 24px; font-family:var(--font-display); font-size:0.68rem;
      letter-spacing:0.1em; color:var(--accent-orange); text-align:center; z-index:990;`;
    banner.textContent = TEXT.offline_warn;
    document.body.appendChild(banner);
    window.addEventListener('online', () => banner.remove(), { once: true });
  }

  /* ----------------------------------------------------------
     KEYBOARD SHORTCUTS
  ---------------------------------------------------------- */

  /** Attach global keyboard shortcuts */
  function _attachKeyboardListeners() {
    document.addEventListener('keydown', _handleKeyDown);
  }

  /** Global keydown handler — uses event delegation pattern */
  function _handleKeyDown(e) {
    // Ignore when focus is inside an input / textarea
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    // ESC — close topmost modal
    if (e.key === 'Escape') {
      _closeTopmostModal();
      return;
    }

    // ? — show shortcuts help modal
    if (e.key === '?') {
      _showShortcutsModal();
      return;
    }

    // H — go to home / hub dashboard
    if (e.key === 'h' || e.key === 'H') {
      if (_page !== PAGES.INDEX) navigate('index.html');
      return;
    }

    // E — exam mode (scoped to the current module when on a chapter page)
    if ((e.key === 'e' || e.key === 'E') && _page !== PAGES.EXAM) {
      let url = 'exam-mode.html';
      if (_chapterKey) {
        const modKey = Object.keys(Progress.MODULES).find(m =>
          Progress.MODULES[m].chapters.includes(_chapterKey));
        if (modKey) url += '?module=' + modKey;
      }
      navigate(url);
      return;
    }
  }

  /* ----------------------------------------------------------
     MODAL MANAGEMENT (global ESC / backdrop close)
  ---------------------------------------------------------- */

  /** Register an open modal so ESC can close it */
  function openModal(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    overlay.classList.add('open');
    _modalStack.push(modalId);
    document.body.style.overflow = 'hidden';
  }

  /** Close a specific modal by ID */
  function closeModal(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    overlay.classList.remove('open');
    _modalStack = _modalStack.filter(id => id !== modalId);
    if (!_modalStack.length) document.body.style.overflow = '';
  }

  /** Close the most recently opened modal */
  function _closeTopmostModal() {
    if (!_modalStack.length) return;
    closeModal(_modalStack[_modalStack.length - 1]);
  }

  /** Attach backdrop-click close to all modal overlays on the page */
  function _attachModalListeners() {
    // Dynamic modals created by _showShortcutsModal use .modal-overlay / .modal-close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) closeModal(overlay.id);
      });
    });

    // Static modals in chapter HTML use BEM: .modal / .modal__close / [data-modal-close]
    document.querySelectorAll('.modal__backdrop').forEach(backdrop => {
      const modal = backdrop.closest('.modal');
      if (modal) {
        backdrop.addEventListener('click', () => closeModal(modal.id));
      }
    });

    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
    });
  }

  /* ----------------------------------------------------------
     KEYBOARD SHORTCUTS MODAL
  ---------------------------------------------------------- */

  /** Build and show the keyboard shortcuts help modal */
  function _showShortcutsModal() {
    const MODAL_ID = 'shortcutsModal';
    if (document.getElementById(MODAL_ID)) {
      openModal(MODAL_ID);
      return;
    }

    const shortcuts = [
      { key: '?',   desc: 'Show this help panel' },
      { key: 'H',   desc: 'Go to Hub Dashboard' },
      { key: 'E',   desc: 'Exam Mode (current module)' },
      { key: 'ESC', desc: 'Close modal / overlay' }
    ];

    const rows = shortcuts.map(s =>
      `<tr>
         <td><kbd class="shortcut-key">${s.key}</kbd></td>
         <td style="padding-left:14px;font-size:0.8rem;color:var(--text-muted);">${s.desc}</td>
       </tr>`
    ).join('');

    const overlay = document.createElement('div');
    overlay.id        = MODAL_ID;
    overlay.className = 'modal-overlay centered';
    overlay.innerHTML = `
      <div class="modal" style="max-width:380px;">
        <div class="modal-handle"></div>
        <div class="modal-header">
          <span class="modal-title">${TEXT.shortcut_title}</span>
          <button class="modal-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <table style="width:100%;border-collapse:collapse;">
            ${rows}
          </table>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    // Wire close button and backdrop
    overlay.querySelector('.modal-close').addEventListener('click', () => closeModal(MODAL_ID));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(MODAL_ID); });

    openModal(MODAL_ID);
  }

  /* ----------------------------------------------------------
     NAVIGATION
  ---------------------------------------------------------- */

  /**
   * Soft navigate to another page with a brief fade-out transition.
   * href: relative path e.g. 'chapter1.html'
   */
  function navigate(href) {
    document.body.style.transition = 'opacity 0.25s ease';
    document.body.style.opacity    = '0';
    setTimeout(() => { window.location.href = href; }, 260);
  }

  /* ----------------------------------------------------------
     UTILITY
  ---------------------------------------------------------- */

  /** Set textContent of an element by ID (no-op if missing) */
  function _setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ----------------------------------------------------------
     DEV TOOLS
  ---------------------------------------------------------- */

  /** Inject a small reset-progress button for development use */
  function _injectDevResetButton() {
    const btn = document.createElement('button');
    btn.textContent = '⚠ DEV: Reset Progress';
    btn.style.cssText = `
      position:fixed; bottom:16px; left:16px; z-index:9999;
      background:rgba(255,51,102,0.12); border:1px solid rgba(255,51,102,0.4);
      color:var(--accent-red); font-family:var(--font-display); font-size:0.65rem;
      letter-spacing:0.1em; padding:6px 12px; border-radius:var(--radius-sm);
      cursor:pointer;`;
    btn.addEventListener('click', () => {
      if (window.confirm(TEXT.reset_confirm)) {
        Progress.reset();
        window.location.reload();
      }
    });
    document.body.appendChild(btn);
  }

  /* ----------------------------------------------------------
     SHARED STYLE INJECTION (shortcut key style)
  ---------------------------------------------------------- */

  (function injectStyles() {
    if (document.getElementById('app-js-styles')) return;
    const s = document.createElement('style');
    s.id = 'app-js-styles';
    s.textContent = `
      kbd.shortcut-key {
        display: inline-block;
        background: var(--bg-secondary);
        border: 1px solid var(--border-glass);
        border-radius: var(--radius-xs);
        padding: 3px 8px;
        font-family: var(--font-display);
        font-size: 0.7rem;
        color: var(--accent-cyan);
        min-width: 36px;
        text-align: center;
        box-shadow: 0 2px 0 var(--border-glass);
      }
      .topic-section.completed {
        border-color: rgba(0, 255, 136, 0.2);
      }
      .topic-section.completed .topic-title::after {
        content: ' ✓';
        color: var(--accent-green);
        font-size: 0.85em;
      }
      body.fade-out { opacity: 0; transition: opacity 0.25s ease; }
    `;
    document.head.appendChild(s);
  })();

  /* ----------------------------------------------------------
     BOOT — DOMContentLoaded
  ---------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    _page = detectPage();

    // Fade in on page load
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { document.body.style.opacity = '1'; });
    });

    // Common startup (all pages)
    commonInit();

    // Page-specific startup
    switch (_page) {
      case PAGES.INDEX:   initIndex();               break;
      case PAGES.CHAPTER: initChapter(_chapterKey);  break;
      case PAGES.EXAM:    /* exam-mode.js handles its own init */ break;
    }
  });

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */

  window.App = {
    navigate,
    openModal,
    closeModal,
    getCurrentPage: () => _page,

    // Expose for chapter pages to call after rendering content
    refreshChapterProgress: _refreshChapterProgress,
    onTopicQuizComplete:    _onTopicQuizComplete,
    unlockNextSection:      _unlockNextSection
  };

})();
