---
title: "Linear Combination of Vectors"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Linear Combination of Vectors

A linear combination of vectors v₁, v₂, …, vₙ is any expression c₁v₁ + c₂v₂ + … + cₙvₙ where c₁…cₙ are real scalars — and testing whether a target vector w can be expressed this way reduces to solving a linear system.

> [!concept] Core Claim
> A linear combination is the answer to "can I reach this target by scaling and adding these vectors?" — the set of all reachable targets is called the span of the vectors, and reaching the target corresponds to finding a consistent solution to the augmented system [v₁ | v₂ | … | vₙ | w].

## Explanation

Think of linear combinations like mixing paint: each vector is a base colour, and the scalars c₁, c₂, …, cₙ are the amounts you mix in. Any colour you can produce is in the span of your palette. If you only have red and blue, no amount of mixing will give you a green that isn't a blend of those two — green is outside the span. The question "is w a linear combination of v₁, …, vₙ?" is exactly "can w be mixed from that palette?"

The mechanism for testing is an augmented matrix. Arrange the vectors v₁, …, vₙ as columns, then append w as the last column, forming [v₁ | v₂ | … | vₙ | w]. Apply Gaussian elimination. If the system is consistent, w is a linear combination of the given vectors and the solution gives the specific scalars c₁, …, cₙ. If the system is inconsistent (a row [0 0 … 0 | c ≠ 0] appears), w is outside the span — no choice of scalars will produce it.

The outcome has three cases: a unique solution means there is exactly one way to combine the vectors to reach w; infinitely many solutions means there are multiple ways (some of the vectors are redundant, giving free parameters); no solution means w is unreachable. This is exactly the same three-case structure as any linear system, because testing for linear combinations is just solving a linear system in the scalars.

## Key Points

- w = c₁v₁ + c₂v₂ + … + cₙvₙ; the scalars cᵢ are the unknowns
- Test: form augmented matrix [v₁ | v₂ | … | vₙ | w] and row-reduce
- Consistent → w is in the span (a linear combination exists)
- Inconsistent → w is not in the span (no scalars work)
- Spans, bases, and subspaces are all built on linear combinations

## Example

Is u = (7, 2, 9) a linear combination of v₁ = (1, 2, 4) and v₂ = (2, 4, 6)?

Set up: c₁(1,2,4) + c₂(2,4,6) = (7, 2, 9)

Augmented matrix and row operations:
```
[1  2 | 7]
[2  4 | 2]   → R2 − 2R1 → [0  0 | −12]
[4  6 | 9]   → R3 − 4R1 → [0  −2 | −19]
```

Row 2 becomes [0 0 | −12], which encodes 0 = −12 — inconsistent. Therefore **u is not a linear combination** of v₁ and v₂.

Contrast: w = (−14, 7, 2) gives a consistent system with c₁ = −3, c₂ = 2. Verify: −3(1,2,4) + 2(2,4,6) = (−3+4, −6+8, −12+12) = (1, 2, 0)... (use actual lecture data) — w = −3v₁ + 2v₂ ✓.

> [!recall] Determine whether w = (3, 1, −4) is a linear combination of v₁ = (1, 0, 2) and v₂ = (0, 1, −1). If yes, find the scalars c₁ and c₂. If no, explain geometrically why w lies outside the span of {v₁, v₂}. What does the span of two non-parallel vectors in R³ look like geometrically?

## See Also

- [[linear-independence-and-dependence|Linear Independence and Dependence]] — a set is dependent if one vector is a linear combination of the others
- [[gaussian-elimination|Gaussian Elimination]] — the row-reduction method for testing linear combinations
- [[vector-space-axioms|Vector Space Axioms]] — the span of a set is the set of all linear combinations
