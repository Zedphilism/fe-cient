---
title: "DeMorgan's Theorems"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# DeMorgan's Theorems

DeMorgan's theorems state that the complement of an AND expression equals the OR of the complements, and the complement of an OR expression equals the AND of the complements.

> [!concept] Core Claim
> DeMorgan's theorems are the bridge between NAND/NOR and AND/OR: they show that any inverted-AND circuit is equivalent to an OR-with-inverted-inputs circuit, and vice versa — this is what allows universal gates to reproduce all others.

## Explanation

Think of DeMorgan's theorems as a translation rule between two dialects of the same language. When a logic expression has a complement bar spanning multiple terms (a "big bar"), DeMorgan lets you break the bar into individual complements and swap the operator underneath. The mnemonic is: **break the bar, change the operator**.

The two theorems are:

**First theorem:** (A·B)' = A' + B'. The complement of an AND becomes an OR of complements. In hardware, a NAND gate (output of AND inverted) is exactly equivalent to an OR gate where both inputs have bubbles (input-inverted). These two circuits produce identical truth tables.

**Second theorem:** (A+B)' = A'·B'. The complement of an OR becomes an AND of complements. A NOR gate is exactly equivalent to an AND gate where both inputs have bubbles.

These equivalences are not just algebraic curiosities — they are the practical mechanism for converting designs between gate families. If you are building a circuit using only NAND gates, DeMorgan tells you how to express any OR or AND as a combination of NANDs. If you are reading a schematic where all gates have bubbles on their inputs, DeMorgan tells you what the circuit actually computes without redrawing it.

For longer expressions, apply DeMorgan by scanning the expression: wherever a bar spans a group, break the bar, flip every variable's complement status, and swap AND↔OR. Do this step by step from innermost to outermost grouping.

## Key Points

- First theorem: (A·B)' = A' + B' — NAND = OR with inverted inputs
- Second theorem: (A+B)' = A'·B' — NOR = AND with inverted inputs
- General rule: complement all literals AND swap all operators under a broken bar
- Mnemonic: "break the bar, change the operator"

## Example

**Applying first theorem:**
F = (A·B·C)' = A' + B' + C'

**Applying second theorem:**
F = (A+B+C)' = A'·B'·C'

**Complex expression with nested bars:**
F = (AB + C)'

Treat AB as one unit: F = (AB)' · C'  (second theorem: sum of two things complemented = product of complements)
Expand (AB)': = (A'+B') · C'  (first theorem on the inner product)
Final: F = (A'+B')·C' = A'C' + B'C'

> [!recall] Convert F = (A'+B)(B'+C) to a NOR-only implementation. First use DeMorgan's theorems to rewrite using only complement, AND, and OR. Then show which NAND or NOR gates replace each operation.

## See Also

- [[boolean-rules-provide-direct-simplification-shortcuts|Boolean Simplification Rules]] — identities applied alongside DeMorgan
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — directly equivalent to first theorem: (A·B)' = A'+B'
- [[nor-gate-is-a-universal-gate-built-from-or-and-not|NOR Gate]] — directly equivalent to second theorem: (A+B)' = A'·B'
