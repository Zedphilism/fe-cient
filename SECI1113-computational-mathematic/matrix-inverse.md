---
title: "Matrix Inverse"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Matrix Inverse

The inverse of a square matrix A, written A⁻¹, is the unique matrix satisfying A · A⁻¹ = A⁻¹ · A = I — it exists if and only if det(A) ≠ 0, and a matrix without an inverse is called singular.

> [!concept] Core Claim
> The matrix inverse is the algebraic undo button for a linear transformation: multiplying A⁻¹ on the left reverses whatever A did to a vector, which is only possible when the transformation preserved all the information (det ≠ 0) — a singular matrix collapsed some dimension and the lost information cannot be recovered.

## Explanation

Think of A⁻¹ as the reverse gear of a linear transformation: if A maps vector x to Ax, then multiplying by A⁻¹ drives it back — A⁻¹(Ax) = x. But this reversal is only possible if A did not collapse space. A singular matrix (det = 0) squashes a dimension flat: multiple different inputs all map to the same output, so there is no way to know which input produced a given output. The reverse gear does not exist because the original journey was a one-way trip.

For a 2×2 matrix A = [[a, b], [c, d]] with det(A) = ad − bc ≠ 0, the inverse is A⁻¹ = (1/det(A)) · [[d, −b], [−c, a]]. The recipe is: swap the main diagonal entries, negate the off-diagonal entries, and divide the whole matrix by the determinant. This formula is exact and fast for 2×2 matrices.

For a 3×3 (or larger) matrix, two methods exist. The cofactor/adjoint method: (1) compute det(A) — stop if zero; (2) compute all 9 cofactors Cᵢⱼ = (−1)ⁱ⁺ʲ · det(Aᵢⱼ), where Aᵢⱼ is the 2×2 submatrix obtained by deleting row i and column j; (3) arrange them into the cofactor matrix C; (4) take the transpose to get adj(A) = Cᵀ; (5) divide by det: A⁻¹ = (1/det(A)) · adj(A). Alternatively, Gauss-Jordan on [A | I] → [I | A⁻¹] is computationally simpler for large matrices. Both methods produce the same result. Always verify by computing A · A⁻¹ = I.

## Key Points

- A⁻¹ exists ⟺ det(A) ≠ 0 (non-singular)
- 2×2 formula: swap diagonal, negate off-diagonal, divide by det
- 3×3 adjoint method: det → cofactors → transpose → divide by det
- Gauss-Jordan on [A | I] → [I | A⁻¹] for larger matrices
- Verification: A · A⁻¹ must equal I

## Example

A = [[2, 1], [1, 4]]: det(A) = (2)(4) − (1)(1) = 7.

A⁻¹ = (1/7) · [[4, −1], [−1, 2]] = [[4/7, −1/7], [−1/7, 2/7]]

Verify:
```
A · A⁻¹ = [[2, 1], [1, 4]] · [[4/7, -1/7], [-1/7, 2/7]]
         = [[(8-1)/7, (-2+2)/7], [(4-4)/7, (-1+8)/7]]
         = [[1, 0], [0, 1]] = I ✓
```

Singular example: B = [[1, 2], [2, 4]]. det(B) = (1)(4) − (2)(2) = 0. B is singular — no inverse exists, and the system Bx = b either has infinitely many or no solutions.

> [!recall] Find the inverse of A = [[3, 1], [5, 2]] using the 2×2 formula. Then find the inverse of B = [[1, 0, 0], [2, 1, 0], [3, 0, 1]] using the Gauss-Jordan [B | I] method. For each, verify your answer by multiplying and confirming you get I.

## See Also

- [[matrix-determinant|Matrix Determinant]] — prerequisite; must be nonzero
- [[matrix-operations|Matrix Operations]] — matrix multiplication context
- [[gauss-jordan-elimination|Gauss-Jordan Elimination]] — alternative method via [A | I] row reduction
