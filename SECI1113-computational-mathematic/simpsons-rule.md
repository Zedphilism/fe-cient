---
title: "Simpson's Rule"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Simpson's Rule

Simpson's rule (Simpson's 1/3 rule) approximates ∫ₐᵇ f(x) dx by fitting a parabola through every triplet of equally-spaced points and integrating it exactly — the composite formula uses the coefficient pattern 1, 4, 2, 4, 2, …, 4, 1, and achieves O(h⁴) accuracy.

> [!concept] Core Claim
> Simpson's rule is strictly more accurate than the trapezoidal rule for the same step size because it uses a parabolic (degree-2) approximation per subinterval-pair instead of a linear (degree-1) one — the higher the degree of the fitting polynomial, the better it captures curvature, and the error drops from O(h²) to O(h⁴), meaning halving h reduces error by a factor of 16 instead of 4.

## Explanation

Think of the trapezoidal rule as connecting dots with straight rulers, and Simpson's rule as using a flexible curve that bends to follow three points at once. The extra bending freedom (quadratic rather than linear) makes the approximation fit the actual curve much more closely between the points, capturing the concavity of f that straight lines completely ignore.

The mechanism requires N to be even (so pairs of subintervals can be processed together) with step h = (b − a)/N. Over each three-point group (xₖ, xₖ₊₁, xₖ₊₂), the parabola is fitted and integrated exactly to give (h/3)[fₖ + 4fₖ₊₁ + fₖ₊₂]. The middle point receives coefficient 4 because it controls the parabola's bend — a small change there has the largest effect on the integral. The two endpoint points receive coefficient 1. When all N/2 groups are summed, endpoints contribute 1 and 1, all true interior points alternate between 2 (shared between adjacent groups) and 4 (middle of their group), giving the pattern 1, 4, 2, 4, 2, …, 4, 1.

The O(h⁴) error means Simpson's rule is almost always preferred over the trapezoidal rule when function values are available at equally spaced points — the accuracy gain is free, requiring only a different weighting of the same node values. The only constraint is that N must be even; if the problem requires an odd number of subintervals, one must be handled separately.

## Key Points

- Formula: (h/3)[f₀ + 4f₁ + 2f₂ + 4f₃ + 2f₄ + … + 4fₙ₋₁ + fₙ]
- Coefficient pattern: 1, 4, 2, 4, 2, …, 4, 1 (alternating interior coefficients)
- N must be even; fits parabola over each pair of subintervals
- Error O(h⁴): halving h reduces error by factor of 16 (vs. factor of 4 for trapezoidal)
- Most accurate common numerical integration formula for smooth functions

## Example

Approximate ∫₀¹ eˣ dx with N = 4, h = 0.25. Nodes: 0, 0.25, 0.5, 0.75, 1.

f values: f₀ = 1.0000, f₁ = e^{0.25} ≈ 1.2840, f₂ = e^{0.5} ≈ 1.6487, f₃ = e^{0.75} ≈ 2.1170, f₄ = e¹ ≈ 2.7183.

Apply formula with coefficient pattern 1, 4, 2, 4, 1:
```
≈ (0.25/3)[1.0000 + 4(1.2840) + 2(1.6487) + 4(2.1170) + 2.7183]
= (1/12)[1.0000 + 5.1360 + 3.2974 + 8.4680 + 2.7183]
= (1/12)[20.6197]
≈ 1.7183
```

Exact value: e − 1 ≈ 1.71828. Error ≈ 0.00002 — remarkably accurate with just 4 subintervals.

Compare with trapezoidal rule (N = 4): ≈ 1.7272, error ≈ 0.009 — Simpson's is ~450× more accurate at the same step size.

> [!recall] Apply Simpson's rule to estimate ∫₁³ (1/x) dx using N = 4. The exact value is ln(3) ≈ 1.0986. (a) Verify N = 4 is even. (b) List the nodes and compute f at each. (c) Apply the formula. (d) Compute the absolute error. (e) Why must N be even for Simpson's rule, and what happens if you try N = 3?

## See Also

- [[trapezoidal-rule|Trapezoidal Rule]] — simpler but less accurate; O(h²) vs O(h⁴)
- [[numerical-error-types|Numerical Error Types]] — O(h⁴) error context and truncation error
- [[interpolation-definition|Interpolation]] — Simpson's rule fits a degree-2 interpolating polynomial per triplet
