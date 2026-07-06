---
title: "Matrix Operations"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Matrix Operations

The four core matrix operations are addition, scalar multiplication, matrix multiplication, and transpose — each with dimension requirements that determine when the operation is legal and what shape the result will be.

> [!concept] Core Claim
> Matrix multiplication is the most counterintuitive operation because it is not commutative (AB ≠ BA in general) and requires the inner dimensions to match — it is not entry-wise but rather a systematic combination of row dot products with columns, encoding how one linear transformation composes with another.

## Explanation

Think of matrices as language translators: adding two translators requires them both to speak the same languages (same dimensions), and the result is a translator that combines their vocabularies entry-by-entry. Multiplying two translators, however, is like chaining them — the first must output in the same language the second takes as input (inner dimensions must match), and the chain works only in one direction: running translator A first, then B, is generally different from running B first, then A.

Addition and subtraction are the simplest operations: both matrices must be the same size (m × n), and the result is computed entry-by-entry: (A ± B)ᵢⱼ = aᵢⱼ ± bᵢⱼ. Scalar multiplication scales every entry uniformly: (cA)ᵢⱼ = c · aᵢⱼ. Both operations are commutative and distribute across each other normally.

Matrix multiplication AB requires A to be m × n and B to be n × p — the inner dimensions (both n) must match. The result is m × p. Each entry (AB)ᵢⱼ is computed as the dot product of row i of A with column j of B: (AB)ᵢⱼ = Σₖ aᵢₖ bₖⱼ. Because rows of A are paired with columns of B, swapping the order (computing BA) pairs rows of B with columns of A — a completely different computation. This is why AB ≠ BA in general, and why BA may not even be defined if the resulting dimension check fails.

The transpose Aᵀ reflects the matrix over its main diagonal — rows become columns. If A is m × n, then Aᵀ is n × m. The critical property for products is (AB)ᵀ = BᵀAᵀ: the order reverses when transposing a product, for the same reason that putting on socks then shoes must be undone in reverse (shoes then socks).

## Key Points

- Addition/subtraction: same dimensions required; entry-wise; commutative
- Scalar multiplication: every entry scaled by c; distributes over addition
- Multiplication AB: A is m × n, B is n × p; result is m × p; not commutative
- (AB)ᵢⱼ = Σₖ aᵢₖ bₖⱼ (row i of A dotted with column j of B)
- Transpose: (AB)ᵀ = BᵀAᵀ (order reverses)

## Example

```
A = [3  2  0]    B = [1  4  2]
    [5  1 -4]        [7 -5  3]

A + B = [4   6   2]       2A = [ 6  4  0]
        [12 -4  -1]            [10  2 -8]
```

Matrix multiplication (2×3 times 3×1):
```
[3  2  0] [x]   [3x + 2y + 0z]
[5  1 -4] [y] = [5x + y  - 4z]
           [z]
```
Entry in row 1, column 1 = (row 1 of A) · (column 1 of B) = 3·x + 2·y + 0·z.

Dimension check: (2×3)(3×1) → inner dimensions both 3 ✓ → result is 2×1.

> [!recall] Given A = [[1, 2], [3, 4]] and B = [[0, 1], [1, 0]]: (a) Compute AB. (b) Compute BA. (c) Are AB and BA equal? (d) Compute (AB)ᵀ and verify it equals BᵀAᵀ. Show all steps.

## See Also

- [[matrix-types-and-notation|Matrix Types and Notation]] — dimensions and special matrices
- [[matrix-determinant|Matrix Determinant]] — computed from square matrices
- [[matrix-inverse|Matrix Inverse]] — uses transpose and determinant
