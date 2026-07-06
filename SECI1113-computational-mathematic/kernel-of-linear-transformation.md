---
title: "Kernel of a Linear Transformation"
date: 2026-04-26
tags: [semester-3, seci1113, discrete-math]
---

# Kernel of a Linear Transformation

The kernel (null space) of a linear transformation T: V → W is the set of all vectors in the domain V that T maps to the zero vector in W — it is always a subspace of V and reveals how much information T "collapses."

> [!concept] Core Claim
> ker(T) = {v ∈ V | T(v) = 0}; the dimension of the kernel (nullity) tells you how many dimensions T destroys — the larger the kernel, the less injective (one-to-one) T is.

## Explanation

Think of the kernel as the "blind spot" of the transformation. Any vector in the kernel is mapped to zero — effectively erased. If the kernel contains only the zero vector, then T is injective (one-to-one): different inputs always produce different outputs. If the kernel is non-trivial (contains non-zero vectors), then T is not injective: those vectors in the kernel are all mapped to the same point (zero), so information is lost.

To find the kernel in practice: set T(v) = 0 and solve the resulting homogeneous system of equations. For T(x) = Ax, this becomes Ax = 0 — the null space of the matrix A. The solution set is always a subspace, with the trivial solution (v = 0) always present.

The Rank-Nullity Theorem connects kernel and range: dim(ker T) + dim(range T) = dim(V). This means a larger kernel forces a smaller range — the transformation's "reach" is limited by how much it collapses. For T: Rⁿ → Rᵐ via Ax = b, nullity = n − rank(A).

## Key Points

- ker(T) = {v ∈ V | T(v) = 0} — always contains 0
- Finding ker(T): solve T(v) = 0 as a homogeneous system
- ker(T) = {0} ⟺ T is injective (one-to-one)
- dim(ker T) = nullity of T
- Rank-Nullity: nullity(T) + rank(T) = dim(V)

## Example

T: R⁴ → R³ defined by T(a,b,c,d) = (a+b, b−c, a+d)

Set T(v) = 0:
a+b = 0
b−c = 0
a+d = 0

From first two: b = −a, c = b = −a. From third: d = −a.
Solution: (a, b, c, d) = (a, −a, −a, −a) = a(1, −1, −1, −1)

ker(T) = span{(1, −1, −1, −1)}, dim(ker T) = 1

> [!recall] T: R³ → R² is defined by T(x,y,z) = (x+y, y+z). Find ker(T) and its dimension. Then use Rank-Nullity to determine dim(range T) without computing the range directly.

## See Also

- [[linear-transformation|Linear Transformation]] — the function whose kernel we study
- [[range-of-linear-transformation|Range]] — the complementary concept; rank-nullity connects the two
- [[system-of-linear-equations-solution-types|Solution Types]] — finding the kernel reduces to solving a homogeneous system
- [[linear-independence-and-dependence|Linear Independence]] — kernel = {0} means columns of A are linearly independent
