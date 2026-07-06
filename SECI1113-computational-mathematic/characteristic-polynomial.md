---
title: "Characteristic Polynomial"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Characteristic Polynomial

The characteristic polynomial of an n × n matrix A is p(λ) = det(A − λI) — a degree-n polynomial whose roots are exactly the eigenvalues of A, so setting p(λ) = 0 gives the characteristic equation that must be solved to find eigenvalues.

> [!concept] Core Claim
> The characteristic polynomial is the algebraic bridge from matrix to eigenvalues: it converts the question "for what scalars does Av = λv have a nonzero solution?" into a polynomial equation in λ, and every eigenvalue problem for small matrices reduces to finding its roots — the degree equals the matrix size, so an n × n matrix always has exactly n eigenvalues (counting multiplicity, possibly complex).

## Explanation

Think of the characteristic polynomial as a fingerprint of a matrix: just as a fingerprint encodes unique identifying features of a person, p(λ) encodes the eigenvalues of A in compressed form. Different matrices generally have different characteristic polynomials, and the roots of p(λ) reveal the directions that A does not rotate — only stretch.

The derivation is a one-step reformulation. Start from the eigenvalue equation Av = λv. Rearrange to (A − λI)v = 0. For a nonzero eigenvector v to satisfy this homogeneous system, the matrix (A − λI) must be singular (non-invertible). A matrix is singular exactly when its determinant is zero. So the eigenvalues are the values of λ where det(A − λI) = 0. Expanding this determinant as a function of λ produces the characteristic polynomial. For a 2×2 matrix it is quadratic, for 3×3 it is cubic, and so on.

For large matrices where computing det(A − λI) is expensive, Gerschgorin's Circle Theorem provides eigenvalue location bounds without any polynomial computation. For each row i, form a disk centred at the diagonal entry aᵢᵢ with radius rᵢ = Σⱼ≠ᵢ |aᵢⱼ| (sum of absolute values of off-diagonal entries in that row). All eigenvalues of A are guaranteed to lie within the union of these n disks. This gives a fast sanity check on eigenvalue approximations and bounds the search region for numerical methods.

## Key Points

- p(λ) = det(A − λI); eigenvalues are roots of p(λ) = 0
- Degree n → exactly n eigenvalues (complex or repeated, counting multiplicity)
- Once λᵢ is known, substitute into (A − λᵢI)v = 0 to find eigenvectors
- Gerschgorin disk for row i: centre aᵢᵢ, radius rᵢ = Σⱼ≠ᵢ |aᵢⱼ|
- All eigenvalues lie in the union of all Gerschgorin disks

## Example

A = [[−1, 6, −12], [0, −13, 30], [0, −9, 20]]:

p(λ) = det(A − λI) expands to λ³ − 6λ² + 3λ + 10 = (λ+1)(λ−5)(λ−2)

Eigenvalues: **λ₁ = −1, λ₂ = 2, λ₃ = 5**.

Gerschgorin estimate for B = [[3, −2, 1], [−1, 3, 1], [1, −2, −4]]:
- Row 1: centre 3, radius |−2|+|1| = 3 → disk: [0, 6]
- Row 2: centre 3, radius |−1|+|1| = 2 → disk: [1, 5]
- Row 3: centre −4, radius |1|+|−2| = 3 → disk: [−7, −1]

All eigenvalues of B lie in [−7, −1] ∪ [0, 6]. This bounds the search region before any computation.

> [!recall] For A = [[2, 1], [4, 2]], compute the characteristic polynomial p(λ). What are the eigenvalues? Is one of them 0? What does a zero eigenvalue tell you about whether A is invertible? Now compute the Gerschgorin disks for this A and verify that the eigenvalues lie within the union of those disks.

## See Also

- [[eigenvalue-eigenvector-definition|Eigenvalues and Eigenvectors]] — the equation that leads to p(λ)
- [[matrix-determinant|Matrix Determinant]] — used to expand the characteristic polynomial
- [[power-method|Power Method]] — numerical alternative that avoids computing the polynomial explicitly
