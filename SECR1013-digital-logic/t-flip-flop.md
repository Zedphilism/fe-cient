---
title: "T Flip-Flop"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# T Flip-Flop

The T (Toggle) flip-flop has a single input T that controls whether Q holds or toggles on the active clock edge: T=0 holds the current state, T=1 complements Q — making it the natural building block for binary counters.

> [!concept] Core Claim
> When T=1, the T flip-flop flips its output on every active clock edge; when T=0, it holds — one JK flip-flop with J=K=T implements T flip-flop behaviour exactly.

## Explanation

Think of a T flip-flop as a light switch that flips every time you press it (T=1) but does nothing when you don't press it (T=0). Each press inverts the state from off to on or on to off. This toggle property means the output's frequency is exactly half the input clock frequency when T is permanently HIGH.

The T flip-flop is derived from the JK flip-flop: connect J and K together to a single terminal T. When T=0 → J=K=0 → Hold. When T=1 → J=K=1 → Toggle. A T flip-flop can therefore be built from any JK flip-flop by tying J and K together.

Cascaded T flip-flops with T permanently HIGH form a ripple (asynchronous) binary counter: Q₀ toggles every clock pulse (LSB), Q₁ toggles every time Q₀ goes HIGH-to-LOW, Q₂ every time Q₁ goes HIGH-to-LOW, and so on. Each stage divides the previous stage's frequency by 2, producing the binary count sequence automatically.

## Key Points

| CLK ↑ | T | Q next | Comment |
|-------|---|--------|---------|
| ↑     | 0 | Q₀     | Hold    |
| ↑     | 1 | Q₀'    | Toggle  |

- T flip-flop = JK flip-flop with J = K = T
- Output frequency = input clock frequency ÷ 2 when T=1 always
- n cascaded T flip-flops with T=1 divide frequency by 2ⁿ

## Example

Timing diagram for a T flip-flop (negative edge triggered, T=1, starts Q=0):

CLK: ‾\_‾\_‾\_‾\_
Q:   0 1 0 1 0

Q changes on every falling edge of CLK. If CLK = 10 MHz, Q oscillates at 5 MHz — a divide-by-2 circuit.

> [!recall] Three T flip-flops are cascaded (Q of each drives CLK of the next), all with T=1, negative edge triggered. The external clock is 8 MHz. What is the frequency of the output from the third flip-flop? What binary count sequence does the three Q outputs produce?

## See Also

- [[jk-flip-flop|JK Flip-Flop]] — parent circuit; T FF = JK with J=K=T
- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]] — built by cascading T flip-flops
- [[d-flip-flop|D Flip-Flop]] — the other primary flip-flop type used in storage
