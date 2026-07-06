---
title: "SR Latch"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# SR Latch

An SR latch is the most fundamental sequential memory element — a pair of cross-coupled gates that store one bit by feeding each gate's output back to the other gate's input, creating two stable states that persist without a clock.

> [!concept] Core Claim
> The SR latch stores a single bit through regenerative feedback between two cross-coupled gates, with S (Set) asserting Q=1 and R (Reset) asserting Q=0.

## Explanation

Think of the SR latch as a light switch with two buttons: pressing S turns the light on and it stays on; pressing R turns it off and it stays off. Neither button needs to be held down — the state latches in place through feedback. This is the key distinction from a pure combinational gate: the output feeds back into the input, creating a self-sustaining state.

The mechanism in an active-HIGH SR latch (built from cross-coupled NOR gates): when S=1, R=0, the S gate forces Q=1 and Q'=0. Releasing S to 0 while R stays 0 keeps Q=1 because Q is now feeding back to reinforce the state. When R=1, S=0, the latch resets to Q=0. The no-change condition (S=0, R=0) holds the prior state in place indefinitely.

The invalid state occurs when S=R=1 simultaneously: both outputs are forced to 0 (or both to 1 in NAND implementations), violating the Q/Q' complementary requirement. When S and R then return to 0 together, the latch's final state becomes unpredictable — racing between both stable states. This is the fundamental limitation of the basic SR latch.

## Key Points

**Active-HIGH SR Latch (NOR-based)**
| S | R | Q   | Q'  | Comment     |
|---|---|-----|-----|-------------|
| 0 | 0 | NC  | NC  | Hold        |
| 0 | 1 | 0   | 1   | Reset       |
| 1 | 0 | 1   | 0   | Set         |
| 1 | 1 | 0   | 0   | Invalid     |

**Active-LOW SR Latch (NAND-based)**: S and R inputs are inverted — S=0 sets, R=0 resets; S=1, R=1 holds; S=0, R=0 is invalid.

## Example

A switch-debounce circuit uses an SR latch. A mechanical switch that physically bounces between contacts generates multiple 0/1 transitions. Feeding the two contacts into S and R of an SR latch produces a single clean Q output: the first contact triggers Set, subsequent bounces on the same contact are absorbed as hold states.

> [!recall] An SR latch (active-HIGH) is in the Reset state (Q=0). Inputs change to S=1, R=1, then both go to 0 simultaneously. What is Q? Why can't this be determined from the truth table?

## See Also

- [[gated-sr-latch|Gated SR Latch]] — adds EN input to control when state can change
- [[sequential-logic-circuits|Sequential Logic Circuits]] — the category SR latches belong to
- [[active-high-vs-active-low|Active-High and Active-Low]] — determines which input value triggers Set/Reset
