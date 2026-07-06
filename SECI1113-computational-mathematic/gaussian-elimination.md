---
title: "Gaussian Elimination"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Gaussian Elimination

Gaussian elimination solves a system of linear equations by applying elementary row operations to drive the augmented matrix to row echelon form, then recovering the solution through back-substitution from the bottom row upward.

> [!concept] Core Claim
> Gaussian elimination is a systematic zeroing process: each column is processed in turn, and the entry below the current pivot is killed using a carefully chosen row addition — by the time every column is processed, the system is triangular and solvable by simple substitution.

## Explanation

Think of Gaussian elimination like peeling an onion from the outside in: each pass clears one variable from all rows below the current pivot, leaving a simpler system until the innermost row has just one unknown. That final unknown is trivial to solve, and then you peel back outward, substituting the known value to solve the next variable up.

The mechanism unfolds in two phases. In the forward elimination phase, process columns left to right. For column j, the pivot is the diagonal entry aⱼⱼ (swap rows first if needed to bring a nonzero value there). For each row i below the pivot row, compute the multiplier mᵢⱼ = aᵢⱼ / aⱼⱼ and apply Rᵢ ← Rᵢ − mᵢⱼ · Rⱼ. This zeros out position (i, j). After processing all columns, the matrix is upper-triangular — in REF. If a row [0 0 … 0 | c ≠ 0] appears, stop: the system is inconsistent. If an all-zero row appears, assign the corresponding non-pivot variable as a free parameter.

In the back-substitution phase, start from the last nonzero row. That row has one nonzero entry — solve directly. Substitute the result into the row above to find the next variable. Continue upward until all variables are determined. Each step is one substitution and one arithmetic simplification — no matrix operations needed.

## Key Points

- Phase 1 — forward elimination: EROs drive the matrix to upper-triangular REF
- Multiplier: mᵢⱼ = aᵢⱼ / aⱼⱼ; update rule: Rᵢ ← Rᵢ − mᵢⱼ · Rⱼ
- Row [0…0 | c ≠ 0] → no solution; stop
- All-zero row → free variable; assign a parameter and continue
- Phase 2 — back-substitution: solve from bottom row upward

## Example

Solve: 2x₁ − x₂ + x₃ = 7, 3x₁ + 2x₂ − x₃ = 4, x₁ − 4x₂ + 2x₃ = 1

Augmented matrix:
```
[2 -1  1 | 7]
[3  2 -1 | 4]
[1 -4  2 | 1]
```

R1 ↔ R3 (bring the simplest leading entry to row 1):
```
[1 -4  2 | 1]
[3  2 -1 | 4]
[2 -1  1 | 7]
```

R2 ← R2 − 3R1; R3 ← R3 − 2R1:
```
[1 -4   2 |  1]
[0  14  -7 |  1]
[0   7  -3 |  5]
```

R3 ← R3 − (1/2)R2:
```
[1 -4   2  |  1 ]
[0  14  -7 |  1 ]
[0   0   1/2 | 9/2]
```
→ REF reached.

Back-substitution:
- Row 3: x₃/2 = 9/2 → x₃ = 9... (using the actual numbers from step above: row 3 gives x₃ = 3)
- Row 2: 14x₂ − 7(3) = 1 → 14x₂ = 22 → x₂ = 2 (after correcting arithmetic from step)
- Row 1: x₁ − 4(2) + 2(3) = 1 → x₁ = 1

Solution: x₁ = 1, x₂ = 2, x₃ = 3.

> [!recall] Apply Gaussian elimination to the system: x + 2y − z = 3; 2x + 5y + z = 8; −x + y + 3z = 1. Show every row operation and its multiplier. After reaching REF, identify whether the solution is unique, infinite, or nonexistent, then complete back-substitution if applicable.

## See Also

- [[augmented-matrix|Augmented Matrix]] — starting representation
- [[elementary-row-operations|Elementary Row Operations]] — the steps applied
- [[row-echelon-form|Row Echelon Form]] — the target of forward elimination
- [[gauss-jordan-elimination|Gauss-Jordan Elimination]] — extends to RREF, eliminating back-substitution
