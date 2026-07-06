---
title: "Gauss-Jordan Elimination"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Gauss-Jordan Elimination

Gauss-Jordan elimination extends Gaussian elimination by also zeroing out entries above each pivot, reducing the augmented matrix to RREF — an identity matrix on the coefficient side so the solution is readable directly from the last column.

> [!concept] Core Claim
> Gauss-Jordan does more work than Gaussian elimination (clearing above the pivot as well as below), but it eliminates the back-substitution phase entirely — the trade-off is more row operations during elimination versus zero arithmetic afterward, and it is the only practical method for computing a matrix inverse by hand.

## Explanation

Think of Gaussian elimination as sweeping a room by pushing all the dirt under a rug (below each pivot), then having to go back and pull it out item by item (back-substitution). Gauss-Jordan is the more thorough approach: it sweeps up and down simultaneously, so when you finish the room, it is completely clean — no rug to revisit, no back-substitution needed.

The mechanism adds two steps to Gaussian elimination. After forward elimination reaches REF, scale each pivot row so the pivot equals 1 (divide the row by its pivot value). Then, for each pivot column, eliminate entries above the pivot (not just below) using the same row-addition operation. When every pivot column has been cleaned both above and below, the coefficient side of the augmented matrix is the identity matrix Iₙ, and the augmented column directly states the solution: x₁ = e₁, x₂ = e₂, and so on.

The most important application beyond solving systems is computing matrix inverses. Start with the augmented matrix [A | I] — A on the left, the identity on the right. Apply Gauss-Jordan to the entire augmented matrix. If A is invertible (det A ≠ 0), the process transforms [A | I] → [I | A⁻¹], and the inverse appears on the right. If A is not invertible, the left side will fail to reach the identity (a zero row will appear), and the inverse does not exist.

## Key Points

- Extends Gaussian elimination: zeros above and below each pivot
- Scale pivot rows to make each pivot = 1 (leading 1s)
- Result: RREF — coefficient side becomes identity matrix
- Solution read directly from augmented column; no back-substitution needed
- [A | I] → [I | A⁻¹] method for matrix inverses

## Example

Starting from REF (reached by Gaussian elimination):
```
[1 -4   2  |  1]
[0  14  -7 |  1]
[0   0   1 |  3]
```

Scale R2 ← (1/14)R2; pivot already 1 in R3:
```
[1 -4   2  |  1  ]
[0   1 -1/2 | 1/14]
[0   0   1  |  3  ]
```

Eliminate above column 3 pivot: R2 ← R2 + (1/2)R3; R1 ← R1 − 2R3:
```
[1 -4  0 | -5]
[0  1  0 |  2]
[0  0  1 |  3]
```

Eliminate above column 2 pivot: R1 ← R1 + 4R2:
```
[1  0  0 |  3]
[0  1  0 |  2]
[0  0  1 |  3]
```

Solution reads directly: x₁ = 3, x₂ = 2, x₃ = 3. (Verify against original system.)

> [!recall] Use the [A | I] method to find the inverse of A = [[2, 1], [5, 3]]. Write the augmented matrix [A | I₂], apply Gauss-Jordan row operations, and read off A⁻¹. Then verify your answer by computing A · A⁻¹ and confirming you get I₂.

## See Also

- [[gaussian-elimination|Gaussian Elimination]] — the first phase of this method
- [[row-echelon-form|Row Echelon Form]] — intermediate target (REF) extended to RREF
- [[matrix-inverse|Matrix Inverse]] — computed via [A | I] → [I | A⁻¹]
