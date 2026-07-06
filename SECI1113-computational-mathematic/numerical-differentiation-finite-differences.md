---
title: "Numerical Differentiation: Finite Differences"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Numerical Differentiation: Finite Differences

Finite difference formulas estimate f′(x) at a point using nearby function values — forward, backward, or central differences — all derived from Taylor series truncation, with accuracy ranging from O(h) for 2-point formulas to O(h⁴) for 5-point formulas.

> [!concept] Core Claim
> Finite difference differentiation approximates the instantaneous slope of f by the average slope between nearby discrete points — the key trade-off is that using points farther apart (larger h) reduces rounding error from data noise but increases truncation error from the linear approximation, while smaller h does the opposite, so an optimal h exists between these extremes.

## Explanation

Think of estimating the slope of a hill: if you stand at one point and look at a nearby point, the ratio (height difference)/(horizontal distance) approximates the slope. If the two points are very close, your height measurements' rounding errors dominate the fraction (tiny denominator amplifies noise). If they are far apart, the slope between them poorly represents the slope at your exact position (the hill curves between the points). The optimal step size h balances these two competing effects.

The derivation starts from Taylor's theorem. Expanding f around xᵢ: f(xᵢ + h) = f(xᵢ) + hf′(xᵢ) + (h²/2)f″(xᵢ) + … Solving for f′(xᵢ) and discarding higher terms gives the forward difference: f′(xᵢ) ≈ [f(xᵢ + h) − f(xᵢ)] / h with error O(h). The backward difference replaces xᵢ + h with xᵢ − h. The central difference averages the two expansions: f′(xᵢ) ≈ [f(xᵢ + h) − f(xᵢ − h)] / (2h) — the O(h) terms cancel, yielding O(h²) accuracy for the same step size.

Three-point formulas improve accuracy by using three data points. The central 3-point formula [f(xᵢ + h) − f(xᵢ − h)] / (2h) is O(h²). The one-sided 3-point formulas (forward and backward) are also O(h²) but use asymmetric weights. Five-point formulas achieve O(h⁴). The central difference is always preferred for interior points because both accuracy and numerical stability are better; forward and backward formulas are used when the point is at a data boundary and one side is unavailable.

## Key Points

- All formulas derived from Taylor series; truncating produces different accuracy orders
- 2-point forward: f′(xᵢ) ≈ [f(xᵢ+h) − f(xᵢ)] / h — O(h) error; for left boundary
- 2-point backward: f′(xᵢ) ≈ [f(xᵢ) − f(xᵢ−h)] / h — O(h) error; for right boundary
- 3-point central: f′(xᵢ) ≈ [f(xᵢ+h) − f(xᵢ−h)] / (2h) — O(h²) error; preferred for interior
- Central is most accurate; use forward/backward only at boundaries

## Example

Data: f(x) = √x at x ∈ {1.00, 1.05, 1.10, 1.15, 1.20}, h = 0.05. Estimate f′(1.05).

2-point forward: f′(1.05) ≈ [√1.10 − √1.05] / 0.05 = [1.04881 − 1.02470] / 0.05 = **0.4822**

2-point backward: f′(1.05) ≈ [√1.05 − √1.00] / 0.05 = [1.02470 − 1.00000] / 0.05 = **0.4940**

3-point central: f′(1.05) ≈ [√1.10 − √1.00] / (2 × 0.05) = [1.04881 − 1.00000] / 0.10 = **0.4881**

Exact: f′(x) = 1/(2√x), f′(1.05) = 1/(2√1.05) ≈ **0.4879**. Central gives the closest result ✓.

> [!recall] The function f is known only at discrete points: f(2.0) = 0.693, f(2.1) = 0.742, f(2.2) = 0.788. (a) Estimate f′(2.1) using the 3-point central difference. (b) Estimate f′(2.0) using the forward difference. (c) If the function is f(x) = ln(x), compute the exact f′(2.1) and compare. (d) Explain why you cannot use the central difference at x = 2.0 with only this data.

## See Also

- [[numerical-error-types|Numerical Error Types]] — truncation and rounding error in finite differences
- [[trapezoidal-rule|Trapezoidal Rule]] — numerical integration, the complementary operation
- [[interpolation-definition|Interpolation]] — difference tables used in both interpolation and differentiation
