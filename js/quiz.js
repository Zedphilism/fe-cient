/* ============================================================
   quiz.js — Quiz Engine
   NetCore Academy

   Renders questions, evaluates answers, tracks score,
   awards XP, and drives feedback animations.

   Depends on: progress.js, gamification.js (must load first)

   Supports question types:
     "mcq"       — multiple choice (4 options)
     "truefalse" — two-option true / false
     "fillblank" — text input, case-insensitive match
     "match"     — drag-and-drop pair matching

   Usage:
     Quiz.mount(containerEl, questions, options);
     // options: { topicId, onComplete, isExamMode, isRetryMode }
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     TEXT CONSTANTS
  ---------------------------------------------------------- */

  const TEXT = {
    correct:          'Correct!',
    wrong:            'Incorrect',
    explanation_label:'Why:',
    btn_next:         'Next Question',
    btn_finish:       'Finish Quiz',
    btn_check:        'Check Answer',
    btn_retry:        'Try Again',
    fill_placeholder: 'Type your answer…',
    score_title:      'Quiz Complete',
    score_pass:       'Passed',
    score_fail:       'Not Yet',
    score_perfect:    'Perfect Score!',
    score_xp_earned:  'XP Earned',
    score_correct:    'Correct',
    score_total:      'Questions',
    btn_review:       'Review Answers',
    btn_continue:     'Continue',
    no_questions:     'No questions available.',
    match_instruction:'Drag each item to its matching pair.',
    match_check:      'Check Matches',
    match_reset:      'Reset',
    true_label:       'True',
    false_label:      'False'
  };

  const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E'];

  /* ----------------------------------------------------------
     SESSION STATE
     One QuizSession object per mounted quiz instance.
  ---------------------------------------------------------- */

  /**
   * Create a new session object for a quiz run.
   * questions: array of question objects from data files.
   * options: { topicId, onComplete, isExamMode, isRetryMode }
   */
  function createSession(questions, options) {
    return {
      questions:      questions,
      options:        options || {},
      currentIndex:   0,
      answers:        [],       // { qId, correct, firstTry, selectedIndex }
      correctCount:   0,
      startTime:      Date.now(),
      finished:       false,
      isFirstQuizEver: !Progress.load().achievements.includes('first_quiz')
                       && !Progress.load().completedTopics.length
    };
  }

  /* ----------------------------------------------------------
     MOUNT — PUBLIC ENTRY POINT
  ---------------------------------------------------------- */

  /**
   * Mount a quiz into containerEl and render the first question.
   * Returns the session object (useful for exam-mode orchestration).
   */
  function mount(containerEl, questions, options) {
    if (!containerEl) return null;
    if (!questions || !questions.length) {
      containerEl.innerHTML = `<p class="empty-state">${TEXT.no_questions}</p>`;
      return null;
    }

    const session = createSession(questions, options);
    containerEl.dataset.quizSession = '1';
    _renderQuestion(containerEl, session);
    return session;
  }

  /* ----------------------------------------------------------
     QUESTION RENDERERS
  ---------------------------------------------------------- */

  /** Render the current question for a session into containerEl */
  function _renderQuestion(containerEl, session) {
    const q   = session.questions[session.currentIndex];
    const num = session.currentIndex + 1;
    const tot = session.questions.length;

    containerEl.innerHTML = '';
    containerEl.classList.add('quiz-container');

    // Progress dots
    containerEl.appendChild(_buildDots(session));

    // Counter label
    const counter = document.createElement('div');
    counter.className = 'quiz-counter';
    counter.innerHTML = `
      <span class="badge badge-dim">
        ${num} / ${tot}
      </span>`;
    containerEl.appendChild(counter);

    // Question text
    const qEl = document.createElement('p');
    qEl.className = 'quiz-question anim-fade-in-up';
    qEl.textContent = q.question;
    containerEl.appendChild(qEl);

    // Type-specific input
    switch (q.type) {
      case 'truefalse': containerEl.appendChild(_buildTrueFalse(q, session, containerEl)); break;
      case 'fillblank': containerEl.appendChild(_buildFillBlank(q, session, containerEl)); break;
      case 'match':     containerEl.appendChild(_buildMatch(q, session, containerEl));     break;
      default:          containerEl.appendChild(_buildMCQ(q, session, containerEl));
    }
  }

  /* — MCQ — */

  /** Build MCQ options list */
  function _buildMCQ(q, session, containerEl) {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-options stagger';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className   = 'quiz-option anim-fade-in-up';
      btn.dataset.idx = i;
      btn.innerHTML = `
        <span class="option-key">${OPTION_KEYS[i]}</span>
        <span class="option-text">${opt}</span>`;

      btn.addEventListener('click', function () {
        if (containerEl.dataset.answered) return;
        _handleMCQAnswer(i, q, session, containerEl, wrap);
      });

      wrap.appendChild(btn);
    });

    return wrap;
  }

  /** Handle an MCQ answer selection */
  function _handleMCQAnswer(selectedIdx, q, session, containerEl, optionsWrap) {
    containerEl.dataset.answered = '1';
    const isCorrect  = selectedIdx === q.answer;
    const isFirstTry = true;                      // first click = first try in mini-quiz

    // Mark all options
    Array.from(optionsWrap.children).forEach((btn, i) => {
      btn.classList.add('disabled');
      if (i === q.answer)    btn.classList.add('correct');
      if (i === selectedIdx && !isCorrect) btn.classList.add('wrong');
    });

    const selectedBtn = optionsWrap.children[selectedIdx];
    if (isCorrect) {
      Gamification.flashCorrect(selectedBtn);
    } else {
      Gamification.flashWrong(selectedBtn);
    }

    _recordAnswer(session, q, selectedIdx, isCorrect, isFirstTry);
    _showExplanation(q, isCorrect, containerEl);
    _appendNextButton(session, containerEl);
  }

  /* — TRUE / FALSE — */

  /** Build True / False two-button layout */
  function _buildTrueFalse(q, session, containerEl) {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-options quiz-tf';

    [TEXT.true_label, TEXT.false_label].forEach((label, i) => {
      const btn = document.createElement('button');
      btn.className   = 'quiz-option quiz-tf-btn anim-fade-in-up';
      btn.dataset.idx = i;
      btn.innerHTML = `
        <span class="option-key">${i === 0 ? 'T' : 'F'}</span>
        <span class="option-text">${label}</span>`;

      btn.addEventListener('click', function () {
        if (containerEl.dataset.answered) return;
        _handleMCQAnswer(i, q, session, containerEl, wrap);
      });

      wrap.appendChild(btn);
    });

    return wrap;
  }

  /* — FILL IN THE BLANK — */

  /** Build fill-in-the-blank text input */
  function _buildFillBlank(q, session, containerEl) {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-fill-wrap anim-fade-in-up';

    const input = document.createElement('input');
    input.type        = 'text';
    input.className   = 'quiz-fill-input';
    input.placeholder = TEXT.fill_placeholder;
    input.autocomplete = 'off';

    const checkBtn = document.createElement('button');
    checkBtn.className   = 'btn btn-primary btn-sm';
    checkBtn.textContent = TEXT.btn_check;

    const check = () => {
      if (containerEl.dataset.answered) return;
      const val       = input.value.trim();
      if (!val) return;

      const correct   = _checkFillBlank(val, q.answer, q.options);
      containerEl.dataset.answered = '1';
      input.disabled  = true;
      checkBtn.disabled = true;

      if (correct) {
        input.classList.add('fill-correct');
        Gamification.flashCorrect(input);
      } else {
        input.classList.add('fill-wrong');
        Gamification.flashWrong(input);
        // Show correct answer
        const hint = document.createElement('p');
        hint.className   = 'fill-correct-hint';
        hint.textContent = 'Correct answer: ' + _getFillAnswer(q);
        wrap.appendChild(hint);
      }

      _recordAnswer(session, q, val, correct, true);
      _showExplanation(q, correct, containerEl);
      _appendNextButton(session, containerEl);
    };

    checkBtn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });

    wrap.appendChild(input);
    wrap.appendChild(checkBtn);
    return wrap;
  }

  /**
   * Check a fill-blank answer.
   * q.answer is the index into q.options of the correct string.
   * Accepts partial match if the answer starts with the input.
   */
  function _checkFillBlank(val, answerIdx, options) {
    const correct = (options[answerIdx] || '').toLowerCase().trim();
    const given   = val.toLowerCase().trim();
    return given === correct || correct.startsWith(given + ' ') || given.includes(correct);
  }

  /** Return the human-readable correct answer string for fill-blank */
  function _getFillAnswer(q) {
    return q.options ? (q.options[q.answer] || q.answer) : q.answer;
  }

  /* — MATCH — */

  /** Build drag-and-drop match pairs */
  function _buildMatch(q, session, containerEl) {
    /*
      q.options  = ['Term A', 'Term B', ...]       (left column — shuffled)
      q.answer   = ['Def A',  'Def B',  ...]       (right column, parallel)
      Match pairing: options[i] matches answer[i]
    */
    const wrap = document.createElement('div');
    wrap.className = 'quiz-match-wrap anim-fade-in-up';

    const instruction = document.createElement('p');
    instruction.className   = 'match-instruction';
    instruction.textContent = TEXT.match_instruction;
    wrap.appendChild(instruction);

    const grid = document.createElement('div');
    grid.className = 'dnd-container';

    // Left: shuffled terms
    const leftPool = document.createElement('div');
    leftPool.className = 'dnd-source-pool';
    leftPool.id = 'matchSource';

    // Right: drop zones, one per definition
    const rightCol = document.createElement('div');
    rightCol.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

    const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const terms   = [...q.options];

    // Shuffle terms for display
    const shuffled = _shuffle([...terms]);

    shuffled.forEach(term => {
      const chip = document.createElement('div');
      chip.className         = 'dnd-chip';
      chip.draggable         = true;
      chip.dataset.term      = term;
      chip.textContent       = term;
      chip.addEventListener('dragstart', _onDragStart);
      leftPool.appendChild(chip);
    });

    answers.forEach((def, i) => {
      const zone = document.createElement('div');
      zone.className        = 'dnd-drop-zone';
      zone.dataset.defIndex = i;

      const lbl = document.createElement('span');
      lbl.className   = 'dnd-zone-label';
      lbl.textContent = def;

      zone.appendChild(lbl);
      zone.addEventListener('dragover',  _onDragOver);
      zone.addEventListener('drop',      e => _onDrop(e, zone, leftPool));
      zone.addEventListener('dragleave', _onDragLeave);
      rightCol.appendChild(zone);
    });

    grid.appendChild(leftPool);
    grid.appendChild(rightCol);
    wrap.appendChild(grid);

    // Check button
    const checkBtn = document.createElement('button');
    checkBtn.className   = 'btn btn-primary btn-sm';
    checkBtn.textContent = TEXT.match_check;
    checkBtn.style.marginTop = '12px';

    const resetBtn = document.createElement('button');
    resetBtn.className   = 'btn btn-ghost btn-sm';
    resetBtn.textContent = TEXT.match_reset;
    resetBtn.style.marginTop = '12px';

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;';
    btnRow.appendChild(checkBtn);
    btnRow.appendChild(resetBtn);
    wrap.appendChild(btnRow);

    checkBtn.addEventListener('click', () => {
      if (containerEl.dataset.answered) return;
      const result = _evaluateMatch(rightCol, terms, answers);
      containerEl.dataset.answered = '1';
      checkBtn.disabled = true;
      resetBtn.disabled = true;
      _recordAnswer(session, q, result.selections, result.correct, true);
      _showExplanation(q, result.correct, containerEl);
      _appendNextButton(session, containerEl);
    });

    resetBtn.addEventListener('click', () => {
      // Return all chips to source pool
      rightCol.querySelectorAll('.dnd-chip').forEach(chip => {
        chip.classList.remove('dragging');
        leftPool.appendChild(chip);
      });
    });

    return wrap;
  }

  /* Drag-and-drop handlers */
  function _onDragStart(e) {
    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.term);
    e.currentTarget.classList.add('dragging');
  }

  function _onDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('over');
  }

  function _onDragLeave(e) {
    e.currentTarget.classList.remove('over');
  }

  function _onDrop(e, zone, sourcePool) {
    e.preventDefault();
    zone.classList.remove('over');
    const term = e.dataTransfer.getData('text/plain');

    // Return any chip already in this zone to source
    const existing = zone.querySelector('.dnd-chip');
    if (existing) sourcePool.appendChild(existing);

    const chip = sourcePool.querySelector(`[data-term="${CSS.escape(term)}"]`)
               || document.querySelector(`[data-term="${CSS.escape(term)}"]`);
    if (chip) {
      chip.classList.remove('dragging');
      zone.appendChild(chip);
    }
  }

  /** Evaluate all match drop zones; returns { correct, selections } */
  function _evaluateMatch(rightCol, terms, answers) {
    let allCorrect = true;
    const selections = [];

    rightCol.querySelectorAll('.dnd-drop-zone').forEach((zone, i) => {
      const chip = zone.querySelector('.dnd-chip');
      const placed = chip ? chip.dataset.term : null;
      const expected = terms[i];
      const correct  = placed === expected;

      selections.push({ placed, expected, correct });
      if (!correct) allCorrect = false;

      zone.classList.remove('over');
      zone.classList.add(correct ? 'correct-zone' : 'wrong-zone');
      if (chip) chip.classList.add(correct ? 'correct' : 'wrong');
    });

    return { correct: allCorrect, selections };
  }

  /* ----------------------------------------------------------
     ANSWER RECORDING
  ---------------------------------------------------------- */

  /** Push an answer record into the session and update correct count */
  function _recordAnswer(session, q, selected, isCorrect, isFirstTry) {
    session.answers.push({
      qId:           q.id,
      type:          q.type || 'mcq',
      correct:       isCorrect,
      firstTry:      isFirstTry,
      selectedIndex: selected,
      answer:        q.answer
    });
    if (isCorrect) session.correctCount++;
  }

  /* ----------------------------------------------------------
     EXPLANATION
  ---------------------------------------------------------- */

  /** Append the feedback label and explanation block after an answer */
  function _showExplanation(q, isCorrect, containerEl) {
    // Verdict label
    const verdict = document.createElement('div');
    verdict.className = 'quiz-verdict anim-fade-in';
    verdict.innerHTML = isCorrect
      ? `<span class="badge badge-green">✓ ${TEXT.correct}</span>`
      : `<span class="badge badge-red">✗ ${TEXT.wrong}</span>`;
    containerEl.appendChild(verdict);

    // Explanation text
    if (q.explanation) {
      const expEl = document.createElement('div');
      expEl.className = 'quiz-explanation visible anim-fade-in-up';
      expEl.innerHTML = `<strong>${TEXT.explanation_label}</strong> ${q.explanation}`;
      containerEl.appendChild(expEl);
    }
  }

  /* ----------------------------------------------------------
     PROGRESS DOTS
  ---------------------------------------------------------- */

  /** Build the question progress dot strip */
  function _buildDots(session) {
    const wrap = document.createElement('div');
    wrap.className = 'question-dots';
    wrap.id = 'quizDots';

    session.questions.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'q-dot';
      if (i === session.currentIndex) dot.classList.add('current');
      else if (i < session.currentIndex) {
        const prev = session.answers[i];
        dot.classList.add(prev && prev.correct ? 'correct' : 'wrong');
      }
      wrap.appendChild(dot);
    });

    return wrap;
  }

  /* ----------------------------------------------------------
     NEXT BUTTON
  ---------------------------------------------------------- */

  /** Append the Next / Finish button after answering */
  function _appendNextButton(session, containerEl) {
    const isLast = session.currentIndex >= session.questions.length - 1;
    const btn    = document.createElement('button');
    btn.className   = 'btn btn-primary btn-block anim-fade-in-up delay-3';
    btn.textContent = isLast ? TEXT.btn_finish : TEXT.btn_next;
    btn.style.marginTop = '20px';

    btn.addEventListener('click', () => {
      if (isLast) {
        _finishQuiz(session, containerEl);
      } else {
        session.currentIndex++;
        delete containerEl.dataset.answered;
        _renderQuestion(containerEl, session);
      }
    });

    containerEl.appendChild(btn);
  }

  /* ----------------------------------------------------------
     FINISH / SCORE SCREEN
  ---------------------------------------------------------- */

  /** Called when the last question is answered — show score screen */
  function _finishQuiz(session, containerEl) {
    session.finished   = true;
    session.endTime    = Date.now();
    session.durationMs = session.endTime - session.startTime;

    const total   = session.questions.length;
    const correct = session.correctCount;
    const pct     = Math.round((correct / total) * 100);
    const passed  = pct >= 70;    // 70% pass threshold for mini-quizzes
    const perfect = correct === total;

    // Award XP via Progress
    const isFirstTry = session.answers.every(a => a.firstTry);
    const xpResult   = Progress.recordQuizResult({
      topicId:       session.options.topicId || 'unknown',
      score:         correct,
      total,
      isFirstTry,
      isFirstQuizEver: session.isFirstQuizEver
    });

    // Render score screen
    _renderScoreScreen(containerEl, {
      correct, total, pct, passed, perfect,
      xpGained: xpResult.xpGained,
      session
    });

    // Fire onComplete callback if provided
    if (typeof session.options.onComplete === 'function') {
      session.options.onComplete({
        correct, total, pct, passed, perfect,
        answers:   session.answers,
        xpGained:  xpResult.xpGained,
        durationMs: session.durationMs
      });
    }
  }

  /** Render the score summary screen */
  function _renderScoreScreen(containerEl, data) {
    const { correct, total, pct, passed, perfect, xpGained } = data;
    const ringCirc = 2 * Math.PI * 52;   // r=52 → ~326.7
    const offset   = ringCirc * (1 - pct / 100);

    containerEl.innerHTML = `
      <div class="score-screen">

        <div class="score-ring-wrap" style="width:120px;height:120px;">
          <svg width="120" height="120" viewBox="0 0 120 120"
               style="transform:rotate(-90deg);">
            <circle class="score-ring-track" cx="60" cy="60" r="52"/>
            <circle class="score-ring-fill ${passed ? 'pass' : 'fail'}"
                    id="scoreRingFill"
                    cx="60" cy="60" r="52"
                    style="stroke-dasharray:${ringCirc.toFixed(1)};stroke-dashoffset:${ringCirc.toFixed(1)};"/>
          </svg>
          <div class="score-ring-label">
            <span class="score-pct ${passed ? 'pass' : 'fail'}">${pct}%</span>
            <span class="score-verdict">${passed ? TEXT.score_pass : TEXT.score_fail}</span>
          </div>
        </div>

        <div class="score-meta">
          <div class="score-meta-item">
            <span class="score-meta-value">${correct}</span>
            <span class="score-meta-label">${TEXT.score_correct}</span>
          </div>
          <div class="score-meta-item">
            <span class="score-meta-value">${total}</span>
            <span class="score-meta-label">${TEXT.score_total}</span>
          </div>
          <div class="score-meta-item">
            <span class="score-meta-value" style="color:var(--accent-green);">+${xpGained}</span>
            <span class="score-meta-label">${TEXT.score_xp_earned}</span>
          </div>
        </div>

        ${perfect ? `<span class="badge badge-cyan anim-scale-in">${TEXT.score_perfect}</span>` : ''}

        <button class="btn btn-primary btn-block" id="scoreContBtn">
          ${TEXT.btn_continue}
        </button>
      </div>`;

    // Animate ring fill after paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        const ring = document.getElementById('scoreRingFill');
        if (ring) ring.style.strokeDashoffset = offset;
      }, 100);
    });

    // Animate XP counter
    const xpMetaEl = containerEl.querySelector('.score-meta-item:last-child .score-meta-value');
    if (xpMetaEl) {
      Gamification.animateCounter(xpMetaEl, 0, xpGained, 800);
    }

    // Flash card
    Gamification.flashXP(containerEl);

    // Continue button
    const contBtn = document.getElementById('scoreContBtn');
    if (contBtn && typeof data.session.options.onContinue === 'function') {
      contBtn.addEventListener('click', data.session.options.onContinue);
    } else if (contBtn) {
      // Default: clear the quiz container
      contBtn.addEventListener('click', () => {
        containerEl.innerHTML = '';
        containerEl.removeAttribute('data-quiz-session');
      });
    }
  }

  /* ----------------------------------------------------------
     UTILITIES
  ---------------------------------------------------------- */

  /** Fisher-Yates shuffle — returns a new shuffled array */
  function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Return N random questions from a pool.
   * Optionally filter by chapter: 'ch1' | 'ch2' | null (all).
   */
  function sample(pool, n, chapter) {
    let filtered = chapter
      ? pool.filter(q => q.chapter === chapter)
      : [...pool];
    return _shuffle(filtered).slice(0, n);
  }

  /**
   * Group an array of questions by their topicId.
   * Returns { [topicId]: [questions] }
   */
  function groupByTopic(questions) {
    return questions.reduce((acc, q) => {
      const key = q.id ? q.id.split('-').slice(0, 2).join('-') : 'unknown';
      (acc[key] = acc[key] || []).push(q);
      return acc;
    }, {});
  }

  /* ----------------------------------------------------------
     STYLE INJECTION
     Minimal inline rules for fill-blank and match not in components.css
  ---------------------------------------------------------- */

  (function injectStyles() {
    if (document.getElementById('quiz-js-styles')) return;
    const s = document.createElement('style');
    s.id = 'quiz-js-styles';
    s.textContent = `
      .quiz-counter { margin-bottom: 12px; }
      .quiz-verdict { margin-top: 14px; }

      .quiz-tf { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

      .quiz-fill-wrap { display: flex; flex-direction: column; gap: 10px; }

      .quiz-fill-input {
        width: 100%;
        background: var(--bg-secondary);
        border: 1px solid var(--border-glass);
        border-radius: var(--radius-md);
        padding: 12px 16px;
        font-family: var(--font-display);
        font-size: 0.84rem;
        color: var(--text-primary);
        outline: none;
        transition: border-color 0.2s;
      }
      .quiz-fill-input:focus { border-color: var(--border-accent); }
      .quiz-fill-input.fill-correct { border-color: rgba(0,255,136,0.5); color: var(--accent-green); }
      .quiz-fill-input.fill-wrong   { border-color: rgba(255,51,102,0.5); color: var(--accent-red); }

      .fill-correct-hint {
        font-family: var(--font-display);
        font-size: 0.72rem;
        color: var(--accent-cyan);
        letter-spacing: 0.04em;
      }

      .quiz-match-wrap { display: flex; flex-direction: column; gap: 12px; }
      .match-instruction { font-size: 0.74rem; color: var(--text-muted); font-style: italic; }

      .dnd-chip.correct { border-color: rgba(0,255,136,0.5); color: var(--accent-green); }
      .dnd-chip.wrong   { border-color: rgba(255,51,102,0.5); color: var(--accent-red);   }
    `;
    document.head.appendChild(s);
  })();

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */

  window.Quiz = {
    // Core
    mount,
    sample,
    groupByTopic,

    // Utilities
    shuffle: _shuffle
  };

})();
