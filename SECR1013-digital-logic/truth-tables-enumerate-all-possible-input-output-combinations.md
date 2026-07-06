---
title: "Truth Tables"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Truth Tables

A truth table is the exhaustive, unambiguous specification of a logic function — it lists every possible input combination and the output each one produces.

> [!concept] Core Claim
> A truth table with n input variables always has exactly 2ⁿ rows; because it covers every possible combination, it leaves no case undefined and serves as the ground truth for proving whether two logic expressions are equivalent.

## Explanation

Think of a truth table as a complete contract for a logic circuit. Just as a legal contract specifies every scenario and outcome, a truth table specifies every possible input state and its guaranteed output. If two expressions produce identical truth tables, they are provably the same function — no other test is needed.

The mechanism is systematic enumeration: with n binary inputs, there are 2ⁿ possible combinations (since each input independently contributes a factor of 2). Rows are written in binary counting order — 00, 01, 10, 11 for two inputs — so every combination appears exactly once. For each row, the Boolean expression is evaluated to fill the output column.

Truth tables are the starting point for three critical engineering tasks: verifying a gate's behavior from its expression, checking the equivalence of two alternative circuit designs, and generating input data for simplification methods like Karnaugh maps. For multi-gate circuits, intermediate columns are added to track sub-expression results gate by gate — this makes complex circuits debuggable one level at a time.

## Key Points

- n inputs → 2ⁿ rows
- Input columns: binary counting order (000…0 through 111…1)
- Output column: determined by evaluating the Boolean expression
- Equivalence check: two expressions are the same function iff their truth tables match

## Example

3-input AND gate — 2³ = 8 rows:

| A | B | C | F = A·B·C |
|---|---|---|-----------|
| 0 | 0 | 0 |     0     |
| 0 | 0 | 1 |     0     |
| 0 | 1 | 0 |     0     |
| 0 | 1 | 1 |     0     |
| 1 | 0 | 0 |     0     |
| 1 | 0 | 1 |     0     |
| 1 | 1 | 0 |     0     |
| 1 | 1 | 1 |     1     |

Notice: only 1 of 8 rows produces output 1 — AND is very restrictive.

> [!recall] Two engineers each design a circuit for F(A,B): Engineer 1 builds F = A·B + A'·B'; Engineer 2 builds F = (A⊕B)'. Prove or disprove they are the same function without drawing any gates.

## See Also

- [[logic-gates-implement-boolean-operations-using-binary-inputs|Logic Gates]] — truth tables define each gate's behavior
- [[boolean-expression-to-truth-table-maps-all-inputs-to-output|Boolean Expressions to Truth Tables]] — how to derive a table from a complex expression
- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — uses truth tables to verify simplifications
