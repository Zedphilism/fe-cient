---
title: "NOR Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# NOR Gate

A NOR gate outputs HIGH only when every input is simultaneously LOW, and outputs LOW whenever any input is HIGH — it is OR with its output inverted.

> [!concept] Core Claim
> NOR is the "all quiet" detector: the output goes HIGH only when every monitored signal is silent (LOW). Like NAND, NOR is a universal gate — every digital function can be built from NOR gates alone.

## Explanation

Think of NOR as a system that sounds the "all clear" signal: it outputs HIGH (all clear) only when every input is at rest (LOW). The moment any one input fires (goes HIGH), the all-clear drops to LOW immediately. This makes NOR naturally useful for detecting when all conditions are inactive.

The mechanism is F = (A+B)'. OR first checks if any input is active (any HIGH → OR output goes HIGH), then NOT inverts the result. In CMOS technology, NOR is built directly in silicon without needing a separate NOT stage — the inversion is inherent in the pull-up/pull-down transistor network, making NOR one of the most efficient gates to fabricate.

NOR's universality mirrors NAND's: tying both NOR inputs together gives F = (A+A)' = A' — a NOT gate. With NOT available from NOR, you can reconstruct OR (NOR followed by NOT), AND (DeMorgan: three NORs), and everything else. Every logic function reduces to combinations of NOR, making it a complete logic set on its own.

## Key Points

- Boolean expression: F = (A+B)'
- Output = 1 only when ALL inputs = 0
- Output = 0 whenever ANY input = 1
- Universal gate: every logic function implementable with NOR alone
- Symbol: OR shape with output bubble (circle)
- NOR with tied inputs = NOT gate

## Example

2-input NOR truth table:

| A | B | F = (A+B)' |
|---|---|------------|
| 0 | 0 |     1      |
| 0 | 1 |     0      |
| 1 | 0 |     0      |
| 1 | 1 |     0      |

Building NOT from NOR: tie both inputs → F = (A+A)' = A' ✓
Building OR from NOR: NOR output → feed into another NOR with tied inputs (NOT) → F = ((A+B)')' = A+B ✓

> [!recall] Implement F = A·B using only 2-input NOR gates. Use DeMorgan's theorem to derive the NOR-only equivalent, then verify using A=1, B=1 and A=1, B=0.

## See Also

- [[or-gate-outputs-high-when-any-input-is-high|OR Gate]] — NOR is OR inverted
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — the other universal gate
- [[demorgans-theorems-transform-between-and-or-forms|DeMorgan's Theorems]] — (A+B)' = A'·B' links NOR to AND-with-inverted-inputs
