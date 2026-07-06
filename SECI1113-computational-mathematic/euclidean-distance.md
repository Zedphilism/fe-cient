---
title: "Euclidean Distance"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Euclidean Distance

Euclidean distance d(u, v) between two vectors in Rⁿ is the norm of their difference: d(u, v) = ‖u − v‖ = √(Σᵢ (uᵢ − vᵢ)²) — it is the straight-line separation between two points, generalised from the familiar 2D distance formula to any number of dimensions.

> [!concept] Core Claim
> Euclidean distance is a measurement tool, not a transformation: it collapses two vectors down to a single non-negative number that answers "how far apart are these two points?" — and it does so by treating the difference vector u − v as an arrow from v to u and measuring that arrow's length.

## Explanation

Think of Euclidean distance as the length of a taut string stretched between two pins on a map. In 2D, the Pythagorean theorem gives the string's length — square the horizontal gap, square the vertical gap, add them, take the root. Euclidean distance in Rⁿ does exactly the same thing: for each of the n dimensions, compute how far apart the two points are in that direction, square it, add all n squares together, and take the root.

The mechanism is the difference vector: u − v is the vector that points from v to u. The Euclidean distance is simply the Euclidean norm of that difference vector, ‖u − v‖. This means distance inherits all the properties of the norm: it is always non-negative, it equals zero only when u = v (the two points are identical), and it is symmetric (d(u, v) = d(v, u) because ‖u − v‖ = ‖v − u‖). The triangle inequality also holds: the direct path between two points is never longer than going via a detour, d(u, w) ≤ d(u, v) + d(v, w).

The distinction between norm and distance is important: the Euclidean norm ‖v‖ measures how far v is from the origin (a single vector, one reference point), while Euclidean distance d(u, v) measures the separation between any two vectors — the origin is not involved. Norm is a special case of distance where one point is always the origin.

## Key Points

- d(u, v) = ‖u − v‖ = √(Σᵢ (uᵢ − vᵢ)²)
- Always ≥ 0; zero only when u = v
- Symmetric: d(u, v) = d(v, u)
- Triangle inequality: d(u, w) ≤ d(u, v) + d(v, w)
- Norm is the special case d(v, 0) — distance from v to the origin

## Example

u = (1, −2, 4, 1) and v = (3, 1, −5, 0) in R⁴.

u − v = (1−3, −2−1, 4−(−5), 1−0) = (−2, −3, 9, 1)

d(u, v) = √((−2)² + (−3)² + 9² + 1²) = √(4 + 9 + 81 + 1) = **√95 ≈ 9.747**

Verify symmetry: v − u = (2, 3, −9, −1). ‖v − u‖ = √(4 + 9 + 81 + 1) = √95 ✓

In R² (familiar case): u = (1, 3), v = (4, 7). d = √((4−1)² + (7−3)²) = √(9+16) = √25 = 5.

> [!recall] Points A = (2, 0, −1) and B = (5, 4, 3) are in R³. (a) Compute d(A, B). (b) Find the midpoint M = (A + B)/2. (c) Verify that d(A, M) = d(M, B) = d(A, B)/2. (d) Why is it correct to use the formula M = (A + B)/2 for the midpoint in Rⁿ?

## See Also

- [[euclidean-norm|Euclidean Norm]] — distance from the origin to a single vector
- [[vector-arithmetic|Vector Arithmetic]] — subtraction used to form the difference vector
- [[dot-product|Dot Product]] — alternative way to compute angles and distances
