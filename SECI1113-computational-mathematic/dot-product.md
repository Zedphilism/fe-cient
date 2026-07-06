---
title: "Dot Product"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Dot Product

The dot product of two vectors u and v is a scalar — computed either as the sum of component-wise products (algebraic form) or as ‖u‖ ‖v‖ cos θ (geometric form) — and its sign reveals the angle relationship between the vectors, with zero meaning exactly perpendicular.

> [!concept] Core Claim
> The dot product is an alignment detector: it measures how much of one vector points in the direction of the other — a large positive value means the vectors aim in similar directions, zero means they are perpendicular, and a negative value means they face more than 90° apart.

## Explanation

Think of the dot product like a shadow: if you shine a light perpendicular to v and look at the shadow that u casts onto v, the dot product captures the length of that shadow scaled by ‖v‖. If u and v point in exactly the same direction, u's shadow is as long as u itself (maximum alignment, cos θ = 1). If u is perpendicular to v, it casts no shadow (cos 90° = 0, dot product = 0). If they point in opposite directions, the shadow falls behind (cos 180° = −1, negative dot product).

The geometric definition u · v = ‖u‖ ‖v‖ cos θ applies when the angle θ between the vectors is known and we are working in R² or R³. The algebraic definition u · v = u₁v₁ + u₂v₂ + … + uₙvₙ applies in any Rⁿ and is always computable from components alone. Both forms are equivalent — one can be derived from the other via the law of cosines. Because both definitions give the same number, we can use the algebraic form to compute the angle even in high dimensions: θ = arccos(u · v / (‖u‖ ‖v‖)).

The most important consequence is orthogonality: u · v = 0 if and only if u and v are perpendicular (orthogonal). This zero-condition is the algebraic test for perpendicularity in any dimension. The dot product is commutative (u · v = v · u) and distributes over addition, making it safe to expand expressions algebraically. The special case v · v = ‖v‖² connects the dot product back to the norm.

## Key Points

- Algebraic: u · v = Σᵢ uᵢvᵢ (always computable from components)
- Geometric: u · v = ‖u‖ ‖v‖ cos θ (requires angle or R²/R³)
- Result is a scalar, not a vector
- u · v > 0: angle < 90°; u · v = 0: orthogonal (90°); u · v < 0: angle > 90°
- Angle formula: θ = arccos(u · v / (‖u‖ ‖v‖))
- v · v = ‖v‖²; commutative and distributive

## Example

Find u · v for u = (0, 0, 3), v = (2, 0, 2), θ = 45°.

Geometric: ‖u‖ = 3, ‖v‖ = √(4+0+4) = 2√2. u · v = 3 · 2√2 · cos(45°) = 3 · 2√2 · (√2/2) = **6**.

Verify with algebraic: (0)(2) + (0)(0) + (3)(2) = **6** ✓

Orthogonality test: u = (1, 2, −1) and v = (2, 0, 2). u · v = (1)(2) + (2)(0) + (−1)(2) = 2 + 0 − 2 = **0**. These vectors are orthogonal.

Angle between a = (1, 0) and b = (1, 1) in R²: a · b = 1. ‖a‖ = 1, ‖b‖ = √2. θ = arccos(1/√2) = 45°.

> [!recall] Let u = (3, −1, 2) and v = (1, 4, −1). (a) Compute u · v using the algebraic formula. (b) Compute ‖u‖ and ‖v‖. (c) Find the angle θ between u and v in degrees. (d) Is this angle acute, right, or obtuse? Explain how you can tell from the sign of u · v before computing the angle.

## See Also

- [[euclidean-norm|Euclidean Norm]] — v · v = ‖v‖²; norm derived from dot product
- [[cross-product|Cross Product]] — produces a vector (not a scalar), defined only in R³
- [[linear-independence-and-dependence|Linear Independence and Dependence]] — orthogonal sets are always linearly independent
