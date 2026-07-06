---
title: "Boolean Expressions to Truth Tables"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Boolean Expressions to Truth Tables

To build a truth table from a Boolean expression, list all 2ⁿ input combinations in binary order, evaluate the expression row by row, and record the output — this process leaves no case unverified.

> [!concept] Core Claim
> Deriving a truth table from an expression is the definitive verification method: if two expressions produce identical truth table columns, they are provably the same logic function for every possible input.

## Explanation

Think of truth table derivation as running a systematic test suite: you feed every possible input combination into the expression (or circuit) and record the output. Unlike unit-testing software where you pick representative samples, a truth table covers 100% of all cases — you are mathematically guaranteed to detect any discrepancy.

The mechanism starts with the number of variables: n inputs produce 2ⁿ rows. Inputs are listed in ascending binary counting order to ensure every combination appears exactly once — 000, 001, 010, 011, 100, 101, 110, 111 for three variables. For complex expressions, intermediate columns are added for each sub-expression, evaluated left-to-right or inside-out (innermost parentheses first). These intermediate columns act as a paper trail — each column feeds into the next until the final output column is complete.

The consequence is unambiguous equivalence checking: to verify that a simplified Boolean expression still matches the original, build the truth table for both and compare output columns. If they match on every single row, the simplification is correct. If any row differs, the simplification introduced an error. No other test achieves this level of certainty.

## Key Points

- n variables → 2ⁿ rows
- Inputs listed in binary counting order (0 to 2ⁿ−1)
- Use intermediate columns for each sub-expression — evaluate inside-out
- Identical output columns → logically equivalent expressions
- This method proves equivalence, not just suggests it

## Example

Expression: F = A·B + A'·C (3 variables → 8 rows)

| A | B | C | A·B | A' | A'·C | F = A·B + A'·C |
|---|---|---|-----|----|------|----------------|
| 0 | 0 | 0 |  0  |  1 |  0   |       0        |
| 0 | 0 | 1 |  0  |  1 |  1   |       1        |
| 0 | 1 | 0 |  0  |  1 |  0   |       0        |
| 0 | 1 | 1 |  0  |  1 |  1   |       1        |
| 1 | 0 | 0 |  0  |  0 |  0   |       0        |
| 1 | 0 | 1 |  0  |  0 |  0   |       0        |
| 1 | 1 | 0 |  1  |  0 |  0   |       1        |
| 1 | 1 | 1 |  1  |  0 |  0   |       1        |

> [!recall] Someone claims that F = A·B + A'·C simplifies to F = A·B + C. Build both truth tables and determine whether they are equivalent. If not, identify the specific row where they differ.

## See Also

- [[truth-tables-enumerate-all-possible-input-output-combinations|Truth Tables]] — general concept and structure
- [[logic-circuits-implement-boolean-expressions-physically|Logic Circuits and Boolean Expressions]] — circuits verified using this method
- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — simplifications confirmed correct by comparing truth tables
