---
status: awaiting_human_verify
trigger: "After completing the quiz in section 1 of chapter1.html, section 2 stays locked instead of unlocking. XP updates correctly on index.html (localStorage writes work), but the chapter page doesn't reflect the unlock — no console errors."
created: 2026-05-16T00:00:00Z
updated: 2026-05-16T00:01:00Z
---

## Current Focus

hypothesis: CONFIRMED — .section-lock-overlay has unconditional display:flex with no CSS rule to hide it when the parent loses topic-section--locked. Removing the class from the parent (which JS does correctly) restores opacity but leaves the overlay div permanently visible on top of the content.
test: Traced full call chain from quiz completion to DOM mutation; verified CSS rules for both the locked section and the overlay.
expecting: Adding display:none scoped to the non-locked parent will hide the overlay when JS removes the class.
next_action: Add CSS rule to style.css

## Symptoms

expected: Finishing quiz in section 1 (topic: ch1-internet) unlocks section 2
actual: Section 2 stays locked with `.topic-section--locked` class and `.section-lock-overlay` visible
errors: None in browser console
reproduction: Open chapter1.html → complete all questions in section 1 quiz → quiz ends → section 2 remains locked
started: Freshly built project, first test
xp_behavior: XP updates on index.html (localStorage is being written), but chapter 1 page sections do not unlock

## Eliminated

- hypothesis: onComplete callback not wired or uses wrong topic ID
  evidence: Inline script in chapter1.html correctly calls App.onTopicQuizComplete(section.id, result, 'ch1') with section.id='ch1-internet'. App.onTopicQuizComplete is exported and maps to _onTopicQuizComplete in app.js. Topic IDs match CH1_TOPICS sequence.
  timestamp: 2026-05-16T00:01:00Z

- hypothesis: _unlockNextSection fails to find the next section DOM element or compute the next ID
  evidence: Progress.CH1_TOPICS = ['ch1-internet','ch1-protocols','ch1-structure','ch1-access']. indexOf('ch1-internet')=0, next='ch1-protocols'. document.querySelector('[data-section-id="ch1-protocols"]') targets line 195 of chapter1.html which exists. classList.remove('topic-section--locked') runs correctly.
  timestamp: 2026-05-16T00:01:00Z

- hypothesis: Progress.unlockSection fails to persist or emits no event
  evidence: unlockSection in progress.js pushes to state.unlockedSections and saves. XP behavior confirms localStorage writes work. The unlock state is persisted correctly; the DOM update is the problem.
  timestamp: 2026-05-16T00:01:00Z

## Evidence

- timestamp: 2026-05-16T00:01:00Z
  checked: css/style.css lines 692–713
  found: .section-lock-overlay has display:flex unconditionally. There is no rule scoped to .topic-section--locked .section-lock-overlay or :not(.topic-section--locked) to control visibility. The overlay is always rendered.
  implication: When JS removes topic-section--locked from the parent section element (which it does correctly), the overlay div remains fully visible (display:flex, position:absolute, inset:0, z-index:5) covering all section content. This is the root cause.

- timestamp: 2026-05-16T00:01:00Z
  checked: css/style.css lines 653–657
  found: .topic-section--locked sets opacity:0.42, pointer-events:none, filter:saturate(0.3). No display:none on the section itself.
  implication: JS correctly removes the class, restoring opacity and pointer-events on the section wrapper, but the overlay child element is unaffected.

- timestamp: 2026-05-16T00:01:00Z
  checked: app.js _unlockNextSection (lines 334–356)
  found: Correctly removes topic-section--locked, updates badge, adds animation class, scrolls into view. DOM manipulation is correct — only the CSS is missing.
  implication: The JS logic is sound; no code changes needed. Only CSS fix required.

## Resolution

root_cause: .section-lock-overlay uses display:flex unconditionally. There is no CSS rule that hides it when the parent .topic-section loses the .topic-section--locked modifier class. So even after JS correctly removes the locked class, the overlay div remains covering the section content at z-index:5, making it appear the section is still locked.
fix: Add one CSS rule to style.css immediately after the .section-lock-overlay block: .topic-section:not(.topic-section--locked) .section-lock-overlay { display: none; }
verification: CSS rule added to style.css line 716. Rule .topic-section:not(.topic-section--locked) .section-lock-overlay { display: none; } ensures the overlay is hidden whenever the parent section does not carry the locked modifier. JS in _unlockNextSection already correctly removes topic-section--locked on quiz completion — no JS changes required.
files_changed: [css/style.css]
