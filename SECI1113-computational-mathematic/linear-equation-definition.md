---
title: "Linear Equation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Linear Equation

A linear equation in variables x₁, x₂, …, xₙ is any equation of the form a₁x₁ + a₂x₂ + … + aₙxₙ = b, where a₁…aₙ are real-number coefficients and b is a constant — every term involves exactly one variable raised to the first power, with no products, squares, or functions of variables.

> [!concept] Core Claim
> "Linear" means first-degree: the equation describes a flat geometric object (a line in 2D, a plane in 3D, a hyperplane in nD), and this flatness is what makes systems of linear equations solvable by systematic elimination.

## Explanation

Think of a linear equation as a perfectly balanced scale: each variable xᵢ is a weight placed in proportion aᵢ, and the constant b is what the other side of the scale must read. Changing one weight shifts the balance predictably — scaling and shifting are the only operations involved, which is exactly what "linear" means. There are no curved levers, no weights multiplying each other, no weights that grow with the load.

The linearity restriction is structural, not arbitrary. When every term is of the form aᵢxᵢ (a constant times a single variable), the equation's geometry is always flat: two variables trace a line, three variables trace a plane. Crucially, flat objects can only intersect in three ways — exactly once, along a shared region, or not at all — which is why a system of linear equations always has exactly one of three solution types. The moment you allow x², sin(x), or x·y, the geometry curves, and systematic elimination breaks down.

A solution is an ordered n-tuple (s₁, s₂, …, sₙ) that satisfies the equation when substituted: a₁s₁ + a₂s₂ + … + aₙsₙ = b must hold exactly. Verification is always by substitution — plug in and check both sides are equal. An equation with zero coefficients on some variables is still linear; a zero coefficient simply means that variable does not appear, not that the equation is nonlinear.

## Key Points

- Form: a₁x₁ + a₂x₂ + … + aₙxₙ = b; coefficients and constant are real numbers
- Nonlinear disqualifiers: x², √x, sin(x), ln(x), x·y, 1/x — any exponent ≠ 1 or interaction term
- Solution: n-tuple (s₁, …, sₙ) that makes the equation true by substitution
- Geometric interpretation: line (2D), plane (3D), hyperplane (nD)

## Example

Given 2x₁ − 3x₂ = 8:

- Test (1, −2): 2(1) − 3(−2) = 2 + 6 = 8 ✓ → solution
- Test (1, 1): 2(1) − 3(1) = −1 ≠ 8 → not a solution

Nonlinear examples (and why): x₁² + x₂ = 4 (x₁ squared), x₁ · x₂ = 3 (product of variables), sin(x₁) = 0.5 (function of variable), √x₁ + x₂ = 2 (fractional exponent).

Linear despite appearances: 2(x₁ − x₂) = 8 is linear — expand to 2x₁ − 2x₂ = 8. The coefficient can be distributed to reveal the standard form.

> [!recall] Classify each as linear or nonlinear, and justify: (a) 3x₁ − 2x₂ + 0·x₃ = 7; (b) x₁ + √x₂ = 4; (c) 2(x₁ − x₂) = 8; (d) x₁/x₂ = 3. For each nonlinear case, identify exactly which term violates the linearity condition.

## See Also

- [[system-of-linear-equations-solution-types|System of Linear Equations: Solution Types]] — what happens when multiple linear equations share variables
- [[augmented-matrix|Augmented Matrix]] — compact matrix representation used to solve systems
- [[matrix-types-and-notation|Matrix Types and Notation]] — the matrix form of linear systems
