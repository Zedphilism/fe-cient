---
title: "Euclidean Norm"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Euclidean Norm

The Euclidean norm ‖v‖ of a vector v in Rⁿ is the square root of the sum of its squared components — it generalises the Pythagorean theorem to measure the straight-line length of any vector in any number of dimensions.

> [!concept] Core Claim
> The Euclidean norm is the n-dimensional version of the Pythagorean theorem: adding up the squared contributions of each component and taking the square root gives the straight-line distance from the origin to the tip of the vector, and every concept that depends on "length" (unit vectors, angles, distances) is built on top of this formula.

## Explanation

Think of the Euclidean norm as the GPS distance from your starting point to your destination, computed city-block by city-block across n dimensions: in 2D you go east then north (two components), in 3D you add elevation (three components), and in nD you have n perpendicular directions each contributing independently. The Pythagorean theorem applies at each step — you square each leg, sum them, and take the root.

The formula is ‖v‖ = √(v₁² + v₂² + … + vₙ²). In R², this is exactly √(v₁² + v₂²), the hypotenuse of the right triangle formed by the components. The norm is always non-negative because it is a square root of a sum of squares; it equals zero only for the zero vector (all components zero).

The norm enables two critical derived concepts. A unit vector has ‖u‖ = 1 and points purely in a direction without specifying magnitude. Any nonzero vector v can be normalised to a unit vector by dividing by its norm: û = v / ‖v‖. This operation preserves direction and discards magnitude, which is useful whenever you care about orientation but not scale. The norm also connects to the dot product: v · v = ‖v‖², which means the dot product is the algebraic version of squaring the length.

## Key Points

- Formula: ‖v‖ = √(Σᵢ vᵢ²) — sum of squared components, then square root
- Always ≥ 0; equals 0 only when v = 0
- Unit vector: ‖û‖ = 1; normalise: û = v / ‖v‖
- Scaling property: ‖cv‖ = |c| · ‖v‖
- Connection to dot product: v · v = ‖v‖²

## Example

u = (1, −2, 4, 1) in R⁴:
‖u‖ = √(1² + (−2)² + 4² + 1²) = √(1 + 4 + 16 + 1) = **√22 ≈ 4.690**

v = (3, 1, −5, 0):
‖v‖ = √(9 + 1 + 25 + 0) = **√35 ≈ 5.916**

Normalise v: û = (3/√35, 1/√35, −5/√35, 0). Verify: ‖û‖ = √(9/35 + 1/35 + 25/35 + 0) = √(35/35) = 1 ✓

Scaling: ‖3u‖ = 3·‖u‖ = 3√22 ✓

> [!recall] Let v = (4, 0, −3). (a) Compute ‖v‖. (b) Find the unit vector û in the direction of v. (c) Verify ‖û‖ = 1. (d) What is v · v? Confirm it equals ‖v‖². Then explain: if w = −2v, what is ‖w‖ and in which direction does w point?

## See Also

- [[euclidean-distance|Euclidean Distance]] — norm of the difference vector u − v
- [[dot-product|Dot Product]] — v · v = ‖v‖²; connects inner product to length
- [[vector-arithmetic|Vector Arithmetic]] — operations that produce vectors whose norms can be computed
