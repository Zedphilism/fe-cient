---
title: "Linear Independence and Dependence"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Linear Independence and Dependence

A set of vectors is linearly independent if the only way to combine them to produce the zero vector is to use all-zero scalars — any non-trivial combination equalling zero means the set is linearly dependent and at least one vector is redundant.

> [!concept] Core Claim
> Linear dependence means redundancy: if a set is dependent, one of its vectors can be expressed as a linear combination of the others and contributes no new "direction" — removing it does not shrink the span. Independence means every vector in the set points somewhere genuinely new that the others cannot reach.

## Explanation

Think of a set of vectors as a team of GPS satellites: each independent satellite covers a unique region of sky, and together they triangulate your position. A dependent satellite is one that orbits in the exact same plane as two others — it adds no new directional information and can be removed without losing coverage. Linearly independent vectors are like satellites that each cover an angle no others do; dependent ones are redundant team members.

The formal test is the homogeneous equation: set c₁v₁ + c₂v₂ + … + cₙvₙ = 0 and ask for all solutions. Arrange the vectors as columns to form the matrix [v₁ | v₂ | … | vₙ] and row-reduce it (no augmented column needed since the right side is always 0). If the only solution is c₁ = c₂ = … = cₙ = 0 (no free variables), the set is linearly independent. If any free variable appears, there are infinitely many solutions — non-trivial ones exist, so the set is linearly dependent.

The geometric consequence follows directly: in Rⁿ, at most n vectors can be linearly independent. Any set of n+1 or more vectors in Rⁿ must be dependent — there are only n independent directions available in n-dimensional space. In R², two vectors are independent if and only if they are not parallel; three vectors in R² are always dependent. This geometric picture is the most useful intuition check before doing arithmetic.

## Key Points

- Independent: only solution to Σcᵢvᵢ = 0 is cᵢ = 0 for all i (trivial solution only)
- Dependent: non-trivial solution exists (some cᵢ ≠ 0)
- Test: row-reduce [v₁ | … | vₙ]; free variable → dependent; no free variables → independent
- n+1 or more vectors in Rⁿ → always dependent
- Dependent set has at least one redundant vector (expressible as a combination of the others)

## Example

Standard basis test in R³: e₁ = (1,0,0), e₂ = (0,1,0), e₃ = (0,0,1).

c₁e₁ + c₂e₂ + c₃e₃ = (c₁, c₂, c₃) = (0, 0, 0) → forces c₁ = c₂ = c₃ = 0. **Linearly independent** ✓.

Dependent set: v₁ = (1, 2), v₂ = (2, 4).

c₁(1,2) + c₂(2,4) = (0,0) → c₁ + 2c₂ = 0 and 2c₁ + 4c₂ = 0. Both give c₁ = −2c₂. Setting c₂ = 1 gives c₁ = −2: −2v₁ + v₂ = −2(1,2) + (2,4) = (0,0). v₂ = 2v₁ — v₂ is exactly double v₁ (they are parallel). **Linearly dependent**.

Test in R⁴ (v₁ = (1,−2,3,−4), v₂ = (−1,3,4,2), v₃ = (1,1,−2,−2)): form the 4×3 matrix [v₁|v₂|v₃], row-reduce to check for free variables.

> [!recall] Determine whether {u = (1, 2, 3), v = (0, 1, 4), w = (2, 5, 10)} is linearly independent or dependent. If dependent, express one vector as a linear combination of the others. Then explain: why can no set of 4 vectors in R³ ever be linearly independent?

## See Also

- [[linear-combination-of-vectors|Linear Combination of Vectors]] — dependence means one vector is a linear combination of others
- [[vector-space-axioms|Vector Space Axioms]] — independence is fundamental to defining a basis
- [[gaussian-elimination|Gaussian Elimination]] — row reduction used to test independence
