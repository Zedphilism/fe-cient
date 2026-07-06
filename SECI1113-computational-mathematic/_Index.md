---
title: "SECI1113 — Computational Mathematics"
date: 2026-04-18
tags: [hub, semester-3, seci1113, discrete-math]
---

# SECI1113 — Computational Mathematics

Topics: Linear algebra (systems, matrices, vectors, eigenvalues), numerical methods for root-finding, interpolation, differentiation, and integration.

---

## Chapter 1 — Linear Equations & Matrices

- [[linear-equation-definition|Linear Equation]] — what constitutes a linear equation and its solutions
- [[system-of-linear-equations-solution-types|System of Linear Equations: Solution Types]] — unique, infinite, or no solutions
- [[matrix-types-and-notation|Matrix Types and Notation]] — dimensions, special matrices, entry indexing
- [[matrix-operations|Matrix Operations]] — addition, subtraction, scalar multiplication, multiplication, transpose
- [[matrix-determinant|Matrix Determinant]] — cofactor expansion, invertibility test
- [[matrix-inverse|Matrix Inverse]] — adjoint method for 2×2 and 3×3 matrices
- [[augmented-matrix|Augmented Matrix]] — compact representation of a linear system
- [[row-echelon-form|Row Echelon Form]] — REF and RREF conditions and staircase pattern
- [[elementary-row-operations|Elementary Row Operations]] — swap, scale, add — the three building blocks
- [[gaussian-elimination|Gaussian Elimination]] — forward elimination to REF, then back-substitution
- [[gauss-jordan-elimination|Gauss-Jordan Elimination]] — elimination to RREF; solution read directly

---

## Chapter 2 — Euclidean Vector Spaces

- [[vector-definition-rn-space|Vectors and Rn Space]] — ordered n-tuples, magnitude, direction
- [[vector-arithmetic|Vector Arithmetic]] — addition, subtraction, scalar multiplication; eight properties
- [[euclidean-norm|Euclidean Norm]] — length of a vector; root-sum-of-squares formula
- [[euclidean-distance|Euclidean Distance]] — straight-line separation between two vectors
- [[dot-product|Dot Product]] — scalar result; alignment, orthogonality, and angle
- [[cross-product|Cross Product]] — vector result perpendicular to both inputs
- [[linear-combination-of-vectors|Linear Combination of Vectors]] — weighted sum of vectors
- [[linear-independence-and-dependence|Linear Independence and Dependence]] — trivial-solution test

---

## Chapter 3 — General Vector Spaces

- [[vector-space-axioms|Vector Space Axioms]] — ten axioms that define any vector space
- [[vector-subspace|Vector Subspace]] — closure test for subsets of a vector space

---

## Chapter 4 — Linear Transformations

- [[linear-transformation|Linear Transformation]] — preserves vector addition and scalar multiplication between spaces
- [[kernel-of-linear-transformation|Kernel (Null Space)]] — vectors mapped to zero; dimension = nullity
- [[range-of-linear-transformation|Range (Image)]] — all reachable output vectors; dimension = rank

---

## Chapter 5 — Accuracy & Error

- [[numerical-error-types|Numerical Error Types]] — data, truncation, and rounding errors
- [[absolute-and-relative-error|Absolute and Relative Error]] — measuring and contextualising error
- [[rounding-error-propagation|Rounding Error Propagation]] — how errors accumulate in operations

---

## Chapter 6 — Non-Linear Equations

- [[intermediate-value-theorem|Intermediate Value Theorem]] — sign-change root existence guarantee
- [[bisection-method|Bisection Method]] — bracketing by repeated halving
- [[convergence-criteria|Convergence Criteria]] — stopping rules for iterative methods
- [[secant-method|Secant Method]] — derivative-free fixed-point iteration
- [[newton-raphson-method|Newton-Raphson Method]] — tangent-line iteration; fastest convergence

---

## Chapter 7 — Eigenvalues & Eigenvectors

- [[eigenvalue-eigenvector-definition|Eigenvalues and Eigenvectors]] — Av = λv, eigenspaces
- [[characteristic-polynomial|Characteristic Polynomial]] — det(A−λI) = 0; Gerschgorin bounds
- [[power-method|Power Method]] — iterative dominant eigenvalue approximation

---

## Chapter 8 — Interpolation & Approximation

- [[interpolation-definition|Interpolation]] — polynomial through known data points; method selection
- [[newton-forward-difference-interpolation|Newton Forward-Difference Interpolation]] — equally-spaced data near table start
- [[newton-backward-difference-interpolation|Newton Backward-Difference Interpolation]] — equally-spaced data near table end

---

## Chapter 9 — Numerical Differentiation

- [[numerical-differentiation-finite-differences|Numerical Differentiation: Finite Differences]] — 2-point, 3-point, central formulas

---

## Chapter 10 — Numerical Integration

- [[trapezoidal-rule|Trapezoidal Rule]] — piecewise linear approximation; O(h²) accuracy
- [[simpsons-rule|Simpson's Rule]] — piecewise parabolic approximation; O(h⁴) accuracy

---

## Python Module

- [[python-numerical-methods-numpy-scipy|Python Numerical Methods: NumPy and SciPy]] — code implementations of all methods

---

## See Also

- [[Glossary/_Index|Glossary]]
- [[semester-03/SECR1013-digital-logic/_Index|Digital Logic]] — Boolean algebra shares matrix-like truth table structures
- [[semester-03/SCSR2213-network-communication/_Index|Network Communication]] — adjacency matrices use linear algebra
