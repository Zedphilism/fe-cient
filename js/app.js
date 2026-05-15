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
    CH1:     'chapter1',
    CH2:     'chapter2',
    EXAM:    'exam'
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
  let _modalStack = [];     // open modal IDs for ESC handling

  /* ----------------------------------------------------------
     PAGE DETECTION
  ---------------------------------------------------------- */

  /** Read the data-page attribute from <body> to identify the page */
  function detectPage() {
    return document.body.dataset.page || _inferPage();
  }

  /** Fallback: infer page from URL pathname */
  function _inferPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('chapter1')) return PAGES.CH1;
    if (path.includes('chapter2')) return PAGES.CH2;
    if (path.includes('exam'))     return PAGES.EXAM;
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

  /** Initialise the index / dashboard page */
  function initIndex() {
    _refreshDashboardStats();

    // "Continue Studying" routing
    const btn = document.getElementById('btnContinue');
    if (btn) {
      const state    = Progress.load();
      const ch1Done  = Progress.CH1_TOPICS.every(id => state.completedTopics.includes(id));
      btn.href       = ch1Done ? 'chapter2.html' : 'chapter1.html';
    }

    // Weak topics button state
    const weakBtn  = document.getElementById('btnWeakTopics');
    const weakLbl  = document.getElementById('weakTopicsLabel');
    if (weakBtn && weakLbl) {
      const wc = Progress.load().weakTopics.length;
      weakLbl.textContent = wc > 0
        ? `Retry ${wc} Weak Topic${wc !== 1 ? 's' : ''}`
        : 'View Weak Topics';
      weakBtn.href = wc > 0 ? 'exam-mode.html?mode=retry' : '#';
      if (wc === 0) {
        weakBtn.addEventListener('click', e => e.preventDefault());
      }
    }

    // Animate stats counters on load
    _animateDashboardCounters();
  }

  /** Refresh all stat values on the dashboard */
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
    _setText('statusTopics', `${s.topicsDone}/16 TOPICS LOADED`);
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

    // Chapter progress rings
    _animateRing('ch1Ring', s.ch1Pct);
    _animateRing('ch2Ring', s.ch2Pct);
    _setText('ch1Pct', s.ch1Pct + '%');
    _setText('ch2Pct', s.ch2Pct + '%');

    // Topic pills
    const state = Progress.load();
    document.querySelectorAll('.topic-pill[data-id]').forEach(pill => {
      pill.classList.toggle('done', state.completedTopics.includes(pill.dataset.id));
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
    document.querySelectorAll('.quiz-mount[data-topic-id]').forEach(mount => {
      const topicId = mount.dataset.topicId;

      // Build quiz from inline data (chapter pages embed their data)
      const questions = _getTopicQuestions(topicId);
      if (!questions || !questions.length) return;

      if (window.Quiz) {
        Quiz.mount(mount, questions, {
          topicId,
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
    const sequence = chapterKey === 'ch1'
      ? Progress.CH1_TOPICS
      : Progress.CH2_TOPICS;

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
    const pct  = Progress.getChapterProgress(chapterKey);
    const ring = document.getElementById(chapterKey + 'ProgressRing');
    const lbl  = document.getElementById(chapterKey + 'ProgressPct');
    if (ring) _animateRing(ring.id, pct);
    if (lbl)  lbl.textContent = pct + '%';
  }

  /** Look up questions for a topic from the globally loaded chapter data */
  function _getTopicQuestions(topicId) {
    const ch = topicId.startsWith('ch1') ? 'chapter1Data' : 'chapter2Data';
    const data = window[ch];
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

    // H — go to home / dashboard
    if (e.key === 'h' || e.key === 'H') {
      if (_page !== PAGES.INDEX) navigate('index.html');
      return;
    }

    // 1 — chapter 1
    if (e.key === '1' && _page !== PAGES.CH1) {
      navigate('chapter1.html');
      return;
    }

    // 2 — chapter 2
    if (e.key === '2' && _page !== PAGES.CH2) {
      navigate('chapter2.html');
      return;
    }

    // E — exam mode
    if ((e.key === 'e' || e.key === 'E') && _page !== PAGES.EXAM) {
      navigate('exam-mode.html');
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
      { key: 'H',   desc: 'Go to Dashboard' },
      { key: '1',   desc: 'Go to Chapter 1' },
      { key: '2',   desc: 'Go to Chapter 2' },
      { key: 'E',   desc: 'Enter Exam Mode' },
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
    s.id = 's-js-styles';
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
      case PAGES.INDEX: initIndex();          break;
      case PAGES.CH1:   initChapter('ch1');   break;
      case PAGES.CH2:   initChapter('ch2');   break;
      case PAGES.EXAM:  /* exam-mode.js handles its own init */ break;
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
