---
title: "Vectors and Rn Space"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Vectors and Rn Space

A vector in Rⁿ is an ordered n-tuple of real numbers (a₁, a₂, …, aₙ) that represents both a magnitude and a direction — geometrically a directed arrow, algebraically a column or row of n coordinates.

> [!concept] Core Claim
> Rⁿ is the coordinate playground for linear algebra: it generalises the familiar 2D plane and 3D space to any number of dimensions, and every linear algebra concept (spans, solutions, transformations) takes place inside some Rⁿ — the dimension n tells you how many independent pieces of information describe a point in that space.

## Explanation

Think of a vector in Rⁿ as an address in an n-dimensional city: a 2D city needs two coordinates (street and avenue), a 3D building needs three (street, avenue, floor), and a 5D dataset needs five numbers to pin down one data point exactly. Rⁿ is simply the collection of all such addresses when you allow n coordinates. The rules of addition and scaling work the same way regardless of n — you never need to visualise 5D space to do the algebra.

The mechanism is the n-tuple: a vector v = (v₁, v₂, …, vₙ) specifies a unique point in Rⁿ, or equivalently a directed arrow from the origin to that point. Two vectors are equal if and only if they have the same number of components and every corresponding component is equal — equality is strict. The zero vector 0 has all components equal to 0 and represents the origin. Vectors can be written as row vectors (1 × n matrices) or column vectors (n × 1 matrices); the choice matters for matrix multiplication compatibility.

The reason Rⁿ matters is that it is the natural home of solutions to linear systems. A solution to a system of m equations in n unknowns is a vector in Rⁿ. The solution set of a consistent system is a point (unique), a line, a plane, or a higher-dimensional flat object — all living inside Rⁿ. Understanding the geometry of Rⁿ is what makes the algebraic machinery of linear algebra meaningful rather than mechanical.

## Key Points

- Vector in Rⁿ: ordered n-tuple (a₁, …, aₙ); has magnitude and direction
- Rⁿ is the set of all n-tuples of real numbers; R² = plane, R³ = 3D space
- Two vectors equal iff same number of components AND every component matches
- Zero vector: all components 0; lives at the origin
- Row vector: 1 × n matrix; column vector: n × 1 matrix — orientation matters for multiplication

## Example

In R²: v = (1, 2) — arrow from origin (0,0) to terminal point (1,2). Magnitude = √5.

In R³: v = (1, 3, 4) — three-component column vector.

In R⁴: u = (1, 4, 5, −3) and v = (8, 1, −2, −1) — these cannot be visualised, but all arithmetic (addition, dot product, norm) still applies exactly as in R² or R³.

Equal vectors: (2, −1, 3) = (2, −1, 3) ✓. Not equal: (2, −1) ≠ (2, −1, 0) — different dimensions.

> [!recall] Explain the difference between the point (3, 4) in R² and the vector (3, 4) in R². Why are both represented the same way algebraically? Then: two vectors u = (2, t, 1) and v = (2, 5, s − 1) are equal. Solve for t and s.

## See Also

- [[vector-arithmetic|Vector Arithmetic]] — addition, subtraction, scalar multiplication
- [[euclidean-norm|Euclidean Norm]] — computing the magnitude of a vector
- [[dot-product|Dot Product]] — angle-related operation between two vectors
