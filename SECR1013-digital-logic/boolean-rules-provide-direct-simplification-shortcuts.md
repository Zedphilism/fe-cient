---
title: "Boolean Simplification Rules"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Boolean Simplification Rules

Boolean algebra has a set of standard identities that allow terms to be eliminated or collapsed in one step — each rule is a proven truth that holds for all possible variable values.

> [!concept] Core Claim
> Each Boolean identity eliminates a redundant gate or sub-expression: applying a rule directly removes hardware while leaving the truth table unchanged — the more rules you recognize on sight, the faster you simplify.

## Explanation

Think of Boolean identities as shortcuts on a map: the long route and the short route arrive at the same destination, but knowing the shortcuts saves time. Each identity has been proven once by truth table; you apply it freely thereafter without re-proving it.

The rules fall into four categories by what they reveal. The constant rules show interactions with 0 and 1: AND-ing with 0 always gives 0 (the 0 dominates); OR-ing with 1 always gives 1 (the 1 dominates); AND-ing with 1 and OR-ing with 0 are identities that leave the variable unchanged. The idempotent rules show what happens with self-interaction: A+A = A and A·A = A — repeating a variable in OR or AND adds no information. The complement rules are the most powerful: A+A' always equals 1 (the terms annihilate into truth), and A·A' always equals 0 (they annihilate into falsehood). The absorption rule A+AB = A is particularly elegant — if A is already present in the OR, the AND term AB is completely absorbed because A alone already captures every case where AB is true.

The consequence is that recognizing these patterns in an expression tells you immediately what to eliminate. An experienced designer looks at AB + A and reads "absorption — that's just A." The algebraic steps are still performed for rigour, but pattern recognition is the skill that makes simplification fast.

## Key Points

| Identity | Rule | Category |
|----------|------|----------|
| A + 0 = A | OR with 0 — no effect | Constant |
| A + 1 = 1 | OR with 1 — null (dominates) | Constant |
| A · 0 = 0 | AND with 0 — null (dominates) | Constant |
| A · 1 = A | AND with 1 — no effect | Constant |
| A + A = A | Self-OR — idempotent | Idempotent |
| A · A = A | Self-AND — idempotent | Idempotent |
| A + A' = 1 | Complement OR — annihilates | Complement |
| A · A' = 0 | Complement AND — annihilates | Complement |
| (A')' = A  | Double negation cancels | Complement |
| A + AB = A | Absorption — AB is redundant | Absorption |
| A·(A+B) = A | Absorption dual | Absorption |

## Example

Simplify: F = A + AB + AB'

Step 1: Apply absorption (A + AB = A): F = A + AB'

Step 2: Apply absorption again (A + AB' = A): **F = A**

The entire expression reduces to a single variable — no gates needed at all. Without knowing these rules, you might expand and re-group indefinitely. With absorption, two steps suffice.

> [!recall] Given F = A'B + A'BC + A'BD, simplify to its smallest form. Name every rule you apply in order. Then state how many gates the original required vs. the simplified version (assume 2-input gates only).

## See Also

- [[commutative-associative-and-distributive-laws-preserve-logic-equivalence|Laws of Boolean Algebra]] — the structural laws these identities build on
- [[demorgans-theorems-transform-between-and-or-forms|DeMorgan's Theorems]] — advanced transformation rules beyond these identities
- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — motivation and context for all simplification steps
