---
title: "Cross Product"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Cross Product

The cross product u × v of two vectors in R³ produces a new vector that is perpendicular to both u and v, with magnitude equal to the area of the parallelogram they span — and it is only defined in three-dimensional space.

> [!concept] Core Claim
> The cross product is a perpendicularity machine: given two vectors, it manufactures a third vector pointing at right angles to both, with its magnitude encoding how "spread apart" the original vectors are — zero when they are parallel (no area), maximum when they are perpendicular (maximum area).

## Explanation

Think of the cross product as a carpenter's square that always sits flush against two boards: if you lay two boards flat on a table (two vectors in a plane), the cross product is the nail that sticks straight up through the table, perpendicular to both boards. If the boards are parallel — lying on top of each other — there is no unique perpendicular direction, and the cross product is zero (zero area, zero perpendicular vector).

The mechanism uses a determinant. Set up a 3×3 matrix with the unit vectors i, j, k in the first row, u's components in the second row, and v's components in the third row. Expand by cofactors along the first row:

u × v = det | i   j   k  |
            | u₁  u₂  u₃ |
            | v₁  v₂  v₃ |

= i(u₂v₃ − u₃v₂) − j(u₁v₃ − u₃v₁) + k(u₁v₂ − u₂v₁)

The magnitude ‖u × v‖ = ‖u‖ ‖v‖ sin θ, where θ is the angle between the vectors. This equals the area of the parallelogram formed by u and v. The direction of u × v follows the right-hand rule: curl the fingers of the right hand from u toward v, and the thumb points in the direction of u × v. The critical consequence of the right-hand rule is anti-commutativity: u × v = −(v × u). Swapping the order reverses the direction.

## Key Points

- Only defined in R³; result is a vector (not a scalar)
- u × v is perpendicular to both u and v
- Anti-commutative: u × v = −(v × u)
- ‖u × v‖ = ‖u‖ ‖v‖ sin θ = area of parallelogram spanned by u and v
- u × v = 0 when u and v are parallel (θ = 0° or 180°)

## Example

Find a × b for a = (2, −1, 3) and b = (−1, 2, 4).

```
a × b = det | i   j   k |
            | 2  -1   3 |
            |-1   2   4 |
```

i-component: (−1)(4) − (3)(2) = −4 − 6 = −10
j-component: −[(2)(4) − (3)(−1)] = −[8 + 3] = −11
k-component: (2)(2) − (−1)(−1) = 4 − 1 = 3

a × b = **(−10, −11, 3)**

Verify perpendicularity to a: a · (a × b) = (2)(−10) + (−1)(−11) + (3)(3) = −20 + 11 + 9 = **0** ✓
Verify perpendicularity to b: b · (a × b) = (−1)(−10) + (2)(−11) + (4)(3) = 10 − 22 + 12 = **0** ✓

> [!recall] Vectors u = (1, 2, 0) and v = (0, 1, 3) lie in R³. (a) Compute u × v. (b) Verify that u × v is perpendicular to both u and v using dot products. (c) Compute v × u. (d) Confirm that u × v = −(v × u). (e) Calculate the area of the parallelogram spanned by u and v.

## See Also

- [[dot-product|Dot Product]] — scalar result, measures alignment, works in any dimension
- [[euclidean-norm|Euclidean Norm]] — ‖u × v‖ = ‖u‖ ‖v‖ sin θ
- [[vector-definition-rn-space|Vectors and Rn Space]] — R³ context and vector fundamentals
