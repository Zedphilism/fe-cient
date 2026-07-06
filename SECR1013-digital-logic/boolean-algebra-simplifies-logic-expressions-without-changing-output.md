---
title: "Boolean Algebra"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Boolean Algebra

Boolean algebra is the mathematical framework for manipulating logic expressions, allowing a complex circuit description to be simplified into an equivalent form that uses fewer gates.

> [!concept] Core Claim
> Boolean algebra proves that two logic expressions produce identical outputs for all inputs — if two expressions can be shown equal by algebraic steps, you can replace the more complex circuit with the simpler one without changing behavior.

## Explanation

Think of Boolean algebra as a substitution rulebook for logic circuits. Just as you can simplify the arithmetic expression 2x + 4x = 6x by applying algebraic rules, you can simplify AB + AB'C by applying Boolean rules — and each simplification step that removes a term removes gates from the physical circuit.

The key mechanism is that Boolean variables are binary — they can only be 0 or 1. This constraint enables special rules that do not exist in ordinary algebra: A·A = A (AND-ing a value with itself returns itself), A+A = A (OR-ing a value with itself returns itself), and A+1 = 1 (anything ORed with 1 is always 1). These identities allow whole terms to collapse, which is impossible in arithmetic. Every rule can be verified by truth table — if both sides produce the same column, the rule holds.

The consequence matters directly to hardware cost: fewer gates means smaller chip area, lower power consumption, faster propagation, and lower manufacturing cost. Before integrated circuits are fabricated, Boolean simplification is applied systematically to reduce gate count. A design that runs F = AB + ABC wastes a gate — simplified to F = AB, the same function runs in one AND gate instead of three gates plus an OR gate.

## Key Points

- Variables: binary only (0 or 1)
- Operations: AND (·), OR (+), NOT (')
- Every rule is provable by truth table
- Simplification reduces gates without changing the truth table
- Key special rules: A·A = A, A+A = A, A+1 = 1, A·0 = 0, A+A' = 1, A·A' = 0

## Example

Simplify: F = AB + ABC

Step 1 — Factor out AB: F = AB(1 + C)

Step 2 — Apply rule 1+C = 1: F = AB · 1 = AB

Result: F = AB — one AND gate replaces two AND gates plus one OR gate, with identical behavior.

Verify: original and simplified share the same truth table for all A, B, C combinations. ✓

> [!recall] Simplify F = A'B + AB + AB' to its simplest form using Boolean algebra. Show each step and name the rule applied. Then state how many gates the original expression requires vs. the simplified version.

## See Also

- [[boolean-variables-and-complements-define-binary-logic-behavior|Boolean Variables and Complements]] — the elements Boolean algebra operates on
- [[boolean-rules-provide-direct-simplification-shortcuts|Boolean Simplification Rules]] — the specific identities used in simplification steps
- [[demorgans-theorems-transform-between-and-or-forms|DeMorgan's Theorems]] — the most powerful transformation tool in Boolean algebra
