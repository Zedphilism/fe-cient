---
title: "Matrix Types and Notation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Matrix Types and Notation

A matrix is a rectangular array of numbers with m rows and n columns, written as an m × n matrix — each entry aᵢⱼ is located at row i, column j, and the dimensions are always stated rows-first.

> [!concept] Core Claim
> Matrices give numbers spatial position: the row-column address aᵢⱼ turns a flat list of numbers into a structured grid where position carries meaning, enabling the systematic algorithms (row operations, matrix multiplication, inversion) that make linear algebra computationally tractable.

## Explanation

Think of a matrix like a spreadsheet: each cell has a unique address (row, column), and the shape of the spreadsheet — how many rows and columns — determines what operations are legal. Just as you cannot add two spreadsheets with different shapes cell-by-cell, you cannot add two matrices of different dimensions. The analogy holds deeper: filling a spreadsheet column with coefficients of one equation is exactly how an augmented matrix represents a system.

The naming convention is strict: dimension is always m × n (rows × columns), and the entry in row i, column j is aᵢⱼ. Several special matrix shapes arise so frequently they have names. A square matrix has m = n; its main diagonal runs from a₁₁ to aₙₙ, and most advanced properties (determinants, eigenvalues, inverses) are only defined for square matrices. A diagonal matrix is a square matrix where every off-diagonal entry is zero — only the main diagonal can be nonzero. The identity matrix Iₙ is the n × n diagonal matrix with 1s on the diagonal; multiplying any matrix by Iₙ leaves it unchanged, exactly as multiplying a number by 1 does. The zero matrix has all entries equal to 0 and acts as the additive identity.

Two matrices are equal only if they share the same dimensions and every corresponding pair of entries is equal — not just the shape, every single value must match. This is stricter than it sounds: a 2×3 matrix and a 3×2 matrix with the same numbers in different arrangements are not equal.

## Key Points

- Dimension: m × n (rows × columns); entry aᵢⱼ = row i, column j
- Square matrix: m = n; main diagonal = a₁₁, a₂₂, …, aₙₙ
- Diagonal matrix: square; all off-diagonal entries = 0
- Identity matrix Iₙ: diagonal with all 1s; multiplicative identity
- Zero matrix: all entries 0; additive identity
- Equality: same dimensions AND every entry matches

## Example

```
A = [2  0  -4]   (2×3 matrix)
    [3  1   7]

a₁₂ = 0 (row 1, column 2)
a₂₃ = 7 (row 2, column 3)

B = [5  2  8]    (3×3 square matrix)
    [7  4  3]
    [3  9  6]

Main diagonal of B: 5, 4, 6

I₃ = [1  0  0]   (3×3 identity matrix)
     [0  1  0]
     [0  0  1]
```

A 3×3 diagonal matrix: entries d₁, d₂, d₃ on diagonal, 0 everywhere else. Iₙ is the special case where all dᵢ = 1.

> [!recall] Given the matrix A with a₁₁ = 3, a₁₂ = 0, a₂₁ = −1, a₂₂ = 5: (a) What are the dimensions of A? (b) Is A square? (c) Is A diagonal? (d) Write the 2×2 identity matrix I₂ and verify that AI₂ = A by performing the multiplication.

## See Also

- [[matrix-operations|Matrix Operations]] — addition, subtraction, multiplication, and transpose
- [[matrix-determinant|Matrix Determinant]] — a scalar computed from square matrices
- [[matrix-inverse|Matrix Inverse]] — only defined for square matrices with nonzero determinant
