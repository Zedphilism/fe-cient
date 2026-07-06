---
title: "XNOR Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# XNOR Gate

An XNOR (exclusive NOR) gate outputs HIGH when both inputs have the same value, and LOW when they differ — it is a 1-bit equality comparator.

> [!concept] Core Claim
> XNOR is the complement of XOR: wherever XOR detects a difference (output 1), XNOR confirms equality (output 1), making it the hardware primitive for comparing two bits and confirming they match.

## Explanation

Think of XNOR as a matching test: two twins either both wear red (both 1) or both wear blue (both 0) — in either case they match and XNOR outputs 1. If one wears red and the other wears blue, they don't match and XNOR outputs 0. The gate outputs 1 only when both inputs tell the same story.

The mechanism is F = (A⊕B)' = AB + A'B'. The first term AB covers the case where both are 1; the second term A'B' covers the case where both are 0. Both cases represent "matching inputs" — the gate fires for agreement, not disagreement.

For multi-bit equality checks, XNOR scales elegantly: run each pair of corresponding bits through its own XNOR gate, then AND all the XNOR outputs together. If every pair matches (every XNOR outputs 1), the AND outputs 1, confirming full equality. If any single pair differs (any XNOR outputs 0), the AND outputs 0, indicating a mismatch. This is how digital equality comparators are built for ALUs and memory address decoders.

## Key Points

- F = (A⊕B)' = AB + A'B'
- Output = 1 when inputs are equal; output = 0 when inputs differ
- Used as a 1-bit equality comparator
- Symbol: XOR shape with an output bubble
- Multi-bit comparator: XNOR each bit pair, AND all results

## Example

2-input XNOR truth table:

| A | B | F = (A⊕B)' |
|---|---|------------|
| 0 | 0 |     1      |
| 0 | 1 |     0      |
| 1 | 0 |     0      |
| 1 | 1 |     1      |

4-bit equality comparator:

A = 1010, B = 1010 → XNOR each bit: 1,1,1,1 → AND → 1 (equal ✓)
A = 1010, B = 1011 → XNOR: 1,1,1,0 → AND → 0 (not equal ✓)

> [!recall] Design a 2-bit equality comparator (output 1 only when A1A0 = B1B0) using XNOR and AND gates. Draw the connections and verify it for inputs A=10, B=10 and A=10, B=01.

## See Also

- [[xor-gate-outputs-high-when-inputs-are-different|XOR Gate]] — XNOR is XOR inverted; detects difference instead of equality
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — another inverted gate that expands function set
