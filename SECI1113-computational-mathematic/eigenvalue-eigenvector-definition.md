---
title: "Eigenvalues and Eigenvectors"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Eigenvalues and Eigenvectors

An eigenvalue λ and eigenvector v of a square matrix A satisfy Av = λv — applying A to v produces a scalar multiple of v, meaning A only stretches or flips v without changing its direction.

> [!concept] Core Claim
> Eigenvectors are the "natural axes" of a matrix's transformation: every matrix distorts space, but along its eigenvector directions, the distortion is pure scaling — no rotation, no mixing of components — and the eigenvalue is the scaling factor, telling you by how much and in which sense (stretch, compress, or flip).

## Explanation

Think of a matrix transformation like a rubber sheet being stretched: most points move in curved paths, but certain special directions stay aligned — they get stretched (or compressed) but never tilted. A vector lying in one of those special directions is an eigenvector; the factor by which it stretches is the corresponding eigenvalue. If λ = 2, the eigenvector doubles in length. If λ = −1, it flips to the opposite direction but retains the same magnitude.

The mechanism for finding eigenvalues begins with the algebraic reformulation of Av = λv. Rewriting: Av − λv = 0, then (A − λI)v = 0. This is a homogeneous system. For a nonzero solution v to exist, the system must have free variables, which means the matrix (A − λI) must be singular. Singularity requires det(A − λI) = 0. Expanding this determinant produces the characteristic polynomial p(λ) — a degree-n polynomial in λ whose roots are the n eigenvalues.

For each eigenvalue λᵢ, the eigenvectors are found by substituting λᵢ back into (A − λᵢI)v = 0 and solving by Gaussian elimination. The set of all solutions (including the zero vector) is the eigenspace of λᵢ — a subspace of Rⁿ. The actual eigenvectors are the nonzero elements of this eigenspace. A single eigenvalue may correspond to multiple linearly independent eigenvectors (a multi-dimensional eigenspace), and repeated roots of the characteristic polynomial can produce complex behaviour.

## Key Points

- Defining equation: Av = λv with v ≠ 0
- Equivalent form: (A − λI)v = 0 has a nontrivial solution
- Eigenvalues: roots of det(A − λI) = 0 (characteristic polynomial)
- Eigenvectors: nonzero solutions of (A − λᵢI)v = 0 for each λᵢ
- Eigenspace: all solutions to (A − λᵢI)v = 0; a subspace including 0

## Example

A = [[3, 6], [1, 4]].

Characteristic polynomial:
det(A − λI) = det([[3−λ, 6], [1, 4−λ]]) = (3−λ)(4−λ) − (6)(1) = λ² − 7λ + 6 = (λ−6)(λ−1)

Eigenvalues: **λ₁ = 6**, **λ₂ = 1**.

For λ₁ = 6: (A − 6I)v = 0 → [[-3, 6], [1, -2]]v = 0 → row reduce → v = t(2, 1). Eigenvector: **(2, 1)**.

For λ₂ = 1: (A − I)v = 0 → [[2, 6], [1, 3]]v = 0 → v = t(−3, 1). Eigenvector: **(−3, 1)**.

Verify λ₁: A(2,1) = (3·2+6·1, 1·2+4·1) = (12, 6) = 6·(2, 1) ✓.

> [!recall] For A = [[2, 1], [0, 3]], find all eigenvalues and their corresponding eigenvectors by hand. Then explain: if a matrix has eigenvalues 0 and 5, what does the zero eigenvalue tell you about whether A is invertible? What happens geometrically when A acts on the eigenvector corresponding to λ = 0?

## See Also

- [[characteristic-polynomial|Characteristic Polynomial]] — the equation det(A − λI) = 0 and its properties
- [[power-method|Power Method]] — numerical algorithm to find the dominant eigenvalue
- [[matrix-determinant|Matrix Determinant]] — required to form the characteristic equation
