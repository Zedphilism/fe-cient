---
title: "Trapezoidal Rule"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Trapezoidal Rule

The trapezoidal rule approximates ∫ₐᵇ f(x) dx by replacing the curve on each subinterval with a straight line, summing the resulting trapezoid areas — the formula weights interior nodes by 2 and endpoints by 1, and the error is O(h²).

> [!concept] Core Claim
> The trapezoidal rule is the simplest numerical integration method: it replaces the true curved area under f(x) with the area under a piecewise-linear approximation, trading exact geometry for simple arithmetic — the more subintervals (smaller h), the better the straight lines approximate the curve and the smaller the truncation error.

## Explanation

Think of the trapezoidal rule like painting a curved-top window with rectangular paint rollers: if you use one wide roller, you miss or overshoot the curve significantly. If you switch to many narrow rollers, the collection of rectangles — or in this case, trapezoids — closely follows the curve. The trapezoidal rule uses one trapezoid per subinterval instead of a rectangle, which already does a better job than pure rectangles by connecting both endpoint heights with a sloped top.

The mechanism divides [a, b] into N equal subintervals of width h = (b − a)/N, producing nodes x₀ = a, x₁ = a + h, …, xₙ = b. The area under f between xₖ and xₖ₊₁ is approximated by the trapezoid with parallel sides f(xₖ) and f(xₖ₊₁): area = (h/2)(f(xₖ) + f(xₖ₊₁)). When all N trapezoids are summed, each interior node appears once as a right side and once as a left side, giving it a weight of 2. Only the two endpoints x₀ and xₙ appear just once each. This produces the composite formula: ∫ₐᵇ f(x) dx ≈ (h/2)[f₀ + 2f₁ + 2f₂ + … + 2fₙ₋₁ + fₙ].

The error per subinterval is O(h²), which means halving h reduces the truncation error by a factor of 4. The trapezoidal rule works even when f is known only as a table of values (no analytic formula required) — making it the default method when integrating experimental data.

## Key Points

- Formula: ∫ₐᵇ f(x) dx ≈ (h/2)[f₀ + fₙ + 2(f₁ + f₂ + … + fₙ₋₁)]
- h = (b − a)/N; N subintervals, N+1 equally spaced nodes
- Interior nodes weighted 2; endpoints weighted 1
- Error is O(h²) — halving h quartuples accuracy
- Works when f is only known at discrete points (no formula needed)

## Example

Approximate ∫₁⁴ x/(x+4) dx with N = 6 subintervals (h = 0.5).

Nodes: 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0.
Compute fₖ = xₖ/(xₖ+4) at each node:
f₀=0.2000, f₁=0.2727, f₂=0.3333, f₃=0.3846, f₄=0.4286, f₅=0.4667, f₆=0.5000.

Apply formula:
≈ (0.5/2)[0.2000 + 0.5000 + 2(0.2727 + 0.3333 + 0.3846 + 0.4286 + 0.4667)]
= 0.25[0.7000 + 2(1.8859)]
= 0.25[0.7000 + 3.7718]
= 0.25 × 4.4718 ≈ **1.1180**

Using N = 12 (h = 0.25) gives a more accurate result, demonstrating the O(h²) improvement.

> [!recall] Use the trapezoidal rule to estimate ∫₀¹ e^x dx with N = 4 subintervals. The exact answer is e − 1 ≈ 1.7183. (a) Compute your approximation. (b) Calculate the absolute error. (c) If you double N to 8, by roughly what factor should the error decrease? Verify by applying the rule with N = 8.

## See Also

- [[numerical-error-types|Numerical Error Types]] — truncation error arising from straight-line approximation
- [[simpsons-rule|Simpson's Rule]] — higher-accuracy alternative using parabolic approximation
- [[numerical-differentiation-finite-differences|Numerical Differentiation: Finite Differences]] — complementary operation to integration
