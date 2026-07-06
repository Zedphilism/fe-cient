---
title: "Newton-Raphson Method"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Newton-Raphson Method

The Newton-Raphson method finds roots of f(x) = 0 by following the tangent line at the current estimate to its x-axis crossing, producing the next estimate — it achieves quadratic convergence but requires the derivative f′(x) and can diverge with poor initial guesses.

> [!concept] Core Claim
> Newton's method is a tangent-line algorithm: at each step it replaces the curve with its best local linear approximation (the tangent) and finds where that line hits zero — the tangent is a better predictor than a horizontal bisect, which is why Newton's method converges far faster than bisection, doubling the accurate digits with each iteration near the root.

## Explanation

Think of Newton's method like a mountain climber using a GPS elevation map: instead of blindly searching left or right (bisection), you look at the slope of the ground where you are standing (the derivative) and walk in the direction that the slope points toward zero elevation. Each step is informed by the terrain, so you converge much faster — but if the slope is flat (f′ ≈ 0) or points in a misleading direction (inflection near the root), you can step off a cliff.

The derivation is geometric. At the current estimate xₙ, draw the tangent line to the curve. The tangent has slope f′(xₙ), so its equation is y − f(xₙ) = f′(xₙ)(x − xₙ). Setting y = 0 and solving for x gives the iteration formula: xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). This formula is exact — no approximation of the tangent is needed. The method is applied repeatedly: compute f and f′ at the current estimate, apply the formula, test for convergence, repeat.

Two failure modes are important to understand. First, if f′(xₙ) = 0, the division by zero makes the formula fail — the tangent is horizontal and never crosses the x-axis. Second, if the initial guess x₀ is far from the root in a region where the function curves sharply, the tangent may point toward a very different location, and the sequence diverges. The IVT bracket (from the bisection note) provides a principled way to choose x₀ close enough to guarantee convergence. Near the root, the convergence is quadratic: the error roughly squares with each step, meaning 2 correct digits become 4, then 8, then 16.

## Key Points

- Formula: xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)
- Requires derivative f′(x) at each iterate
- Quadratic convergence near root — fastest common method
- Fails if f′(xₙ) = 0; may diverge if x₀ is far from root
- Special case: √c via f(x) = x² − c → xₙ₊₁ = (xₙ + c/xₙ)/2

## Example

Solve f(x) = x³ − 2x² − 5, x₀ = 2, ε = 0.0005. (Root ≈ 2.6906.)

f′(x) = 3x² − 4x.

Iteration 1: f(2) = 8 − 8 − 5 = −5; f′(2) = 12 − 8 = 4.
x₁ = 2 − (−5)/4 = **3.25**. |x₁ − x₀| = 1.25 > 0.0005 → continue.

Iteration 2: f(3.25) ≈ 34.328 − 21.125 − 5 = 8.203; f′(3.25) = 31.6875 − 13 = 18.6875.
x₂ = 3.25 − 8.203/18.6875 ≈ **2.811**. |x₂ − x₁| ≈ 0.439 → continue.

Continue until |xₙ₊₁ − xₙ| < 0.0005. Typically converges in 4–6 iterations.

Square root shortcut: find √5 with x₀ = 2. xₙ₊₁ = (xₙ + 5/xₙ)/2.
x₁ = (2 + 2.5)/2 = 2.25. x₂ = (2.25 + 5/2.25)/2 ≈ 2.2361. Converges rapidly to √5 ≈ 2.2361.

> [!recall] Apply Newton's method to f(x) = x³ − x − 2, starting at x₀ = 1. (a) Write f′(x). (b) Compute x₁ and x₂. (c) At x₀ = 1, is f′(1) close to zero? What risk does this create? (d) After 3 iterations, assess whether the method appears to be converging. What visual test on the function graph could have confirmed x₀ = 1 is a reasonable starting point?

## See Also

- [[secant-method|Secant Method]] — avoids needing f′ by approximating it numerically
- [[bisection-method|Bisection Method]] — no derivative needed; guaranteed convergence
- [[convergence-criteria|Convergence Criteria]] — stopping rules for the iteration
- [[intermediate-value-theorem|Intermediate Value Theorem]] — useful for choosing x₀ near the root
