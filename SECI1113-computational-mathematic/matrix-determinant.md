---
title: "Matrix Determinant"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Matrix Determinant

The determinant is a single real number computed from a square matrix that encodes whether the matrix is invertible — det(A) ≠ 0 if and only if A has an inverse, and det(A) = 0 signals that the system AX = b either has infinitely many solutions or no solution.

> [!concept] Core Claim
> The determinant measures the "scaling factor" of the linear transformation represented by the matrix: geometrically, it is the signed area (2D) or signed volume (3D) of the parallelogram/parallelepiped formed by the matrix's column vectors — a determinant of zero means those vectors are collinear or coplanar, so the transformation collapses space and cannot be reversed.

## Explanation

Think of the determinant like the area of a plot of land defined by two fence lines: if the two fences are parallel (linearly dependent columns), the enclosed area is zero — there is no interior. A matrix with zero determinant works the same way: its columns point in directions that are either parallel or lie in a lower-dimensional subspace, so the transformation it represents squashes space and cannot be undone (no inverse exists).

For a 2×2 matrix A = [[a, b], [c, d]], the formula is det(A) = ad − bc — the product of the main diagonal minus the product of the anti-diagonal. For n × n matrices (n ≥ 3), the determinant is computed by cofactor expansion along any row or column. Expanding along row i: det(A) = Σⱼ aᵢⱼ · Cᵢⱼ, where the cofactor Cᵢⱼ = (−1)ⁱ⁺ʲ · det(Aᵢⱼ) and Aᵢⱼ is the (n−1) × (n−1) submatrix formed by deleting row i and column j. The alternating sign (−1)ⁱ⁺ʲ follows the checkerboard pattern: +, −, +, − across rows and columns.

The choice of which row or column to expand along is free — the result is always the same number. The practical strategy is to expand along the row or column with the most zeros, because each zero entry eliminates one cofactor term entirely, minimising computation. This is especially valuable for sparse matrices.

## Key Points

- 2×2: det([[a,b],[c,d]]) = ad − bc
- Cofactor: Cᵢⱼ = (−1)ⁱ⁺ʲ · det(Aᵢⱼ); expand along any row or column
- Sign pattern alternates like a checkerboard starting with + at (1,1)
- det(A) ≠ 0 ↔ A is invertible (non-singular)
- det(A) = 0 ↔ A is singular; no inverse; system has no unique solution
- Strategy: expand along the row or column with the most zeros

## Example

2×2: A = [[2, 4], [1, 5]]. det(A) = (2)(5) − (4)(1) = 10 − 4 = 6 ≠ 0, so A is invertible.

3×3 via cofactor expansion along row 1:
```
A = [1  0  2]
    [3  1 -1]
    [2 -1  4]

det(A) = 1·|1 -1; -1 4| − 0·|3 -1; 2 4| + 2·|3 1; 2 -1|
       = 1·(1·4 − (−1)(−1)) − 0 + 2·(3·(−1) − 1·2)
       = 1·(4 − 1) + 2·(−3 − 2)
       = 3 + 2·(−5)
       = 3 − 10
       = −7
```
det(A) = −7 ≠ 0 → A is invertible.

> [!recall] Compute det(B) for B = [[2, −1, 0], [4, 3, 1], [−2, 0, 5]] by expanding along the row or column of your choice. Justify your choice of expansion row/column before computing. Then state whether B is invertible and what this means for the system BX = b.

## See Also

- [[matrix-types-and-notation|Matrix Types and Notation]] — square matrix requirement
- [[matrix-inverse|Matrix Inverse]] — only exists when det(A) ≠ 0
- [[matrix-operations|Matrix Operations]] — multiplication context
