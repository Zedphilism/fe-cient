---
status: awaiting_human_verify
trigger: "Fix all interactive simulations across chapter1.html and chapter2.html so every section has a working, correctly wired simulation."
created: 2026-05-16T00:00:00Z
updated: 2026-05-16T00:01:00Z
---

## Current Focus

hypothesis: CONFIRMED — buildShell(simId) uses simId as DOM ID prefix. Multiple mount points with same simId → duplicate IDs → getElementById finds wrong element.
test: Refactor infrastructure (instanceId scoping) + rename duplicate sim IDs + add 8 new builders
expecting: Every section's buttons control only that section's sim; no duplicate DOM IDs; all builders registered
next_action: Awaiting human verification that buttons in all sections control only their own sim

## Symptoms

expected: Every section's simulation responds to its own Next/Auto-Play/Reset buttons independently
actual: Multiple sections share the same data-sim-id, so buildShell() creates duplicate DOM IDs. makeController() wires buttons via getElementById which always finds the FIRST element — so later sections' buttons control earlier sections' already-completed sims.
errors: No runtime errors; silent misbehavior — buttons on later sections control earlier sections' sims
reproduction: Open chapter2.html, complete section 1 (sim-client-server), advance to section 2 (also sim-client-server), click Next — section 1's sim advances, not section 2's
started: Always present (architectural flaw from initial implementation)

## Eliminated

- hypothesis: Browser caching causing stale sim state
  evidence: Reproducible in fresh browser; root cause is DOM ID collision, not caching
  timestamp: 2026-05-16T00:00:00Z

## Evidence

- timestamp: 2026-05-16T00:00:00Z
  checked: js/animations.js buildShell() function (line 56)
  found: Uses `simId + '-host'`, `simId + '-next'`, `simId + '-log'` etc as DOM IDs
  implication: When two mount points share the same simId, identical DOM IDs are created in the document

- timestamp: 2026-05-16T00:00:00Z
  checked: js/animations.js makeController() function (line 323)
  found: Uses `document.getElementById(simId + '-next')` etc — always returns FIRST match in document
  implication: Any mount point rendered after the first with the same simId will have its buttons wire to the first instance's elements

- timestamp: 2026-05-16T00:00:00Z
  checked: chapter1.html sim-mount-point elements
  found: sim-mount-ch1-protocols uses sim-client-server; sim-mount-ch1-access also uses sim-client-server
  implication: Chapter 1 has 2 mounts colliding on sim-client-server

- timestamp: 2026-05-16T00:00:00Z
  checked: chapter2.html sim-mount-point elements
  found: ch2-p2p, ch2-app-protocols, ch2-email all use sim-client-server; ch2-addressing reuses sim-socket; ch2-http-char and ch2-http-flow reuse sim-http-request; ch2-tcp-udp reuses sim-tcp-vs-udp
  implication: Widespread collision across all 12 chapter 2 sections

## Resolution

root_cause: buildShell() and makeController() scope DOM IDs to simId, not to the individual mount point instance. When multiple containers use the same simId, duplicate IDs are created and getElementById always resolves to the first — causing all subsequent instances to silently control the first.
fix: (1) Add instanceId parameter (derived from containerEl.id) to buildShell, makeController, setLog, setStatus so each mounted instance gets a unique DOM scope. (2) Assign unique, content-appropriate sim IDs in HTML and register 8 new builders for the renamed IDs.
verification: Self-verified — zero duplicate data-sim-id values remain (sim-tcp-vs-udp appears twice but on containers with distinct element IDs, yielding distinct instanceIds). All 15 used sim IDs have registered builders. instanceId scoping confirmed via code review: buildShell, makeController, setLog, setStatus all use instanceId for DOM operations.
files_changed:
  - js/animations.js
  - chapter1.html
  - chapter2.html
