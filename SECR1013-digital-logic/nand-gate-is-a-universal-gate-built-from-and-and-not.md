---
title: "NAND Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# NAND Gate

A NAND gate outputs LOW only when every input is simultaneously HIGH, and outputs HIGH in all other cases — it is AND with its output inverted.

> [!concept] Core Claim
> NAND is a universal gate: by connecting NAND gates in specific configurations you can implement NOT, AND, OR, NOR, XOR, and XNOR, meaning any digital circuit in the world can be built using only NAND gates.

## Explanation

Think of NAND as the "veto committee" rule: the only way to get a NO decision (LOW output) is if every single member votes YES (all inputs HIGH). If even one member abstains or votes NO (any input LOW), the output is YES (HIGH). This is the direct inversion of AND's "unanimous yes = yes" rule.

The mechanism is Boolean: F = (A·B)'. AND computes the product first, then NOT inverts it. In CMOS transistors, this is actually implemented the opposite way — the NOT stage is inherent in the transistor's behavior, making NAND more efficient to build in CMOS than a pure AND gate. This is why NAND is the dominant gate in semiconductor manufacturing.

NAND's universal property comes from its ability to reproduce any other function. The key insight is that connecting both inputs of a NAND together yields F = (A·A)' = A' — a NOT gate. Once you have NAND and NOT, you can reconstruct AND (NAND followed by NOT), OR (DeMorgan: three NANDs), and all others. Every logic function reduces to combinations of NAND.

## Key Points

- Boolean expression: F = (A·B)'
- Output = 0 only when ALL inputs = 1
- Output = 1 whenever ANY input = 0
- Universal gate: all logic functions implementable with NAND alone
- Symbol: AND shape with output bubble (circle)
- NAND with tied inputs = NOT gate

## Example

2-input NAND truth table:

| A | B | F = (A·B)' |
|---|---|------------|
| 0 | 0 |     1      |
| 0 | 1 |     1      |
| 1 | 0 |     1      |
| 1 | 1 |     0      |

Building NOT from NAND: tie both inputs → F = (A·A)' = A' ✓
Building AND from NAND: NAND output → feed into another NAND with both inputs tied (NOT) → F = ((A·B)')' = A·B ✓

> [!recall] You must implement F = A+B using only 2-input NAND gates. Use DeMorgan's theorem to derive the NAND-only circuit, then verify your answer using A=0, B=1.

## See Also

- [[and-gate-outputs-high-only-when-all-inputs-are-high|AND Gate]] — NAND is AND inverted
- [[nor-gate-is-a-universal-gate-built-from-or-and-not|NOR Gate]] — the other universal gate; NOR-only designs are equally expressive
- [[demorgans-theorems-transform-between-and-or-forms|DeMorgan's Theorems]] — explains the NAND/OR-with-bubbles equivalence
