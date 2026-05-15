---
status: awaiting_human_verify
trigger: "Investigate why Chapter 1 Section 3 simulation doesn't work + full project sweep"
created: 2026-05-16T00:00:00Z
updated: 2026-05-16T00:00:00Z
---

## Current Focus

hypothesis: CONFIRMED — dual duplicate simId causes DOM element ID collision and broken controls
test: Traced animations.js buildShell() — all element IDs are based on simId string
expecting: Renaming Section 3 mount to sim-network-core and registering a new builder resolves the collision
next_action: Apply all fixes, verify

## Symptoms

expected: Section 3 of chapter1.html has an interactive network simulation (data-sim-id mount point) that should render and be interactive
actual: The simulation for section 3 doesn't work (exact failure mode unknown — may not render, may error, may be blank)
errors: Unknown
reproduction: Open chapter1.html → unlock section 3 by completing sections 1 and 2's quizzes → observe section 3 simulation mount point
started: Unknown

## Eliminated

- hypothesis: sim-packet-flow simply not registered in animations.js
  evidence: animations.js SIM_BUILDERS does register sim-packet-flow; the issue is a duplicate ID collision
  timestamp: 2026-05-16

## Evidence

- timestamp: 2026-05-16
  checked: chapter1.html Section 3 sim mount point (line 340)
  found: data-sim-id="sim-packet-flow" — same ID as Section 1's mount point (line 153)
  implication: Two DOM elements share the same simId; animations.js buildShell() creates element IDs like ${simId}-host, ${simId}-next, ${simId}-auto, etc., causing duplicate IDs in the document

- timestamp: 2026-05-16
  checked: animations.js makeController() (line 329-384)
  found: Uses document.getElementById(simId + '-next') etc. to wire button event listeners; with duplicate IDs, only the FIRST element of each ID is found — Section 3 controls are wired to Section 1's already-rendered buttons (which no longer exist in the correct context) or silently fail
  implication: Section 3 simulation either renders a blank container or has non-functional controls

- timestamp: 2026-05-16
  checked: animations.js runSimulation() (line 980-981)
  found: stopSimulation(simId) is called before building — kills the Section 1 sim when Section 3 enters viewport
  implication: Section 1 sim is destroyed when user scrolls to Section 3

- timestamp: 2026-05-16
  checked: app.js _refreshChapterProgress() (line 369-375)
  found: Looks for getElementById(chapterKey + 'ProgressRing') → 'ch1ProgressRing'; HTML has id="ch1-progress-ring" (hyphenated)
  implication: Chapter progress ring never animates on quiz completion

- timestamp: 2026-05-16
  checked: app.js injectStyles() (line 624-653)
  found: Guard checks getElementById('app-js-styles') but sets s.id = 's-js-styles' — guard never fires, styles injected on every init call
  implication: Minor redundant style injection; no functional breakage but wasteful

- timestamp: 2026-05-16
  checked: gamification.js cacheHeaderEls() (line 58-65)
  found: Looks for IDs 'rankTitle', 'levelNumber', 'xpValue', 'xpToNext', 'xpBarFill'; chapter pages use 'header-rank-title', 'header-level', 'header-xp-label', 'header-xp-fill'
  implication: syncHeader() silently does nothing on chapter pages — XP bar, level, rank never update after earning XP

- timestamp: 2026-05-16
  checked: app.js _attachModalListeners() (line 499-512)
  found: Wires .modal-overlay/.modal-close (dynamic modals only); static chapter HTML modals use BEM .modal/.modal__backdrop/[data-modal-close] — close button for static modal never wired
  implication: Static keyboard shortcuts modal close button (✕) doesn't work

- timestamp: 2026-05-16
  checked: app.js _setupChapterQuizCallbacks() (line 298)
  found: Queries '.quiz-mount[data-topic-id]'; HTML uses '.quiz-mount-point[data-quiz-topic]' — selector never matches
  implication: This code path is dead; quizzes still work via inline script. No double-mounting issue since inline script runs and this dead code never fires.

- timestamp: 2026-05-16
  checked: exam-mode.html script load order (line 584-593)
  found: data/chapter1-data.js → data/chapter2-data.js → data/quiz-data.js → progress.js → gamification.js → quiz.js → animations.js → app.js → exam-mode.js
  implication: Correct — quiz-data.js loads after chapter data files, so window.chapter1Data and window.chapter2Data are defined when buildExamPool() runs

- timestamp: 2026-05-16
  checked: exam-mode.js question type handling
  found: Handles mcq, truefalse, fillblank, match — all 4 types covered
  implication: No missing type handlers

- timestamp: 2026-05-16
  checked: progress.js completeTopic() and unlockSection()
  found: completeTopic() saves to localStorage, emits 'progress:topic'; unlockSection() saves and emits 'progress:unlock'; both correct
  implication: No bug in progress tracking

- timestamp: 2026-05-16
  checked: gamification.js XP/badge wiring
  found: attachProgressListeners() wires progress:xp → showXPToast + syncHeader; progress:levelup → showLevelUpOverlay; progress:badge → showBadgeToast. XP is awarded in quiz.js via Progress.recordQuizResult() which emits progress:xp. Wire is complete.
  implication: XP system works end-to-end IF syncHeader() finds the correct DOM elements (fixed above)

- timestamp: 2026-05-16
  checked: chapter2.html sim IDs vs animations.js registry
  found: ch2 uses: sim-client-server (×5), sim-socket (×2), sim-tcp-vs-udp (×2), sim-http-request (×3), sim-persistent-http (×1) — all registered. Same duplicate-ID risk: sim-client-server is used in 5 separate section mounts. However ch2 sections are all gated (locked until unlocked) so only one section's viewport is typically visible at a time, reducing collision severity. Still, all 5 sim-client-server mount points share element IDs.
  implication: Chapter 2 has the same duplicate-ID pattern but less visible since sections unlock sequentially. Not fixed in this session — flagged for follow-up.

## Resolution

root_cause: Chapter 1 Section 3 simulation mount uses data-sim-id="sim-packet-flow", identical to Section 1's mount. animations.js buildShell() constructs all control element IDs from the simId string, causing duplicate DOM IDs. makeController() uses getElementById() which returns the first matching element — wiring Section 3's buttons to Section 1's already-rendered sim controls. The IntersectionObserver also calls stopSimulation('sim-packet-flow') when Section 3 enters the viewport, destroying Section 1's running sim.

fix: |
  1. Renamed chapter1.html Section 3 mount to data-sim-id="sim-network-core"
  2. Added buildNetworkCore() function to animations.js with a new sim about the network edge/access/core structure, registered as 'sim-network-core' in SIM_BUILDERS
  3. Fixed app.js _refreshChapterProgress() to use hyphenated IDs (ch1-progress-ring, ch1-ring-pct) matching the actual HTML
  4. Fixed app.js injectStyles() ID guard: was checking 'app-js-styles' but setting s.id='s-js-styles'; corrected to 'app-js-styles'
  5. Fixed gamification.js cacheHeaderEls() to look for chapter-page header IDs (header-rank-title, header-level, header-xp-label, header-xp-fill) with fallback to legacy IDs
  6. Fixed app.js _attachModalListeners() to also wire static BEM modals (.modal__backdrop, [data-modal-close])

verification: pending human verification
files_changed:
  - chapter1.html
  - js/animations.js
  - js/app.js
  - js/gamification.js
