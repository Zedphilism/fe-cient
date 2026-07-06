---
title: "JK Flip-Flop"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# JK Flip-Flop

The JK flip-flop is the most versatile flip-flop type — it operates like an SR flip-flop with J replacing S and K replacing R, but resolves the invalid state by defining J=K=1 as the Toggle condition that complements Q on every active clock edge.

> [!concept] Core Claim
> The JK flip-flop eliminates the SR invalid state: when J=K=1, the output toggles (Q flips) rather than entering an undefined state.

## Explanation

Think of J and K as "Jam 1" and "Kill 1" (mnemonics from early literature). J=1 sets Q to 1 if it wasn't already; K=1 resets Q to 0 if it wasn't already; J=K=1 makes Q do the opposite of what it was — this toggle behaviour is what closes the loophole in SR design.

The toggle mode arises from feedback: J is ANDed with Q' (current output) and K is ANDed with Q before reaching the latch. When J=K=1: if Q=0, then J·Q'=1 effectively sets the FF; if Q=1, then K·Q=1 effectively resets it. Either way, Q flips — never both inputs simultaneously asserted at the internal latch level.

The JK flip-flop can emulate every other flip-flop type: J=K=1 makes it a T flip-flop; wiring J to D and K to D' makes it a D flip-flop. Its universality makes it the standard teaching flip-flop and a common component in ripple counters, where J=K=1 (toggle mode) is always applied.

## Key Points

| CLK ↑ | J | K | Q next   | Comment |
|-------|---|---|----------|---------|
| ↑     | 0 | 0 | Q₀       | Hold    |
| ↑     | 0 | 1 | 0        | Reset   |
| ↑     | 1 | 0 | 1        | Set     |
| ↑     | 1 | 1 | Q₀'      | Toggle  |

## Example

A 1-bit frequency divider: connect J=K=1. Starting Q=0, Q toggles every clock edge: 0→1→0→1→… The output frequency is exactly half the input clock frequency. This is the basic building block of a binary counter.

> [!recall] A JK flip-flop (positive edge) starts at Q=0. J=1, K=1 for 5 clock pulses. Write out Q after each pulse. Now change K to 0 after pulse 3. What is Q after pulse 4 and 5?

## See Also

- [[sr-flip-flop|SR Flip-Flop]] — the predecessor whose invalid state JK resolves
- [[t-flip-flop|T Flip-Flop]] — JK with J=K=T (toggle-only)
- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]] — built from JK FFs all in toggle mode
- [[asynchronous-inputs-preset-clear|Asynchronous Inputs PRE and CLR]] — override inputs on the JK flip-flop
