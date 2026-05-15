/* ============================================================
   gamification.js — Badge UI, XP Toasts, Level-Up Overlay,
                     Header Sync, Achievement Grid
   NetCore Academy

   Depends on: progress.js (must load first)

   Listens to progress:* events and drives all gamification UI.
   Does NOT write state — calls Progress.* for all mutations.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     UI TEXT CONSTANTS
  ---------------------------------------------------------- */

  const TEXT = {
    xp_label:        'XP GAINED',
    level_up_title:  'RANK UPGRADE',
    level_up_sub:    'You have been promoted to',
    level_up_dismiss:'CONTINUE MISSION',
    badge_unlocked:  'BADGE UNLOCKED',
    streak_bonus:    'STREAK BONUS',
    max_level:       'MAX LEVEL',
    to_next_level:   'to next level',
    tap_to_dismiss:  'Tap anywhere to dismiss'
  };

  /* ----------------------------------------------------------
     MODULE STATE
  ---------------------------------------------------------- */

  // DOM references cached on init
  let _els = {};

  // Queue for stacked toasts (prevents overlapping)
  let _toastQueue = [];
  let _toastBusy  = false;

  // Prevent level-up overlay stacking
  let _levelUpVisible = false;

  /* ----------------------------------------------------------
     INTERNAL: DOM HELPERS
  ---------------------------------------------------------- */

  /** Create an element with optional classes and inner HTML */
  function el(tag, classes, html) {
    const e = document.createElement(tag);
    if (classes) e.className = classes;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /** Cache all header elements present on the page */
  function cacheHeaderEls() {
    _els = {
      rankTitle:  document.getElementById('rankTitle'),
      levelNum:   document.getElementById('levelNumber'),
      xpValue:    document.getElementById('xpValue'),
      xpToNext:   document.getElementById('xpToNext'),
      xpBarFill:  document.getElementById('xpBarFill')
    };
  }

  /* ----------------------------------------------------------
     HEADER SYNC
     Called after any XP change to keep every page's header current
  ---------------------------------------------------------- */

  /** Update the header XP bar, level badge, and rank title */
  function syncHeader() {
    const s = Progress.getSummary();
    if (!_els.rankTitle) cacheHeaderEls();

    if (_els.rankTitle)  _els.rankTitle.textContent  = s.rank;
    if (_els.levelNum)   _els.levelNum.textContent   = s.level;
    if (_els.xpValue)    _els.xpValue.textContent    = s.xp.toLocaleString() + ' XP';

    if (_els.xpToNext) {
      _els.xpToNext.textContent = s.level < 10
        ? s.xpToNext.toLocaleString() + ' ' + TEXT.to_next_level
        : TEXT.max_level;
    }

    if (_els.xpBarFill) {
      // rAF so the transition fires on every update, not just initial
      requestAnimationFrame(() => {
        _els.xpBarFill.style.width = s.levelPct + '%';
      });
    }
  }

  /* ----------------------------------------------------------
     XP TOAST
  ---------------------------------------------------------- */

  /** Ensure the shared XP toast element exists in the DOM */
  function ensureToastEl() {
    if (document.getElementById('xpToast')) return;

    const toast = el('div', 'xp-toast');
    toast.id = 'xpToast';
    toast.innerHTML = `
      <span class="xp-toast-icon">⚡</span>
      <div class="xp-toast-body">
        <span class="xp-toast-amount" id="xpToastAmount"></span>
        <span class="xp-toast-reason" id="xpToastReason"></span>
      </div>`;
    document.body.appendChild(toast);
  }

  /** Display a single XP toast entry from the queue */
  function _showNextToast() {
    if (!_toastQueue.length) { _toastBusy = false; return; }
    _toastBusy = true;

    const { amount, reason } = _toastQueue.shift();
    const toast  = document.getElementById('xpToast');
    const amtEl  = document.getElementById('xpToastAmount');
    const rsEl   = document.getElementById('xpToastReason');

    amtEl.textContent = '+' + amount + ' XP';
    rsEl.textContent  = reason;

    // Icon colour by reason type
    const icon = toast.querySelector('.xp-toast-icon');
    if (reason.includes('Badge'))  icon.textContent = '🏆';
    else if (reason.includes('Streak')) icon.textContent = '🔥';
    else if (reason.includes('Exam'))   icon.textContent = '📋';
    else icon.textContent = '⚡';

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(_showNextToast, 350);
    }, 2200);
  }

  /** Queue an XP toast notification */
  function showXPToast(amount, reason) {
    ensureToastEl();
    _toastQueue.push({ amount, reason: reason || TEXT.xp_label });
    if (!_toastBusy) _showNextToast();
  }

  /* ----------------------------------------------------------
     BADGE TOAST (variant of XP toast, purple-tinted)
  ---------------------------------------------------------- */

  /** Show a badge-unlock toast with badge name */
  function showBadgeToast(badgeId) {
    const def = Progress.BADGE_DEFS[badgeId];
    if (!def) return;

    ensureToastEl();

    const toast = document.getElementById('xpToast');
    // Temporarily override border to purple for badge toasts
    toast.style.borderColor = 'rgba(168, 85, 247, 0.45)';
    toast.style.boxShadow   = '0 0 20px rgba(168, 85, 247, 0.18), 0 8px 32px rgba(0,0,0,0.4)';
    toast.style.color       = 'var(--accent-purple)';

    _toastQueue.push({
      amount: 30,
      reason: TEXT.badge_unlocked + ': ' + def.name
    });

    if (!_toastBusy) {
      _showNextToast();
      // Reset styling after animation
      setTimeout(() => {
        toast.style.borderColor = '';
        toast.style.boxShadow   = '';
        toast.style.color       = '';
      }, 2800);
    }
  }

  /* ----------------------------------------------------------
     LEVEL-UP OVERLAY
  ---------------------------------------------------------- */

  /** Build the level-up overlay element and append to body */
  function ensureLevelUpOverlay() {
    if (document.getElementById('levelUpOverlay')) return;

    const overlay = el('div', 'levelup-overlay');
    overlay.id = 'levelUpOverlay';
    overlay.innerHTML = `
      <div class="levelup-badge">
        <span class="levelup-number" id="lvlUpNum">2</span>
        <span class="levelup-lbl">LVL</span>
      </div>
      <span class="levelup-title">${TEXT.level_up_title}</span>
      <span class="levelup-rank anim-fade-in-up" id="lvlUpRank"></span>
      <p class="levelup-dismiss anim-fade-in-up delay-5" style="font-size:0.68rem;color:var(--text-muted);font-family:var(--font-display);letter-spacing:0.12em;">
        ${TEXT.tap_to_dismiss}
      </p>`;

    // Dismiss on click or keypress
    overlay.addEventListener('click', hideLevelUpOverlay);
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        hideLevelUpOverlay();
        document.removeEventListener('keydown', handler);
      }
    });

    document.body.appendChild(overlay);
  }

  /** Show the level-up overlay with new level and rank */
  function showLevelUpOverlay(level, rank) {
    if (_levelUpVisible) return;
    _levelUpVisible = true;

    ensureLevelUpOverlay();
    document.getElementById('lvlUpNum').textContent  = level;
    document.getElementById('lvlUpRank').textContent = rank;

    const overlay = document.getElementById('levelUpOverlay');
    overlay.classList.add('show');

    // Auto-dismiss after 6 seconds
    setTimeout(hideLevelUpOverlay, 6000);
  }

  /** Hide the level-up overlay */
  function hideLevelUpOverlay() {
    const overlay = document.getElementById('levelUpOverlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    _levelUpVisible = false;
  }

  /* ----------------------------------------------------------
     BADGE UNLOCK ANIMATION (inline icon burst)
  ---------------------------------------------------------- */

  /**
   * Animate a badge icon element (add class, remove after done).
   * Pass the DOM element of the badge icon to animate.
   */
  function animateBadgeIcon(iconEl) {
    if (!iconEl) return;
    iconEl.classList.remove('anim-badge-unlock');
    // Trigger reflow so re-adding the class restarts the animation
    void iconEl.offsetWidth;
    iconEl.classList.add('anim-badge-unlock');
    iconEl.addEventListener('animationend', () => {
      iconEl.classList.remove('anim-badge-unlock');
    }, { once: true });
  }

  /* ----------------------------------------------------------
     ACHIEVEMENT GRID RENDERER
     Renders the full 9-badge grid for a given container element
  ---------------------------------------------------------- */

  /**
   * Render the complete achievement badge grid into a container.
   * earned: array of badge IDs currently in state.
   */
  function renderAchievementGrid(containerEl, earned) {
    if (!containerEl) return;

    const defs = Progress.BADGE_DEFS;
    const html = Object.entries(defs).map(([id, def]) => {
      const isEarned = earned.includes(id);
      return `
        <div class="achievement-badge" data-badge-id="${id}">
          <div class="achievement-badge-icon ${isEarned ? 'earned' : 'locked'}"
               title="${isEarned ? def.name : def.trigger}">
            ${def.icon}
          </div>
          <span class="achievement-badge-name">${def.name}</span>
          <span class="achievement-badge-xp">${isEarned ? '+30 XP earned' : def.trigger}</span>
        </div>`;
    }).join('');

    containerEl.innerHTML = html;
    containerEl.classList.add('stagger');
  }

  /**
   * Update a single badge icon to its earned state without re-rendering the grid.
   * Called when a badge is unlocked mid-session.
   */
  function markBadgeEarned(containerEl, badgeId) {
    if (!containerEl) return;
    const wrap = containerEl.querySelector(`[data-badge-id="${badgeId}"]`);
    if (!wrap) return;

    const icon = wrap.querySelector('.achievement-badge-icon');
    const xpEl = wrap.querySelector('.achievement-badge-xp');

    icon.classList.remove('locked');
    icon.classList.add('earned');
    icon.removeAttribute('title');
    icon.title = Progress.BADGE_DEFS[badgeId]?.name || badgeId;

    if (xpEl) xpEl.textContent = '+30 XP earned';

    animateBadgeIcon(icon);
  }

  /* ----------------------------------------------------------
     RECENT ACHIEVEMENTS LIST (dashboard panel, last 3)
  ---------------------------------------------------------- */

  /**
   * Render the last-3-badges list into the dashboard achievements panel.
   * Uses the .achievements-list element id="achievementsList".
   */
  function renderRecentAchievements() {
    const listEl = document.getElementById('achievementsList');
    if (!listEl) return;

    const state  = Progress.load();
    const earned = state.achievements;

    if (!earned.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          [ NO SIGNALS RECEIVED ]<br>
          <small>Complete topics to earn badges</small>
        </div>`;
      return;
    }

    const recent = earned.slice(-3).reverse();
    const defs   = Progress.BADGE_DEFS;

    const colorMap = {
      first_quiz:    'var(--accent-cyan)',
      streak_3:      'var(--accent-green)',
      streak_7:      'var(--accent-purple)',
      ch1_complete:  'var(--accent-green)',
      ch2_complete:  'var(--accent-purple)',
      exam_pass:     'var(--accent-cyan)',
      perfect_score: 'var(--accent-orange)',
      speed_run:     'var(--accent-red)',
      weak_cleared:  'var(--accent-green)'
    };

    listEl.innerHTML = recent.map(id => {
      const def   = defs[id] || { name: id, icon: '?'};
      const color = colorMap[id] || 'var(--accent-purple)';
      return `
        <div class="achievement-item anim-fade-in-up">
          <div class="achievement-icon"
               style="border-color:${color}40;background:${color}10;box-shadow:0 0 10px ${color}20;">
            ${def.icon}
          </div>
          <div class="achievement-info">
            <div class="achievement-name">${def.name}</div>
            <div class="achievement-xp" style="color:${color};">+30 XP</div>
          </div>
        </div>`;
    }).join('');
  }

  /* ----------------------------------------------------------
     RANK DISPLAY HELPER
  ---------------------------------------------------------- */

  /** Return the full rank info object for a given XP value */
  function getRankInfo(xp) {
    const level = Progress.calcLevel(xp);
    return {
      level,
      rank:     Progress.getRankTitle(level),
      levelPct: Progress.getLevelProgress(xp, level),
      xpToNext: Progress.getXPToNextLevel(xp, level)
    };
  }

  /* ----------------------------------------------------------
     XP COUNTER ANIMATION (number tick-up)
  ---------------------------------------------------------- */

  /**
   * Animate a number counting up from startVal to endVal in an element.
   * duration: total ms for the animation (default 900).
   */
  function animateCounter(el, startVal, endVal, duration) {
    if (!el) return;
    duration = duration || 900;
    const range     = endVal - startVal;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased   = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + range * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------
     CORRECT / WRONG FEEDBACK HELPERS (quiz UI)
  ---------------------------------------------------------- */

  /** Flash a DOM element with the correct-answer animation */
  function flashCorrect(el) {
    if (!el) return;
    el.classList.remove('anim-correct');
    void el.offsetWidth;
    el.classList.add('anim-correct', 'correct');
    el.addEventListener('animationend', () => el.classList.remove('anim-correct'), { once: true });
  }

  /** Shake a DOM element with the wrong-answer animation */
  function flashWrong(el) {
    if (!el) return;
    el.classList.remove('anim-wrong');
    void el.offsetWidth;
    el.classList.add('anim-wrong', 'wrong');
    el.addEventListener('animationend', () => el.classList.remove('anim-wrong'), { once: true });
  }

  /* ----------------------------------------------------------
     XP FLASH (card glow on XP award)
  ---------------------------------------------------------- */

  /** Apply the xp-flash glow to any card/section element */
  function flashXP(cardEl) {
    if (!cardEl) return;
    cardEl.classList.remove('anim-xp-flash');
    void cardEl.offsetWidth;
    cardEl.classList.add('anim-xp-flash');
    cardEl.addEventListener('animationend', () => cardEl.classList.remove('anim-xp-flash'), { once: true });
  }

  /* ----------------------------------------------------------
     STREAK DISPLAY HELPERS
  ---------------------------------------------------------- */

  /** Build and render the 7-day streak dot grid into an element */
  function renderStreakGrid(gridEl, lastStudied, streakCount) {
    if (!gridEl) return;

    const today    = new Date();
    today.setHours(0, 0, 0, 0);
    const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const last = lastStudied ? new Date(lastStudied) : null;
    if (last) last.setHours(0, 0, 0, 0);

    let html = '';
    for (let i = 6; i >= 0; i--) {
      const d   = new Date(today);
      d.setDate(today.getDate() - i);
      const dow = d.getDay();
      const lbl = DAY_NAMES[dow === 0 ? 6 : dow - 1];
      const isToday = i === 0;

      let isActive = false;
      if (last && streakCount > 0) {
        const diff = Math.round((last - d) / 86400000);
        isActive   = diff >= 0 && diff < streakCount;
      }

      html += `
        <div class="streak-day">
          <div class="streak-dot${isActive ? ' active' : ''}${isToday ? ' today' : ''}"></div>
          <span class="streak-day-label${isToday ? ' today' : ''}">${lbl}</span>
        </div>`;
    }

    gridEl.innerHTML = html;
  }

  /* ----------------------------------------------------------
     EVENT LISTENERS (react to progress:* events)
  ---------------------------------------------------------- */

  /** Wire up all progress event listeners — call once on page load */
  function attachProgressListeners() {
    // XP gained: sync header, show toast
    window.addEventListener('progress:xp', function (e) {
      const { gained, reason } = e.detail;
      const reasonLabel = _xpReasonLabel(reason);
      syncHeader();
      showXPToast(gained, reasonLabel);
    });

    // Level up: show overlay after a short delay (let XP toast go first)
    window.addEventListener('progress:levelup', function (e) {
      const { to, rank } = e.detail;
      setTimeout(() => showLevelUpOverlay(to, rank), 1800);
    });

    // Badge unlocked: show badge toast, update grid if present
    window.addEventListener('progress:badge', function (e) {
      const { id } = e.detail;
      showBadgeToast(id);
      syncHeader();
      // If an achievement grid is on this page, update it
      const grid = document.getElementById('achievementGrid');
      if (grid) {
        markBadgeEarned(grid, id);
      }
      // Refresh dashboard recent list if present
      renderRecentAchievements();
    });

    // Streak update: refresh any streak display present
    window.addEventListener('progress:streak', function (e) {
      const { streak } = e.detail;
      const countEl = document.getElementById('streakCount');
      if (countEl) animateCounter(countEl, Math.max(0, streak - 1), streak, 500);

      const statEl = document.getElementById('statStreak');
      if (statEl) animateCounter(statEl, Math.max(0, streak - 1), streak, 500);
    });
  }

  /** Map an XP reason key to a human-readable label for the toast */
  function _xpReasonLabel(reason) {
    const labels = {
      topic_complete:  'Topic Completed',
      quiz_first_try:  'Quiz Passed',
      quiz_retry:      'Quiz Retry',
      sim_complete:    'Simulation Done',
      exam_pass:       'Exam Passed',
      daily_streak:    TEXT.streak_bonus,
      badge_unlock:    'Badge Unlocked',
      unknown:         TEXT.xp_label
    };
    return labels[reason] || TEXT.xp_label;
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */

  /**
   * Initialise the gamification module.
   * Call once after DOM is ready on every page that uses gamification.
   */
  function init() {
    cacheHeaderEls();
    syncHeader();
    attachProgressListeners();
    renderRecentAchievements();
  }

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */

  window.Gamification = {
    // Setup
    init,
    syncHeader,

    // Toasts & overlays
    showXPToast,
    showBadgeToast,
    showLevelUpOverlay,
    hideLevelUpOverlay,

    // Badge rendering
    renderAchievementGrid,
    markBadgeEarned,
    animateBadgeIcon,

    // Dashboard panels
    renderRecentAchievements,
    renderStreakGrid,

    // Feedback animations
    flashCorrect,
    flashWrong,
    flashXP,

    // Utilities
    getRankInfo,
    animateCounter
  };

})();
