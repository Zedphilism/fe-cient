---
title: "Linear Transformation"
date: 2026-04-26
tags: [semester-3, seci1113, discrete-math]
---

# Linear Transformation

A linear transformation is a function T: V → W between two vector spaces that preserves the two fundamental vector operations — addition and scalar multiplication — meaning the output of transforming combined vectors equals the combination of individually transformed vectors.

> [!concept] Core Claim
> T is linear if and only if T(cu + v) = cT(u) + T(v) for all vectors u, v and scalar c — equivalently, T must map the zero vector to zero and distribute over addition and scaling.

## Explanation

Think of a linear transformation as a funhouse mirror that distorts space uniformly. Distances and angles may change, but the rules of straight lines and proportions are preserved: if you stretch a vector by 3 and then transform it, you get the same result as transforming first and then stretching by 3. Linearity means the transformation has no "offset" — it cannot shift the origin.

The two defining properties are: (1) additivity — T(u + v) = T(u) + T(v); and (2) homogeneity — T(cu) = cT(u). Both are captured by the single combined condition T(cu + v) = cT(u) + T(v). A quick test for non-linearity: if T maps the zero vector to anything other than zero (T(0) ≠ 0), the transformation is immediately not linear, because T(0) = T(0·v) = 0·T(v) = 0 must hold.

Matrix multiplication T(x) = Ax is the canonical linear transformation from Rⁿ to Rᵐ. Every linear transformation between finite-dimensional vector spaces can be represented as matrix multiplication, which is why matrices are central to linear algebra.

## Key Points

- Two conditions: T(u+v) = T(u)+T(v) and T(cu) = cT(u)
- Equivalent single condition: T(cu+v) = cT(u)+T(v)
- Necessary condition: T(0) = 0 (zero vector maps to zero vector)
- If V = W, T is called a linear operator
- T(x) = Ax is always linear (matrix multiplication preserves both conditions)
- Special cases: zero transformation T(v)=0; identity transformation T(v)=v

## Example

Show T(v₁, v₂) = (v₁ − v₂, v₁ + 2v₂) is linear:

Let u = (u₁, u₂), v = (v₁, v₂):
T(u+v) = T(u₁+v₁, u₂+v₂) = ((u₁+v₁)−(u₂+v₂), (u₁+v₁)+2(u₂+v₂))
= (u₁−u₂ + v₁−v₂, u₁+2u₂ + v₁+2v₂)
= T(u) + T(v) ✓

T(cu) = T(cu₁, cu₂) = (cu₁−cu₂, cu₁+2cu₂) = c(u₁−u₂, u₁+2u₂) = cT(u) ✓

Non-example: T(x) = x+1 is not linear — T(0) = 1 ≠ 0.

> [!recall] Is T(x,y) = (x+y, xy) a linear transformation from R² to R²? Prove or disprove using the definition. Hint: check T(0,0) and T(u+v) vs T(u)+T(v).

## See Also

- [[kernel-of-linear-transformation|Kernel]] — vectors that T maps to zero
- [[range-of-linear-transformation|Range]] — all vectors that T can produce
- [[matrix-operations|Matrix Operations]] — matrix multiplication is the standard linear transformation
- [[vector-space-axioms|Vector Space Axioms]] — the structure in which linear transformations operate
