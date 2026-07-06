---
title: "Vector Arithmetic"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Vector Arithmetic

Vector addition, subtraction, and scalar multiplication in Rⁿ are performed entry-by-entry and satisfy eight algebraic properties that mirror familiar number arithmetic — these properties are exactly what qualifies Rⁿ as a valid vector space.

> [!concept] Core Claim
> Vector arithmetic is entry-wise: to add two vectors you add their components in lockstep, and to scale a vector you scale every component by the same factor — the geometry follows directly, with addition producing the diagonal of a parallelogram and scalar multiplication stretching or flipping the arrow.

## Explanation

Think of vectors as shopping carts with n compartments: adding two carts means combining the quantities in each compartment separately (eggs + eggs, apples + apples), and scaling a cart means multiplying every compartment's quantity by the same number. You cannot add carts with different numbers of compartments — dimensions must match for addition, just as you cannot add 3D and 4D vectors.

The mechanism is component-wise: for u = (u₁, …, uₙ) and v = (v₁, …, vₙ), addition gives u + v = (u₁+v₁, u₂+v₂, …, uₙ+vₙ). Subtraction is u − v = u + (−v), where −v = (−v₁, …, −vₙ) reverses every component. Scalar multiplication c·u = (cu₁, cu₂, …, cuₙ) scales the length by |c| and reverses the direction if c < 0. These three operations are all you need to build any linear combination of vectors.

The eight properties — commutative, associative, additive identity, additive inverse, and four distributive/scaling laws — guarantee that vector arithmetic behaves predictably. They are not arbitrary rules; they are the minimal conditions that make it safe to rearrange and simplify expressions algebraically. Any system of objects with addition and scalar multiplication satisfying all eight properties is called a vector space, which is a much more general concept than just Rⁿ.

## Key Points

- Add/subtract: same dimension required; component-wise
- Scalar multiplication: multiply every component by c; scales magnitude by |c|; c < 0 flips direction
- −v: same magnitude as v, opposite direction; additive inverse
- Eight properties hold for all vectors in Rⁿ — these define a vector space
- All operations produce another vector in the same Rⁿ (closure)

## Example

Let u = (1, 4, 5, −3) and v = (8, 1, −2, −1) in R⁴.

Addition: u + v = (1+8, 4+1, 5+(−2), −3+(−1)) = **(9, 5, 3, −4)**

Scalar multiplication: 2u = (2, 8, 10, −6)

Linear combination: 2u − 3v = (2, 8, 10, −6) − (24, 3, −6, −3) = **(−22, 5, 16, −3)**

Geometric interpretation in R²: if u = (3, 1) and v = (1, 4), then u + v = (4, 5) is the diagonal of the parallelogram formed by u and v from the origin.

> [!recall] Let u = (2, −1, 3) and v = (0, 4, −2). Compute: (a) 3u − 2v; (b) −u + v; (c) find scalars c and k such that c·u + k·v = (6, −11, 13). Explain geometrically what it means to find such c and k.

## See Also

- [[vector-definition-rn-space|Vectors and Rn Space]] — what vectors are
- [[euclidean-norm|Euclidean Norm]] — length of a vector computed from components
- [[vector-space-axioms|Vector Space Axioms]] — formal generalisation of the eight properties
