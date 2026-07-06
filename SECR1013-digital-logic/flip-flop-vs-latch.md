---
title: "Flip-Flops vs Latches"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Flip-Flops vs Latches

Both latches and flip-flops are bistable memory devices that store one bit, but they differ in how they respond to time: a latch is level-triggered (sensitive to a voltage level), while a flip-flop is edge-triggered (changes state only on a clock signal's rising or falling edge).

> [!concept] Core Claim
> Latches respond to a sustained voltage level; flip-flops respond only to the instant of a clock transition — this makes flip-flops suitable for synchronous design where timing must be precise.

## Explanation

A latch behaves like a window: while the window is open (EN=1 or HIGH level present), whatever passes through reaches the output. The latch is continuously sensitive during the entire time the enable is HIGH. Any glitch or noise on the input during this window corrupts the stored state.

A flip-flop behaves like a camera shutter: it samples the input at a precise moment (the clock edge) and ignores everything else. Only the input value present at the exact moment of the positive or negative edge transition is captured. Between edges, the flip-flop is completely immune to input changes — this is what makes synchronous digital systems reliable and analysable by static timing tools.

In practice, all modern synchronous digital design uses flip-flops. Latches are used only in specific contexts: input debouncing, transparent pass-through stages in pipeline registers, or as building blocks inside flip-flop implementations.

## Key Points

| Feature          | Latch               | Flip-Flop              |
|------------------|---------------------|------------------------|
| Trigger          | Level (voltage HIGH)| Edge (clock transition)|
| Sensitivity      | During entire HIGH  | Only at clock edge     |
| Timing control   | EN signal           | Clock signal           |
| Noise immunity   | Lower               | Higher                 |
| Use in design    | Asynchronous        | Synchronous            |

## Example

A gated SR latch with EN=1 is "transparent" — input glitches propagate directly to Q during the entire active enable window. A D flip-flop with the same input samples D only at the rising edge of CLK; a 5 ns glitch that arrives between clock edges has zero effect on Q.

> [!recall] A system requires that a data signal be captured reliably once per millisecond from a bus that changes multiple times per millisecond. Should you use a latch or a flip-flop? Justify with reference to the sensitivity window of each device.

## See Also

- [[sr-latch|SR Latch]] — the simplest latch
- [[gated-d-latch|Gated D Latch]] — level-triggered D storage
- [[d-flip-flop|D Flip-Flop]] — edge-triggered D storage
- [[sequential-logic-circuits|Sequential Logic Circuits]] — context in which both are used
