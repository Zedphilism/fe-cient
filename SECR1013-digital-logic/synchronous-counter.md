---
title: "Synchronous Counter"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Synchronous Counter

A synchronous counter drives all flip-flops from a single shared clock signal so that every stage changes state simultaneously, eliminating the ripple delay of asynchronous counters and allowing much higher operating frequencies.

> [!concept] Core Claim
> Because all FFs see the same clock edge at the same instant, the counter settles in one propagation delay (not N × tpd), making the maximum frequency independent of bit width.

## Explanation

In a ripple counter, the carry signal travels serially through each flip-flop, accumulating delay at every stage. A synchronous counter instead computes the next state of every flip-flop in parallel using combinational logic (AND gates, etc.) before the clock edge arrives. All FFs then load their new state simultaneously on the shared clock edge.

The trade-off is gate logic: each stage needs additional combinational logic to determine when it should toggle. For a simple binary up-counter, FF₀ always toggles (T=1); FF₁ toggles when Q₀=1; FF₂ toggles when Q₀=Q₁=1; FFₙ toggles when all lower bits are 1. This AND chain (carry-look-ahead style) adds gates but limits the critical path to the longest AND chain plus one FF delay, regardless of how many bits the counter has.

Synchronous counters are the standard choice in all modern timing-critical applications: CPUs, FPGAs, ASICs, and digital communication systems. The clean, simultaneous output transitions also eliminate glitches that ripple counters produce when multiple bits change at different instants.

## Key Points

- All FFs share one CLK; all state changes happen simultaneously
- Critical path = combinational carry logic + one tpd (not N × tpd)
- No ripple: glitch-free output transitions
- More gate logic required than asynchronous design
- FF₀: always toggle; FFₙ: toggle when Q₀ · Q₁ · … · Qₙ₋₁ = 1

## Example

2-bit synchronous up-counter: FF₀ J=K=1 (always toggles); FF₁ J=K=Q₀ (toggles only when Q₀=1). Both see the same CLK. At every clock edge, FF₀ toggles; FF₁ only toggles when Q₀ was already 1. Resulting sequence: 00→01→10→11→00 — same as ripple, but all bits change simultaneously.

> [!recall] A 4-bit ripple counter and a 4-bit synchronous counter use the same JK flip-flops (tpd=10 ns). What is f_max for each? Why doesn't the synchronous counter's f_max decrease when you add a 5th bit?

## See Also

- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]] — the simpler alternative with ripple delay
- [[counter-types-and-modulus|Counter Types and Modulus]] — overview of counter types
- [[propagation-delay-limits-digital-circuit-speed|Propagation Delay]] — the constraint synchronous design minimises
