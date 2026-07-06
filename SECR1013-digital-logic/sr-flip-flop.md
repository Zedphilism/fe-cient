---
title: "SR Flip-Flop"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# SR Flip-Flop

An SR flip-flop is the edge-triggered version of the SR latch — it captures the Set/Reset inputs and updates Q only at the active clock edge, making its state changes predictable and synchronised to the system clock.

> [!concept] Core Claim
> The SR flip-flop samples S and R at the clock edge and holds that state until the next active edge, regardless of how S and R change between edges.

## Explanation

The SR flip-flop works like a snapshot camera: it looks at the scene (S and R inputs) only at the decisive moment (clock edge) and freezes whatever it sees. Between clock edges, S and R can change freely without affecting Q at all.

The operation is identical to the SR latch truth table, but evaluated only at the triggering clock transition. For a positive edge-triggered flip-flop: S=1, R=0 at the rising edge → Q becomes 1 (Set); S=0, R=1 → Q becomes 0 (Reset); S=0, R=0 → Q unchanged (Hold). The invalid state S=R=1 remains a concern — it should be avoided in design because the resulting state is unpredictable.

The SR flip-flop is the historical ancestor of all flip-flop types, but it is rarely used directly in modern design precisely because the invalid state requires external logic to prevent. The JK flip-flop resolves this limitation.

## Key Points

| CLK ↑ | S | R | Q next | Comment      |
|-------|---|---|--------|--------------|
| ↑     | 0 | 0 | Q₀     | Hold         |
| ↑     | 0 | 1 | 0      | Reset        |
| ↑     | 1 | 0 | 1      | Set          |
| ↑     | 1 | 1 | ?      | Invalid      |

(Q₀ = Q value before the clock edge; ↑ = positive edge transition)

## Example

Sequence through 6 clock pulses for a positive-edge SR flip-flop starting RESET (Q=0):

| Pulse | S | R | Q  |
|-------|---|---|----|
| 1     | 0 | 0 | 0  |
| 2     | 1 | 0 | 1  |
| 3     | 0 | 1 | 0  |
| 4     | 1 | 0 | 1  |
| 5     | 0 | 1 | 0  |
| 6     | 0 | 1 | 0  |

> [!recall] Compare: a gated SR latch with EN=1 held for 10 µs vs an SR flip-flop clocked at 1 MHz. If S toggles 5 times during that 10 µs window, how many times does Q change for the latch vs the flip-flop?

## See Also

- [[sr-latch|SR Latch]] — the level-triggered predecessor
- [[jk-flip-flop|JK Flip-Flop]] — eliminates the invalid state (S=R=1)
- [[flip-flop-vs-latch|Flip-Flops vs Latches]] — the key timing distinction
