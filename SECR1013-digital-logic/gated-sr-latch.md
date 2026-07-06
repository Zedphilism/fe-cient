---
title: "Gated SR Latch"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Gated SR Latch

A gated SR latch adds an Enable (EN) input to the basic SR latch, making the latch transparent and responsive to S and R only when EN is HIGH, and completely ignoring input changes when EN is LOW.

> [!concept] Core Claim
> The EN input acts as a gate: EN=1 opens the latch to S and R inputs; EN=0 locks the current state regardless of what S and R do.

## Explanation

Think of the gated SR latch as a door with a lock. The SR inputs are people trying to enter; EN is the key. When the key is turned (EN=1), whoever arrives (S or R) affects the state. When the key is removed (EN=0), the door is locked and no input can change what's inside.

The implementation adds two AND gates in front of the SR latch's S and R inputs. The EN signal is ANDed with each. When EN=0, both AND gate outputs are 0 regardless of S and R — the inner latch sees S=R=0, which is the hold condition. When EN=1, the AND gates pass S and R through to the inner latch as normal.

This gating solves a key problem with the basic SR latch: inputs cannot be changed safely while the latch is sensitive. By raising EN only during the brief moment you want to update the state and holding it low otherwise, you gain control over when state changes happen — a step toward synchronous design.

## Key Points

| EN | S | R | Q Output | Comment       |
|----|---|---|----------|---------------|
| 0  | X | X | No Change| Latch locked  |
| 1  | 0 | 0 | No Change| Hold          |
| 1  | 1 | 0 | Q = 1    | Set           |
| 1  | 0 | 1 | Q = 0    | Reset         |
| 1  | 1 | 1 | Invalid  | Avoid         |

## Example

A 4-bit register made of four gated D latches (derived from gated SR): EN is driven by a common "write enable" control line. When EN=0, all four latches hold their bits. When EN=1, all four latches simultaneously capture new data from the D inputs.

> [!recall] A gated SR latch has EN=1 and S=1. EN then drops to 0 while S remains 1. What happens to Q? What would happen in a basic SR latch without EN?

## See Also

- [[sr-latch|SR Latch]] — the ungated version this extends
- [[gated-d-latch|Gated D Latch]] — eliminates invalid state by deriving R from S
- [[flip-flop-vs-latch|Flip-Flops vs Latches]] — why edge-triggering is preferred over level-gating
