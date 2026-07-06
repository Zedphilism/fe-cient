/* ============================================================
   progress.js — State Engine (Single Source of Truth)
   NetCore Academy

   This module owns ALL localStorage read/write.
   No other module may touch localStorage directly.
   All state changes flow through Progress.* methods.

   Usage (after page loads):
     const state = Progress.load();
     Progress.addXP(25, 'quiz_pass');
     Progress.completeTopic('ch1-internet');
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONSTANTS
  ---------------------------------------------------------- */

  const STATE_KEY = 'netcore_state';

  const XP_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2750, 3750, 5000];

  const XP_REWARDS = {
    topic_complete:  10,
    quiz_first_try:  25,
    quiz_retry:      10,
    sim_complete:    15,
    exam_pass:       50,
    daily_streak:    20,
    badge_unlock:    30
  };

  const RANK_TITLES = [
    'Network Cadet',
    'Packet Scout',
    'Protocol Initiate',
    'Socket Engineer',
    'Routing Specialist',
    'TCP Veteran',
    'HTTP Architect',
    'Network Operator',
    'Infrastructure Lead',
    'NetCore Master'
  ];

  const BADGE_DEFS = {
    first_quiz:     { name: 'First Signal',       icon: '⚡', trigger: 'Complete your first quiz'             },
    streak_3:       { name: 'Consistent Node',    icon: '🔗', trigger: '3-day study streak'                   },
    streak_7:       { name: 'Uptime Champion',    icon: '🏆', trigger: '7-day study streak'                   },
    net_complete:   { name: 'Network Engineer',   icon: '🌐', trigger: 'Finish every Network Communication topic' },
    math_complete:  { name: 'Numerical Analyst',  icon: '∫',  trigger: 'Finish every Computational Maths topic'   },
    logic_complete: { name: 'Logic Architect',    icon: '⊕',  trigger: 'Finish every Digital Logic topic'         },
    exam_pass:      { name: 'Exam Ready',         icon: '📋', trigger: 'Pass exam mode with ≥80%'             },
    perfect_score:  { name: 'Zero Loss Packet',   icon: '💎', trigger: 'Score 100% on any quiz'               },
    speed_run:      { name: 'Low Latency',        icon: '⚡', trigger: 'Complete exam mode in under 5 minutes' },
    weak_cleared:   { name: 'Self-Correcting',    icon: '↺',  trigger: 'Clear all weak topics in retry mode'  }
  };

  /* ── Chapter → topic map (single source of truth) ──────────
     Three modules share the engine:
       net   — SCSR2213 Network Communication   (ch4–ch8)
       math  — SECI1113 Computational Maths     (math5–math10)
       logic — SECR1013 Digital Logic           (dl5–dl8)
  ────────────────────────────────────────────────────────── */

  const CHAPTER_TOPICS = {
    // ── Network Communication ──
    ch4: ['ch4-planes', 'ch4-ip-format', 'ch4-fragmentation', 'ch4-addressing',
          'ch4-dhcp-nat', 'ch4-ipv6'],
    ch5: ['ch5-link-state', 'ch5-distance-vector', 'ch5-ospf-bgp',
          'ch5-sdn', 'ch5-icmp'],
    ch6: ['ch6-intro', 'ch6-error-detection', 'ch6-mac-protocols',
          'ch6-ethernet-arp', 'ch6-switches-vlan'],
    ch7: ['ch7-wireless-intro', 'ch7-wifi-arch', 'ch7-wifi-mac',
          'ch7-cellular', 'ch7-mobility'],
    ch8: ['ch8-intro', 'ch8-symmetric', 'ch8-public-key',
          'ch8-tls', 'ch8-firewalls'],

    // ── Computational Mathematics ──
    math5:  ['math5-error-types', 'math5-abs-rel-error', 'math5-propagation'],
    math6:  ['math6-ivt', 'math6-bisection', 'math6-newton', 'math6-secant'],
    math7:  ['math7-definition', 'math7-characteristic', 'math7-power-method'],
    math8:  ['math8-concept', 'math8-forward', 'math8-backward'],
    math9:  ['math9-finite-diff', 'math9-central'],
    math10: ['math10-trapezoidal', 'math10-simpsons', 'math10-comparison'],

    // ── Digital Logic ──
    dl5: ['dl5-and-or', 'dl5-universal', 'dl5-dual-symbols', 'dl5-design'],
    dl6: ['dl6-adders', 'dl6-comparator', 'dl6-decoder-encoder', 'dl6-mux-demux'],
    dl7: ['dl7-latches', 'dl7-edge-ff', 'dl7-jk-t', 'dl7-async-timing'],
    dl8: ['dl8-async', 'dl8-sync', 'dl8-modulus', 'dl8-design']
  };

  const MODULES = {
    net:   { label: 'Network Communication',     code: 'SCSR2213', chapters: ['ch4', 'ch5', 'ch6', 'ch7', 'ch8'] },
    math:  { label: 'Computational Mathematics', code: 'SECI1113', chapters: ['math5', 'math6', 'math7', 'math8', 'math9', 'math10'] },
    logic: { label: 'Digital Logic',             code: 'SECR1013', chapters: ['dl5', 'dl6', 'dl7', 'dl8'] }
  };

  /** First topic of every chapter — always unlocked */
  const FIRST_TOPICS = Object.keys(CHAPTER_TOPICS).map(k => CHAPTER_TOPICS[k][0]);

  // Legacy aliases (older chapter pages reference these)
  const CH4_TOPICS      = CHAPTER_TOPICS.ch4;
  const CH5_TOPICS      = CHAPTER_TOPICS.ch5;
  const MATH_CH10_TOPICS = CHAPTER_TOPICS.math10;

  const MS_PER_DAY = 86400000;

  /* ----------------------------------------------------------
     DEFAULT STATE
  ---------------------------------------------------------- */

  const DEFAULT_STATE = Object.freeze({
    xp:               0,
    level:            1,
    streak:           0,
    lastStudied:      null,
    unlockedSections: FIRST_TOPICS.slice(),
    completedTopics:  [],
    achievements:     [],
    weakTopics:       [],
    examHistory:      []
  });

  /* ----------------------------------------------------------
     INTERNAL HELPERS
  ---------------------------------------------------------- */

  /** Deep-clone a plain object to avoid accidental mutation */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Merge saved data with defaults so new keys are always present */
  function mergeWithDefaults(saved) {
    return Object.assign(clone(DEFAULT_STATE), saved);
  }

  /** Derive level (1–10) from total XP */
  function calcLevel(xp) {
    let level = 1;
    for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= XP_THRESHOLDS[i]) { level = i + 1; break; }
    }
    return Math.min(level, 10);
  }

  /** Midnight-normalise a Date so comparisons are day-accurate */
  function midnight(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /** Return the number of full calendar days between two dates */
  function daysBetween(a, b) {
    return Math.round(Math.abs(midnight(b) - midnight(a)) / MS_PER_DAY);
  }

  /** Fire a CustomEvent on window so other modules can react */
  function emit(name, detail) {
    window.dispatchEvent(new CustomEvent('progress:' + name, { detail }));
  }

  /* ----------------------------------------------------------
     LOAD / SAVE
  ---------------------------------------------------------- */

  /** Load and return the current state object from localStorage */
  function load() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      const state = raw ? mergeWithDefaults(JSON.parse(raw)) : clone(DEFAULT_STATE);

      // Ensure the first topic of every chapter is unlocked, even in old saves
      FIRST_TOPICS.forEach(id => {
        if (!state.unlockedSections.includes(id)) state.unlockedSections.push(id);
      });

      return state;
    } catch {
      return clone(DEFAULT_STATE);
    }
  }

  /** Persist a state object to localStorage */
  function save(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[Progress] Could not save state:', e);
    }
  }

  /** Wipe all progress and reset to defaults (dev / reset button) */
  function reset() {
    const fresh = clone(DEFAULT_STATE);
    save(fresh);
    emit('reset', { state: fresh });
    return fresh;
  }

  /* ----------------------------------------------------------
     LEVEL UTILITIES (read-only, no state write)
  ---------------------------------------------------------- */

  /** Return the rank title string for a given level */
  function getRankTitle(level) {
    return RANK_TITLES[Math.min(level, 10) - 1];
  }

  /** Return XP progress (0–100) within the current level */
  function getLevelProgress(xp, level) {
    if (level >= 10) return 100;
    const curr = XP_THRESHOLDS[level - 1];
    const next = XP_THRESHOLDS[level];
    return Math.max(0, Math.min(100, Math.round(((xp - curr) / (next - curr)) * 100)));
  }

  /** Return XP still needed to reach the next level */
  function getXPToNextLevel(xp, level) {
    if (level >= 10) return 0;
    return XP_THRESHOLDS[level] - xp;
  }

  /* ----------------------------------------------------------
     XP
  ---------------------------------------------------------- */

  /**
   * Add XP to state, compute new level, save, and emit events.
   * Returns { state, gained, leveledUp, newLevel }.
   */
  function addXP(amount, reason) {
    const state      = load();
    const prevLevel  = calcLevel(state.xp);

    state.xp        += amount;
    const newLevel   = calcLevel(state.xp);
    state.level      = newLevel;

    save(state);

    const leveledUp = newLevel > prevLevel;

    emit('xp', { gained: amount, total: state.xp, reason: reason || 'unknown' });

    if (leveledUp) {
      emit('levelup', {
        from:  prevLevel,
        to:    newLevel,
        rank:  getRankTitle(newLevel),
        state
      });
    }

    return { state, gained: amount, leveledUp, newLevel };
  }

  /* ----------------------------------------------------------
     STREAK
  ---------------------------------------------------------- */

  /**
   * Check today's date against lastStudied and update streak.
   * Call once per session start.
   * Returns { state, streakUpdated, streakBroken, awarded }.
   */
  function updateStreak() {
    const state   = load();
    const today   = midnight(new Date());
    const result  = { state, streakUpdated: false, streakBroken: false, awarded: 0 };

    if (!state.lastStudied) {
      // First session ever
      state.streak      = 1;
      state.lastStudied = today.toISOString();
      result.streakUpdated = true;
    } else {
      const last = midnight(new Date(state.lastStudied));
      const diff = daysBetween(last, today);

      if (diff === 0) {
        // Already studied today — no change
        return result;
      } else if (diff === 1) {
        // Consecutive day
        state.streak++;
        state.lastStudied = today.toISOString();
        result.streakUpdated = true;
      } else {
        // Gap > 1 day — streak broken
        state.streak      = 1;
        state.lastStudied = today.toISOString();
        result.streakBroken = true;
        result.streakUpdated = true;
      }
    }

    // Award streak XP bonus
    if (result.streakUpdated) {
      const prevLevel = state.level;
      state.xp    += XP_REWARDS.daily_streak;
      state.level  = calcLevel(state.xp);
      result.awarded = XP_REWARDS.daily_streak;
      
      emit('xp', { gained: result.awarded, total: state.xp, reason: 'daily_streak' });
      if (state.level > prevLevel) {
        emit('levelup', { from: prevLevel, to: state.level, rank: getRankTitle(state.level), state });
      }
    }

    // Check streak badges
    const newBadges = checkAndUnlockBadges(state);
    save(state);

    emit('streak', {
      streak:  state.streak,
      broken:  result.streakBroken,
      awarded: result.awarded
    });

    newBadges.forEach(id => emit('badge', { id, def: BADGE_DEFS[id] }));

    result.state = state;
    return result;
  }

  /* ----------------------------------------------------------
     TOPIC COMPLETION
  ---------------------------------------------------------- */

  /**
   * Mark a topic as complete, award XP, check badges.
   * Returns { state, alreadyDone, xpGained, newBadges }.
   */
  function completeTopic(topicId) {
    const state = load();

    if (state.completedTopics.includes(topicId)) {
      return { state, alreadyDone: true, xpGained: 0, newBadges: [] };
    }

    state.completedTopics.push(topicId);
    state.xp    += XP_REWARDS.topic_complete;
    state.level  = calcLevel(state.xp);

    const newBadges = checkAndUnlockBadges(state);
    save(state);

    emit('topic', { id: topicId, xpGained: XP_REWARDS.topic_complete });
    newBadges.forEach(id => emit('badge', { id, def: BADGE_DEFS[id] }));

    return {
      state,
      alreadyDone: false,
      xpGained: XP_REWARDS.topic_complete,
      newBadges
    };
  }

  /**
   * Unlock a section (gate-based progression).
   * Returns updated state.
   */
  function unlockSection(sectionId) {
    const state = load();
    if (!state.unlockedSections.includes(sectionId)) {
      state.unlockedSections.push(sectionId);
      save(state);
      emit('unlock', { sectionId });
    }
    return state;
  }

  /**
   * Return true if a section ID is currently unlocked.
   */
  function isSectionUnlocked(sectionId) {
    return load().unlockedSections.includes(sectionId);
  }

  /* ----------------------------------------------------------
     QUIZ SCORING
  ---------------------------------------------------------- */

  /**
   * Record a quiz result and award XP.
   * isFirstTry: true on first attempt, false on retry.
   * isPerfect:  true if score === total.
   * Returns { state, xpGained, newBadges }.
   */
  function recordQuizResult({ topicId, score, total, isFirstTry, isFirstQuizEver }) {
    const state    = load();
    const prevLevel = state.level;
    const isPerfect = score === total;
    let xpGained   = isFirstTry ? XP_REWARDS.quiz_first_try : XP_REWARDS.quiz_retry;

    state.xp    += xpGained;
    state.level  = calcLevel(state.xp);
    emit('xp', { gained: xpGained, total: state.xp, reason: isFirstTry ? 'quiz_first_try' : 'quiz_retry' });
    if (state.level > prevLevel) {
      emit('levelup', { from: prevLevel, to: state.level, rank: getRankTitle(state.level), state });
    }

    // Track first quiz ever for badge
    if (isFirstQuizEver && !state.achievements.includes('first_quiz')) {
      // badge check below will handle it
    }

    const newBadges = checkAndUnlockBadges(state, { isPerfect, isFirstQuizEver });
    save(state);

    emit('quiz', { topicId, score, total, isPerfect, xpGained });
    newBadges.forEach(id => emit('badge', { id, def: BADGE_DEFS[id] }));

    return { state, xpGained, newBadges };
  }

  /* ----------------------------------------------------------
     SIMULATION
  ---------------------------------------------------------- */

  /**
   * Record a simulation as completed and award XP.
   * Returns { state, xpGained }.
   */
  function completeSimulation(simId) {
    const result = addXP(XP_REWARDS.sim_complete, 'sim_complete');
    emit('sim', { simId, xpGained: XP_REWARDS.sim_complete });
    return { state: result.state, xpGained: XP_REWARDS.sim_complete };
  }

  /* ----------------------------------------------------------
     EXAM
  ---------------------------------------------------------- */

  /**
   * Save an exam result, flag weak topics, optionally award XP.
   * result: { score, total, durationSeconds, weakTopicIds, perTopic }
   * Returns { state, passed, xpGained, newBadges }.
   */
  function recordExamResult(result) {
    const state    = load();
    const pct      = Math.round((result.score / result.total) * 100);
    const passed   = pct >= 80;
    const fast     = result.durationSeconds < 300;  // 5 minutes
    let xpGained   = 0;

    // Log to history
    state.examHistory.push({
      date:            new Date().toISOString(),
      score:           result.score,
      total:           result.total,
      pct,
      durationSeconds: result.durationSeconds || null,
      weakTopicIds:    result.weakTopicIds || [],
      perTopic:        result.perTopic || {}
    });

    // Update weak topics
    state.weakTopics = result.weakTopicIds || [];

    if (passed) {
      const prevLevel = state.level;
      state.xp    += XP_REWARDS.exam_pass;
      xpGained     = XP_REWARDS.exam_pass;
      state.level  = calcLevel(state.xp);
      emit('xp', { gained: xpGained, total: state.xp, reason: 'exam_pass' });
      if (state.level > prevLevel) {
        emit('levelup', { from: prevLevel, to: state.level, rank: getRankTitle(state.level), state });
      }
    }

    const newBadges = checkAndUnlockBadges(state, { examPassed: passed, examFast: fast });
    save(state);

    emit('exam', { pct, passed, xpGained, weakTopics: state.weakTopics });
    newBadges.forEach(id => emit('badge', { id, def: BADGE_DEFS[id] }));

    return { state, passed, xpGained, newBadges };
  }

  /* ----------------------------------------------------------
     WEAK TOPICS
  ---------------------------------------------------------- */

  /** Overwrite the weak topics list */
  function setWeakTopics(ids) {
    const state    = load();
    state.weakTopics = [...ids];
    save(state);
    emit('weaktopics', { ids: state.weakTopics });
    return state;
  }

  /**
   * Clear all weak topics (called after successful retry mode).
   * Checks for the weak_cleared badge.
   * Returns { state, newBadges }.
   */
  function clearWeakTopics() {
    const state    = load();
    state.weakTopics = [];
    const newBadges = checkAndUnlockBadges(state, { weakCleared: true });
    save(state);
    emit('weaktopics', { ids: [] });
    newBadges.forEach(id => emit('badge', { id, def: BADGE_DEFS[id] }));
    return { state, newBadges };
  }

  /* ----------------------------------------------------------
     ACHIEVEMENTS
  ---------------------------------------------------------- */

  /**
   * Directly unlock a badge by ID (e.g. from outside the auto-check).
   * Adds +30 XP. Returns { state, alreadyEarned }.
   */
  function unlockBadge(badgeId) {
    const state = load();
    if (state.achievements.includes(badgeId)) {
      return { state, alreadyEarned: true };
    }
    state.achievements.push(badgeId);
    state.xp    += XP_REWARDS.badge_unlock;
    state.level  = calcLevel(state.xp);
    save(state);
    emit('badge', { id: badgeId, def: BADGE_DEFS[badgeId] });
    emit('xp', { gained: XP_REWARDS.badge_unlock, total: state.xp, reason: 'badge_unlock' });
    return { state, alreadyEarned: false };
  }

  /**
   * Evaluate all badge conditions against the current state.
   * Mutates state.achievements in-place (no save — caller must save).
   * Returns array of newly unlocked badge IDs.
   */
  function checkAndUnlockBadges(state, context) {
    context = context || {};
    const newlyUnlocked = [];

    function tryUnlock(id) {
      if (!state.achievements.includes(id)) {
        state.achievements.push(id);
        const prevLevel = state.level;
        state.xp    += XP_REWARDS.badge_unlock;
        state.level  = calcLevel(state.xp);
        if (state.level > prevLevel) {
          emit('levelup', { from: prevLevel, to: state.level, rank: getRankTitle(state.level), state });
        }
        newlyUnlocked.push(id);
      }
    }

    // first_quiz — triggered externally via recordQuizResult with isFirstQuizEver
    if (context.isFirstQuizEver) {
      tryUnlock('first_quiz');
    }

    // streak_3 / streak_7
    if (state.streak >= 3)  tryUnlock('streak_3');
    if (state.streak >= 7)  tryUnlock('streak_7');

    // Module completion badges — every topic of every chapter in the module
    Object.keys(MODULES).forEach(function (modKey) {
      const allTopics = MODULES[modKey].chapters.reduce(
        (acc, ch) => acc.concat(CHAPTER_TOPICS[ch]), []);
      if (allTopics.every(id => state.completedTopics.includes(id))) {
        tryUnlock(modKey + '_complete');
      }
    });

    // exam_pass — passed with ≥80%
    if (context.examPassed) tryUnlock('exam_pass');

    // perfect_score — 100% on any quiz
    if (context.isPerfect)  tryUnlock('perfect_score');

    // speed_run — exam completed in under 5 minutes
    if (context.examFast)   tryUnlock('speed_run');

    // weak_cleared — all weak topics cleared
    if (context.weakCleared) tryUnlock('weak_cleared');

    return newlyUnlocked;
  }

  /* ----------------------------------------------------------
     DERIVED GETTERS (no state write)
  ---------------------------------------------------------- */

  /** Return progress % (0–100) for a given chapter key */
  function getChapterProgress(chapter) {
    const topics = CHAPTER_TOPICS[chapter];
    if (!topics || !topics.length) return 0;
    const state  = load();
    const done   = topics.filter(id => state.completedTopics.includes(id)).length;
    return Math.round((done / topics.length) * 100);
  }

  /** Return { pct, done, total } progress for a whole module (net|math|logic) */
  function getModuleProgress(modKey) {
    const mod = MODULES[modKey];
    if (!mod) return { pct: 0, done: 0, total: 0 };
    const topics = mod.chapters.reduce((acc, ch) => acc.concat(CHAPTER_TOPICS[ch]), []);
    const state  = load();
    const done   = topics.filter(id => state.completedTopics.includes(id)).length;
    return {
      pct:   topics.length ? Math.round((done / topics.length) * 100) : 0,
      done:  done,
      total: topics.length
    };
  }

  /** Return true if a topic has been completed */
  function isTopicComplete(topicId) {
    return load().completedTopics.includes(topicId);
  }

  /** Return total number of topics completed across all chapters */
  function getTotalCompleted() {
    return load().completedTopics.length;
  }

  /** Return the last N exam history entries (newest first) */
  function getRecentExams(n) {
    return load().examHistory.slice(-n).reverse();
  }

  /** Return the best exam score (pct) from history, or null */
  function getBestExamScore() {
    const history = load().examHistory;
    if (!history.length) return null;
    return Math.max(...history.map(e => e.pct));
  }

  /** Return whether a specific badge has been earned */
  function hasBadge(badgeId) {
    return load().achievements.includes(badgeId);
  }

  /** Return a summary snapshot (used by header renders across pages) */
  function getSummary() {
    const state = load();
    const level = calcLevel(state.xp);

    const chapterPct = {};
    Object.keys(CHAPTER_TOPICS).forEach(ch => { chapterPct[ch] = getChapterProgress(ch); });

    return {
      xp:           state.xp,
      level,
      rank:         getRankTitle(level),
      levelPct:     getLevelProgress(state.xp, level),
      xpToNext:     getXPToNextLevel(state.xp, level),
      streak:       state.streak,
      lastStudied:  state.lastStudied,
      topicsDone:   state.completedTopics.length,
      badgeCount:   state.achievements.length,
      weakCount:    state.weakTopics.length,
      chapterPct,
      modules: {
        net:   getModuleProgress('net'),
        math:  getModuleProgress('math'),
        logic: getModuleProgress('logic')
      }
    };
  }

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */

  window.Progress = {
    // Core I/O
    load,
    save,
    reset,

    // Constants (read-only references for other modules)
    XP_REWARDS,
    XP_THRESHOLDS,
    RANK_TITLES,
    BADGE_DEFS,
    CHAPTER_TOPICS,
    MODULES,
    // Legacy aliases still referenced by older chapter pages
    CH4_TOPICS,
    CH5_TOPICS,
    MATH_CH10_TOPICS,

    // XP
    addXP,

    // Streak
    updateStreak,

    // Topics & sections
    completeTopic,
    unlockSection,
    isSectionUnlocked,
    isTopicComplete,

    // Quiz
    recordQuizResult,

    // Simulation
    completeSimulation,

    // Exam
    recordExamResult,

    // Weak topics
    setWeakTopics,
    clearWeakTopics,

    // Badges
    unlockBadge,
    hasBadge,
    checkAndUnlockBadges,

    // Derived getters
    calcLevel,
    getRankTitle,
    getLevelProgress,
    getXPToNextLevel,
    getChapterProgress,
    getModuleProgress,
    getTotalCompleted,
    getRecentExams,
    getBestExamScore,
    getSummary
  };

})();
