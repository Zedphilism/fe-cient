/**
 * js/exam-mode.js
 * Exam mode engine: timer, randomisation, adaptive retry, analytics, score screen.
 * Exposes window.ExamMode — initialised by exam-mode.html's inline init script.
 *
 * Dependencies (must be loaded before this file):
 *   data/chapter1-data.js  → window.chapter1Data
 *   data/chapter2-data.js  → window.chapter2Data
 *   data/quiz-data.js      → window.quizData, window.quizTopicMeta, window.quizChapterMeta
 *   js/progress.js         → window.Progress
 *   js/gamification.js     → window.Gamification
 *   js/quiz.js             → window.Quiz (used for shuffle + sample helpers)
 */

(function (global) {
  'use strict';

  // ── Constants ───────────────────────────────────────────────────────────
  const EXAM_QUESTION_COUNT  = 20;      // questions per standard exam
  const EXAM_DURATION_SECS   = 30 * 60; // 30 minutes
  const PASS_THRESHOLD       = 0.80;    // 80% to pass
  const SPEED_RUN_SECS       = 5 * 60;  // under 5 min → low_latency badge
  const TICK_INTERVAL_MS     = 1000;

  // Strings
  const STR = {
    timerWarn:     'CAUTION — 5 MINUTES REMAINING',
    timerCritical: 'CRITICAL — 1 MINUTE REMAINING',
    pass:          'SYSTEMS OPERATIONAL',
    fail:          'DIAGNOSTICS FAILED',
    retryLabel:    'RETRY WEAK TOPICS',
    examLabel:     'FULL EXAM',
    noWeak:        'No weak topics flagged. Run a full exam first.'
  };

  // ── Module State ────────────────────────────────────────────────────────
  let _session = null; // active exam session object

  // ── Helpers ─────────────────────────────────────────────────────────────

  /** Format seconds as MM:SS string. */
  function _formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  /** Return DOM element by id; throw if missing. */
  function _el(id) {
    const el = document.getElementById(id);
    if (!el) throw new Error('[ExamMode] Missing element #' + id);
    return el;
  }

  /** Safely query a selector under a root (or document). */
  function _q(sel, root) {
    return (root || document).querySelector(sel);
  }

  /** Build the animated SVG score ring HTML string. */
  function _buildScoreRing(pct, pass) {
    const r          = 54;
    const circ       = 2 * Math.PI * r; // ≈ 339.3
    const offset     = circ - (pct / 100) * circ;
    const color      = pass ? 'var(--accent-green)' : 'var(--accent-red)';
    const textColor  = pass ? 'var(--accent-green)' : 'var(--accent-red)';
    return (
      '<svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">' +
        '<circle cx="70" cy="70" r="' + r + '" fill="none"' +
          ' stroke="var(--border-glass)" stroke-width="8"/>' +
        '<circle id="score-ring-arc" cx="70" cy="70" r="' + r + '" fill="none"' +
          ' stroke="' + color + '" stroke-width="8"' +
          ' stroke-dasharray="' + circ.toFixed(1) + '"' +
          ' stroke-dashoffset="' + circ.toFixed(1) + '"' +
          ' transform="rotate(-90 70 70)"' +
          ' style="transition: stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)"/>' +
        '<text x="70" y="65" text-anchor="middle" dominant-baseline="middle"' +
          ' fill="' + textColor + '" font-size="26" font-family="JetBrains Mono,monospace"' +
          ' font-weight="700" id="score-ring-pct">0%</text>' +
        '<text x="70" y="90" text-anchor="middle" dominant-baseline="middle"' +
          ' fill="var(--text-muted)" font-size="10" font-family="JetBrains Mono,monospace">' +
          (pass ? 'PASS' : 'FAIL') +
        '</text>' +
      '</svg>'
    );
  }

  /** Render per-topic breakdown bars into containerEl. */
  function _renderTopicBreakdown(containerEl, topicResults) {
    containerEl.innerHTML = '';
    Object.keys(topicResults).forEach(function (topicId) {
      var meta    = (global.quizTopicMeta || {})[topicId] || { label: topicId };
      var res     = topicResults[topicId];
      var pct     = res.total > 0 ? Math.round((res.correct / res.total) * 100) : 0;
      var colorClass = pct >= 80 ? 'bar--green' : pct >= 50 ? 'bar--warn' : 'bar--red';
      var weak    = pct < 80;

      var row = document.createElement('div');
      row.className = 'topic-breakdown-row' + (weak ? ' topic-breakdown-row--weak' : '');
      row.innerHTML =
        '<div class="topic-breakdown-label">' +
          '<span class="topic-breakdown-name">' + meta.label + '</span>' +
          '<span class="topic-breakdown-score">' + res.correct + '/' + res.total + '</span>' +
        '</div>' +
        '<div class="topic-breakdown-track">' +
          '<div class="topic-breakdown-fill ' + colorClass + '" ' +
               'data-target-width="' + pct + '" style="width:0%"></div>' +
        '</div>';
      containerEl.appendChild(row);
    });

    // Animate bars in
    requestAnimationFrame(function () {
      containerEl.querySelectorAll('.topic-breakdown-fill').forEach(function (bar) {
        bar.style.width = bar.dataset.targetWidth + '%';
      });
    });
  }

  /** Render per-chapter score bars into containerEl. */
  function _renderChapterBreakdown(containerEl, chapterResults) {
    containerEl.innerHTML = '';
    Object.keys(chapterResults).forEach(function (chKey) {
      var meta  = (global.quizChapterMeta || {})[chKey] || { label: chKey, color: 'var(--accent-cyan)' };
      var res   = chapterResults[chKey];
      var pct   = res.total > 0 ? Math.round((res.correct / res.total) * 100) : 0;

      var row = document.createElement('div');
      row.className = 'chapter-breakdown-row';
      row.innerHTML =
        '<div class="chapter-breakdown-label">' +
          '<span>' + meta.label + '</span>' +
          '<span>' + pct + '%</span>' +
        '</div>' +
        '<div class="chapter-breakdown-track">' +
          '<div class="chapter-breakdown-fill" ' +
               'style="--bar-color:' + meta.color + '; width:0%" ' +
               'data-target-width="' + pct + '"></div>' +
        '</div>';
      containerEl.appendChild(row);
    });

    requestAnimationFrame(function () {
      containerEl.querySelectorAll('.chapter-breakdown-fill').forEach(function (bar) {
        bar.style.width = bar.dataset.targetWidth + '%';
      });
    });
  }

  // ── Session Factory ──────────────────────────────────────────────────────

  /**
   * createSession — builds a new exam session object.
   * @param {Array}  questions  Flat array of question objects (already sampled).
   * @param {Object} opts       { isRetryMode: bool }
   */
  function _createSession(questions, opts) {
    opts = opts || {};
    return {
      questions:    questions,
      isRetryMode:  !!opts.isRetryMode,
      currentIndex: 0,
      answers:      [],           // { questionId, topicId, chapter, correct }
      startTime:    Date.now(),
      endTime:      null,
      timerSecs:    EXAM_DURATION_SECS,
      timerHandle:  null,
      submitted:    false
    };
  }

  // ── Render Layer ─────────────────────────────────────────────────────────

  /** Update the timer display element. */
  function _renderTimer(secs) {
    var timerEl = _el('exam-timer');
    timerEl.textContent = _formatTime(secs);

    if (secs <= 60) {
      timerEl.dataset.state = 'critical';
    } else if (secs <= 300) {
      timerEl.dataset.state = 'warn';
    } else {
      timerEl.dataset.state = 'normal';
    }
  }

  /** Render question progress dots strip. */
  function _renderDots() {
    var strip = _el('exam-dot-strip');
    strip.innerHTML = '';
    _session.questions.forEach(function (q, i) {
      var dot = document.createElement('button');
      dot.className = 'q-dot';
      dot.setAttribute('aria-label', 'Question ' + (i + 1));
      dot.setAttribute('disabled', '');

      var ans = _session.answers[i];
      if (ans !== undefined) {
        dot.classList.add(ans.correct ? 'q-dot--correct' : 'q-dot--wrong');
      }
      if (i === _session.currentIndex) {
        dot.classList.add('q-dot--current');
      }
      strip.appendChild(dot);
    });
  }

  /** Render the current question card. */
  function _renderQuestion() {
    if (_session.submitted) return;

    var q        = _session.questions[_session.currentIndex];
    var total    = _session.questions.length;
    var current  = _session.currentIndex + 1;
    var panel    = _el('exam-question-panel');

    // Update progress counter
    _el('exam-q-counter').textContent = 'Q ' + current + ' / ' + total;

    // Update topic tag
    var topicMeta = (global.quizTopicMeta || {})[q.topicId] || { label: q.topicId || '' };
    _el('exam-q-topic').textContent = topicMeta.label;

    // Render question text
    _el('exam-q-text').textContent = q.question;

    // Render answer area
    var answerArea = _el('exam-answer-area');
    answerArea.innerHTML = '';

    if (q.type === 'mcq' || q.type === 'truefalse') {
      var options = q.options || (q.type === 'truefalse' ? ['True', 'False'] : []);
      options.forEach(function (opt, idx) {
        var label = document.createElement('label');
        label.className = 'exam-option';
        var input = document.createElement('input');
        input.type  = 'radio';
        input.name  = 'exam-answer';
        input.value = String(idx);
        label.appendChild(input);
        var span = document.createElement('span');
        span.className = 'exam-option__text';
        span.textContent = (q.type === 'mcq' ? String.fromCharCode(65 + idx) + '. ' : '') + opt;
        label.appendChild(span);
        answerArea.appendChild(label);
      });

    } else if (q.type === 'fillblank') {
      var inp = document.createElement('input');
      inp.type        = 'text';
      inp.className   = 'exam-text-input';
      inp.placeholder = 'Type your answer…';
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('autocorrect',  'off');
      inp.setAttribute('autocapitalize', 'off');
      answerArea.appendChild(inp);
      // Allow Enter to submit
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); _submitAnswer(); }
      });

    } else if (q.type === 'match') {
      var pairs  = q.pairs || [];
      var terms  = pairs.map(function (p) { return p.term; });
      var defs   = pairs.map(function (p) { return p.definition; });
      // Shuffle definitions for display
      var shuffled = Quiz.shuffle ? Quiz.shuffle(defs.slice()) : defs.slice();

      var matchWrap = document.createElement('div');
      matchWrap.className = 'exam-match-wrap';

      // Left column: terms (fixed)
      var leftCol = document.createElement('div');
      leftCol.className = 'exam-match-col exam-match-col--terms';
      terms.forEach(function (term, i) {
        var item = document.createElement('div');
        item.className   = 'exam-match-term';
        item.textContent = term;
        item.dataset.idx = i;
        leftCol.appendChild(item);
      });

      // Right column: selects
      var rightCol = document.createElement('div');
      rightCol.className = 'exam-match-col exam-match-col--defs';
      terms.forEach(function (term, i) {
        var sel = document.createElement('select');
        sel.className      = 'exam-match-select';
        sel.dataset.termIdx = i;
        var placeholder = document.createElement('option');
        placeholder.value   = '';
        placeholder.textContent = '— select —';
        sel.appendChild(placeholder);
        shuffled.forEach(function (def, di) {
          var opt = document.createElement('option');
          opt.value       = defs.indexOf(def);
          opt.textContent = def;
          sel.appendChild(opt);
        });
        rightCol.appendChild(sel);
      });

      matchWrap.appendChild(leftCol);
      matchWrap.appendChild(rightCol);
      answerArea.appendChild(matchWrap);
    }

    // Show/hide next and submit buttons
    var isLast = (_session.currentIndex === total - 1);
    _el('btn-exam-next').classList.toggle('hidden', isLast);
    _el('btn-exam-submit').classList.toggle('hidden', !isLast);

    _renderDots();
    panel.classList.add('anim-fade-in-up');
    setTimeout(function () { panel.classList.remove('anim-fade-in-up'); }, 400);
  }

  // ── Answer Evaluation ───────────────────────────────────────────────────

  /** Read the user's selected answer from the DOM. Returns null if nothing selected. */
  function _readAnswer() {
    var q = _session.questions[_session.currentIndex];

    if (q.type === 'mcq' || q.type === 'truefalse') {
      var checked = _q('input[name="exam-answer"]:checked');
      if (!checked) return null;
      return parseInt(checked.value, 10);

    } else if (q.type === 'fillblank') {
      var inp = _q('.exam-text-input');
      return inp ? inp.value.trim() : null;

    } else if (q.type === 'match') {
      var selects = document.querySelectorAll('.exam-match-select');
      var result  = [];
      for (var i = 0; i < selects.length; i++) {
        var val = selects[i].value;
        if (val === '') return null;
        result.push(parseInt(val, 10));
      }
      return result;
    }
    return null;
  }

  /** Evaluate answer against correct answer. Returns boolean. */
  function _evaluateAnswer(q, userAnswer) {
    if (userAnswer === null || userAnswer === undefined) return false;

    if (q.type === 'mcq' || q.type === 'truefalse') {
      return userAnswer === q.answer;

    } else if (q.type === 'fillblank') {
      var correct = String(q.answer).toLowerCase().trim();
      var given   = String(userAnswer).toLowerCase().trim();
      return given === correct || correct.startsWith(given + ' ') || given.includes(correct);

    } else if (q.type === 'match') {
      if (!Array.isArray(userAnswer) || !Array.isArray(q.answer)) return false;
      if (userAnswer.length !== q.answer.length) return false;
      // Check each pair's selected definition index maps to the correct definition
      for (var i = 0; i < q.pairs.length; i++) {
        var correctDefIdx = q.pairs.findIndex(function (p, pi) {
          return pi === (Array.isArray(q.answer) ? i : q.answer);
        });
        // Simpler: definition index for term i should be i (pairs are in order)
        if (userAnswer[i] !== i) return false;
      }
      return true;
    }
    return false;
  }

  /** Record the answer for current question and advance. */
  function _submitAnswer() {
    if (_session.submitted) return;

    var q           = _session.questions[_session.currentIndex];
    var userAnswer  = _readAnswer();
    var correct     = _evaluateAnswer(q, userAnswer);

    _session.answers[_session.currentIndex] = {
      questionId: q.id,
      topicId:    q.topicId,
      chapter:    q.chapter,
      correct:    correct,
      skipped:    userAnswer === null
    };

    var isLast = (_session.currentIndex === _session.questions.length - 1);
    if (isLast) {
      _finishExam();
    } else {
      _session.currentIndex++;
      _renderQuestion();
    }
  }

  // ── Timer ───────────────────────────────────────────────────────────────

  function _startTimer() {
    _renderTimer(_session.timerSecs);
    _session.timerHandle = setInterval(function () {
      _session.timerSecs--;
      _renderTimer(_session.timerSecs);

      if (_session.timerSecs === 300) {
        _showTimerAlert(STR.timerWarn, 'warn');
      } else if (_session.timerSecs === 60) {
        _showTimerAlert(STR.timerCritical, 'critical');
      } else if (_session.timerSecs <= 0) {
        _finishExam();
      }
    }, TICK_INTERVAL_MS);
  }

  function _stopTimer() {
    if (_session && _session.timerHandle) {
      clearInterval(_session.timerHandle);
      _session.timerHandle = null;
    }
  }

  function _showTimerAlert(msg, type) {
    var banner = _el('exam-timer-alert');
    banner.textContent  = msg;
    banner.dataset.type = type;
    banner.removeAttribute('hidden');
    setTimeout(function () { banner.setAttribute('hidden', ''); }, 5000);
  }

  // ── Finish & Score Screen ────────────────────────────────────────────────

  function _finishExam() {
    _stopTimer();
    _session.submitted = true;
    _session.endTime   = Date.now();

    var durationSecs = Math.round((_session.endTime - _session.startTime) / 1000);
    var answers      = _session.answers;
    var questions    = _session.questions;

    // ── Tally totals ──────────────────────────────────────────────────────
    var totalCorrect = 0;
    var topicResults = {};   // { topicId: { correct, total } }
    var chapterResults = {}; // { ch1|ch2: { correct, total } }

    answers.forEach(function (ans) {
      if (!ans) return; // unanswered (time ran out mid-question)
      if (ans.correct) totalCorrect++;

      // Per topic
      if (!topicResults[ans.topicId]) topicResults[ans.topicId] = { correct: 0, total: 0 };
      topicResults[ans.topicId].total++;
      if (ans.correct) topicResults[ans.topicId].correct++;

      // Per chapter
      var ch = ans.chapter || 'ch1';
      if (!chapterResults[ch]) chapterResults[ch] = { correct: 0, total: 0 };
      chapterResults[ch].total++;
      if (ans.correct) chapterResults[ch].correct++;
    });

    var totalAnswered  = answers.filter(Boolean).length;
    var totalQuestions = questions.length;
    var scorePct       = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    var passed         = scorePct >= PASS_THRESHOLD * 100;

    // ── Determine weak topics ─────────────────────────────────────────────
    var weakTopicIds = Object.keys(topicResults).filter(function (tid) {
      var r = topicResults[tid];
      return r.total > 0 && (r.correct / r.total) < PASS_THRESHOLD;
    });

    // ── Persist to Progress ───────────────────────────────────────────────
    if (global.Progress) {
      Progress.recordExamResult({
        score:           totalCorrect,
        total:           totalQuestions,
        durationSeconds: durationSecs,
        weakTopicIds:    weakTopicIds
      });
    }

    // ── Render score screen ───────────────────────────────────────────────
    _renderScoreScreen({
      scorePct:       scorePct,
      totalCorrect:   totalCorrect,
      totalQuestions: totalQuestions,
      totalAnswered:  totalAnswered,
      durationSecs:   durationSecs,
      passed:         passed,
      topicResults:   topicResults,
      chapterResults: chapterResults,
      weakTopicIds:   weakTopicIds,
      isRetryMode:    _session.isRetryMode
    });
  }

  function _renderScoreScreen(data) {
    // Hide question panel, show score screen
    _el('exam-question-section').setAttribute('hidden', '');
    _el('exam-score-section').removeAttribute('hidden');

    // Verdict banner
    var verdictEl = _el('score-verdict');
    verdictEl.textContent   = data.passed ? STR.pass : STR.fail;
    verdictEl.dataset.state = data.passed ? 'pass' : 'fail';

    // Score ring
    var ringWrap = _el('score-ring-wrap');
    ringWrap.innerHTML = _buildScoreRing(data.scorePct, data.passed);
    // Animate ring after paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var arc     = document.getElementById('score-ring-arc');
        var pctEl   = document.getElementById('score-ring-pct');
        var r       = 54;
        var circ    = 2 * Math.PI * r;
        var offset  = circ - (data.scorePct / 100) * circ;
        if (arc)   arc.style.strokeDashoffset = offset.toFixed(1);
        if (pctEl) {
          var start = 0;
          var end   = data.scorePct;
          var dur   = 1200;
          var t0    = performance.now();
          function tick(now) {
            var elapsed = Math.min(now - t0, dur);
            var val     = Math.round(start + (end - start) * (elapsed / dur));
            pctEl.textContent = val + '%';
            if (elapsed < dur) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    });

    // Stats row
    _el('score-stat-correct').textContent  = data.totalCorrect + ' / ' + data.totalQuestions;
    _el('score-stat-answered').textContent = data.totalAnswered + ' / ' + data.totalQuestions;
    _el('score-stat-time').textContent     = _formatTime(data.durationSecs);

    // Per-topic breakdown
    _renderTopicBreakdown(_el('score-topic-breakdown'), data.topicResults);

    // Per-chapter breakdown
    _renderChapterBreakdown(_el('score-chapter-breakdown'), data.chapterResults);

    // Weak topics list
    var weakList = _el('score-weak-list');
    if (data.weakTopicIds.length > 0) {
      _el('score-weak-section').removeAttribute('hidden');
      weakList.innerHTML = '';
      data.weakTopicIds.forEach(function (tid) {
        var meta = (global.quizTopicMeta || {})[tid] || { label: tid };
        var li   = document.createElement('li');
        li.className   = 'weak-topic-item';
        li.textContent = meta.label;
        weakList.appendChild(li);
      });
    } else {
      _el('score-weak-section').setAttribute('hidden', '');
    }

    // Retry button
    var retryBtn = _el('btn-retry-weak');
    if (data.weakTopicIds.length > 0 && !data.isRetryMode) {
      retryBtn.removeAttribute('hidden');
      retryBtn.addEventListener('click', function () {
        ExamMode.startRetry();
      });
    } else {
      retryBtn.setAttribute('hidden', '');
    }

    // Scroll to score section
    _el('exam-score-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Public API ───────────────────────────────────────────────────────────

  var ExamMode = {

    /**
     * init — called by exam-mode.html's inline script after DOM ready.
     * Wires all button event listeners, prepares UI state.
     */
    init: function () {
      // Start exam button
      document.getElementById('btn-start-exam').addEventListener('click', function () {
        ExamMode.start(false);
      });

      // Start retry button
      var retryStartBtn = document.getElementById('btn-start-retry');
      if (retryStartBtn) {
        retryStartBtn.addEventListener('click', function () {
          ExamMode.startRetry();
        });
      }

      // Next question button
      _el('btn-exam-next').addEventListener('click', function () {
        _submitAnswer();
      });

      // Submit exam button (last question)
      _el('btn-exam-submit').addEventListener('click', function () {
        _submitAnswer();
      });

      // Try again (full exam)
      _el('btn-try-again').addEventListener('click', function () {
        ExamMode.start(false);
      });

      // App init for header/gamification sync
      if (global.App) App.init();

      // Show weak topics count on landing if available
      ExamMode._refreshLandingStats();
    },

    /** Refresh the landing screen stats from Progress state. */
    _refreshLandingStats: function () {
      if (!global.Progress) return;
      var state      = Progress.load();
      var weakCount  = (state.weakTopics || []).length;
      var bestScore  = Progress.getBestExamScore ? Progress.getBestExamScore() : null;
      var recentEl   = document.getElementById('landing-recent-score');
      var weakEl     = document.getElementById('landing-weak-count');

      if (recentEl) {
        recentEl.textContent = bestScore !== null ? bestScore + '%' : '—';
      }
      if (weakEl) {
        weakEl.textContent = weakCount > 0 ? weakCount + ' topic' + (weakCount !== 1 ? 's' : '') : 'None';
      }

      // Show/hide retry button on landing based on whether weak topics exist
      var retryLandingBtn = document.getElementById('btn-start-retry');
      if (retryLandingBtn) {
        if (weakCount > 0) {
          retryLandingBtn.removeAttribute('disabled');
          retryLandingBtn.title = '';
        } else {
          retryLandingBtn.setAttribute('disabled', '');
          retryLandingBtn.title = STR.noWeak;
        }
      }
    },

    /**
     * start — begin a new full exam from the quizData pool.
     * @param {boolean} isRetry  If true, use weak topics only.
     */
    start: function (isRetry) {
      var pool;

      if (isRetry) {
        var state       = global.Progress ? Progress.load() : {};
        var weakTopicIds = state.weakTopics || [];
        if (weakTopicIds.length === 0) {
          alert(STR.noWeak);
          return;
        }
        // Filter quizData to only weak topic questions
        pool = (global.quizData || []).filter(function (q) {
          return weakTopicIds.indexOf(q.topicId) !== -1;
        });
        if (pool.length === 0) {
          alert('No questions found for your weak topics. Try running a full exam first.');
          return;
        }
      } else {
        pool = global.quizData || [];
      }

      // Sample questions
      var count     = Math.min(EXAM_QUESTION_COUNT, pool.length);
      var questions = global.Quiz && Quiz.sample
        ? Quiz.sample(pool, count)
        : pool.slice(0, count);

      _session = _createSession(questions, { isRetryMode: !!isRetry });

      // Transition UI: hide landing, show exam question section
      _el('exam-landing-section').setAttribute('hidden', '');
      _el('exam-score-section').setAttribute('hidden', '');
      _el('exam-question-section').removeAttribute('hidden');

      // Update mode label
      var modeLabelEl = document.getElementById('exam-mode-label');
      if (modeLabelEl) {
        modeLabelEl.textContent = isRetry ? STR.retryLabel : STR.examLabel;
      }

      _renderQuestion();
      _startTimer();

      // Scroll to top of exam
      _el('exam-question-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    /** Shorthand: start retry mode using persisted weak topics. */
    startRetry: function () {
      ExamMode.start(true);
    },

    /** Abort the current exam and return to landing. */
    abort: function () {
      _stopTimer();
      _session = null;
      _el('exam-question-section').setAttribute('hidden', '');
      _el('exam-score-section').setAttribute('hidden', '');
      _el('exam-landing-section').removeAttribute('hidden');
      ExamMode._refreshLandingStats();
    }
  };

  global.ExamMode = ExamMode;

}(window));
