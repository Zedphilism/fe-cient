---
title: "Gated D Latch"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Gated D Latch

A gated D latch eliminates the invalid state of the SR latch by connecting a single data input D to S and its complement D' to R, so the latch stores whatever logic level appears on D whenever the Enable is HIGH.

> [!concept] Core Claim
> By forcing S and R to always be complements of each other, the D latch makes S=R=1 impossible — when EN=1, Q always tracks D.

## Explanation

The invalid state in an SR latch requires S=R=1 simultaneously. The D latch prevents this structurally: a single NOT gate between D and R ensures that R is always D'. If D=1 then S=1 and R=0 (Set); if D=0 then S=0 and R=1 (Reset). The combinations S=R=0 (hold) and S=R=1 (invalid) can never occur from a single D input through an inverter.

The latch is called "transparent" when EN=1: the output Q follows D in real time — as D changes, Q changes immediately (with propagation delay). When EN=0, Q holds its last captured value regardless of subsequent changes on D. This transparency-while-enabled behavior is why the D latch is the foundation of level-sensitive registers and the input stage of master-slave flip-flops.

## Key Points

| EN | D | Q Output | Comment            |
|----|---|----------|--------------------|
| 0  | X | No Change| Holds last state   |
| 1  | 0 | Q = 0    | Reset              |
| 1  | 1 | Q = 1    | Set (Q follows D)  |

## Example

A 7-segment LED display driver: D latch captures display data (BCD digit) when EN pulses HIGH, then holds the digit visible on-screen while EN=0, even as the internal bus switches to drive another digit. Without the latch, the display would flicker as the bus changes.

> [!recall] A gated D latch has EN=1 and D=1 (Q=1). D then changes to 0. What is Q? If EN then drops to 0 and D changes back to 1, what is Q? What does this tell you about timing requirements?

## See Also

- [[gated-sr-latch|Gated SR Latch]] — the parent circuit that D latch modifies
- [[d-flip-flop|D Flip-Flop]] — the edge-triggered version of this latch
- [[flip-flop-vs-latch|Flip-Flops vs Latches]] — level-triggered vs edge-triggered behaviour
