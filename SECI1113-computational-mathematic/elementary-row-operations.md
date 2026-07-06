---
title: "Elementary Row Operations"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Elementary Row Operations

The three elementary row operations (EROs) are reversible transformations on matrix rows that preserve the solution set of the corresponding linear system — they are the only tools used in Gaussian and Gauss-Jordan elimination.

> [!concept] Core Claim
> EROs work because each one corresponds to a legally valid algebraic move: swapping equations, scaling an equation by a nonzero constant, or adding a multiple of one equation to another — none of these change which values satisfy the system, so the solution set is preserved at every step.

## Explanation

Think of EROs as the moves in a legal chess game: there are exactly three types, each has clear rules, and any combination of legal moves produces a position that is still a valid chess game (the rules were never broken). Similarly, any sequence of EROs transforms the augmented matrix into an equivalent one — the numbers change, but the solution set stays the same.

The three operations are: (1) Row swap — Rᵢ ↔ Rⱼ — exchanges two rows to bring a convenient pivot into position. (2) Scalar multiplication — c·Rᵢ — multiplies every entry in row i by a nonzero constant c, most often used to normalise a pivot to 1. The scalar must be nonzero; multiplying by zero would collapse the row to all zeros, destroying the equation entirely. (3) Row addition — Rᵢ ← Rᵢ + c·Rⱼ — adds c times row j to row i while leaving row j unchanged. This is the core elimination step: by choosing the multiplier c = −aᵢⱼ / aⱼⱼ (where aⱼⱼ is the pivot), the entry at position (i, j) becomes exactly zero.

The multiplier mᵢⱼ = aᵢⱼ / aⱼⱼ is the ratio of the entry to be eliminated to the current pivot. The update rule Rᵢ ← Rᵢ − mᵢⱼ · Rⱼ is applied to every row below the pivot during Gaussian elimination (and to rows above as well during Gauss-Jordan). Reversibility matters: each ERO can be undone (swap again, divide by c, subtract c times the row), which is why applying EROs never permanently destroys information about the original system.

## Key Points

- Row swap: Rᵢ ↔ Rⱼ — reorders rows; changes no solutions
- Scalar multiplication: c·Rᵢ (c ≠ 0) — scales one row; zero is forbidden
- Row addition: Rᵢ ← Rᵢ + c·Rⱼ — eliminates an entry using the pivot row
- Multiplier: mᵢⱼ = aᵢⱼ/aⱼⱼ; use Rᵢ ← Rᵢ − mᵢⱼ·Rⱼ to zero out position (i,j)
- All three are reversible — solution set is preserved throughout

## Example

Starting augmented matrix:
```
[2  1  1 | 7]
[3  2 -1 | 4]
[1 -4  2 | 1]
```

Step 1 — R1 ↔ R3 (bring leading entry 1 to top):
```
[1 -4  2 | 1]
[3  2 -1 | 4]
[2  1  1 | 7]
```

Step 2 — R2 ← R2 − 3R1 (multiplier m₂₁ = 3/1 = 3, zero out position (2,1)):
```
[1 -4   2 | 1]
[0  14  -7 | 1]
[2  1   1 | 7]
```

Step 3 — R3 ← R3 − 2R1 (multiplier m₃₁ = 2/1 = 2, zero out position (3,1)):
```
[1 -4  2 | 1]
[0  14 -7 | 1]
[0   9 -3 | 5]
```

Continue applying EROs to zero out entries below each successive pivot.

> [!recall] Given the matrix row R1 = [3 6 −9 | 12] and R2 = [2 1 4 | 5]: (a) Apply (1/3)R1 to normalise the pivot. (b) Use the updated R1 to zero out position (2,1) via row addition. (c) If you were asked to undo step (b), what single row operation would reverse it?

## See Also

- [[augmented-matrix|Augmented Matrix]] — the workspace where EROs are applied
- [[row-echelon-form|Row Echelon Form]] — the target shape EROs are used to achieve
- [[gaussian-elimination|Gaussian Elimination]] — systematic ERO application reaching REF
