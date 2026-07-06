---
title: "Interpolation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Interpolation

Interpolation constructs a polynomial that passes exactly through a given set of data points, enabling estimation of function values between those points — given n+1 distinct data pairs, there is exactly one polynomial of degree ≤ n that fits all of them.

> [!concept] Core Claim
> Interpolation is the mathematical version of "connecting the dots with a curve": once you fit a unique polynomial through n+1 known points, you can evaluate it anywhere in the data range to estimate intermediate values — the polynomial is a surrogate for the unknown underlying function between measured points.

## Explanation

Think of interpolation like filling in missing pages of a book using the known surrounding pages: if you know what happened on pages 1, 10, 20, and 30, you can fit a smooth narrative curve through those four checkpoints and estimate what was on page 15 with reasonable accuracy. More pages (data points) give a higher-degree polynomial and a more accurate estimate.

The interpolation problem is formally: given n+1 data pairs (x₀, y₀), (x₁, y₁), …, (xₙ, yₙ) with all xₖ distinct, find a polynomial pₙ(x) of degree at most n such that pₙ(xₖ) = yₖ for every k. This polynomial is guaranteed to exist and is unique — a fundamental result of polynomial interpolation. The choice of method (Newton forward-difference, Newton backward-difference, Lagrange) changes the computational approach but always produces the same polynomial.

The practical consideration for Newton's methods is where in the table the estimation point falls. Forward-difference interpolation is most accurate when the target x is near the beginning of the equally-spaced table; backward-difference is most accurate near the end. Using the wrong formula for the wrong position does not give the wrong polynomial, but it can require more terms to achieve the same accuracy. Interpolation is distinct from least-squares approximation: interpolation passes through every data point exactly, while least-squares minimises overall error without necessarily hitting any point exactly.

## Key Points

- n+1 data points → unique polynomial of degree ≤ n passing through all of them
- x-values must be distinct
- Equally spaced x-values (step h) required for Newton forward/backward-difference formulas
- Use forward-difference for x near the beginning, backward-difference for x near the end
- Interpolation (exact fit) vs. least-squares approximation (minimised error, not exact fit)

## Example

Given data with h = 0.2:

| k | xₖ  | yₖ     |
|---|-----|--------|
| 0 | 1.0 | 0.5000 |
| 1 | 1.2 | 0.4545 |
| 2 | 1.4 | 0.4167 |
| 3 | 1.6 | 0.3846 |
| 4 | 1.8 | 0.3571 |
| 5 | 2.0 | 0.3333 |

Estimate y(1.1): target 1.1 is near the start → use Newton **Forward-Difference** from x₀ = 1.0.
Estimate y(1.9): target 1.9 is near the end → use Newton **Backward-Difference** from x₅ = 2.0.
Estimate y(1.5): target is in the middle → either method works; choose the closer endpoint.

> [!recall] A 4-point equally-spaced dataset gives x₀ = 0, x₁ = 1, x₂ = 2, x₃ = 3, with y-values 1, 4, 9, 16. (a) What degree polynomial will pass through all four points? (b) Would you use forward or backward differences to estimate y(0.5)? y(2.8)? (c) Do you expect the interpolating polynomial to exactly reproduce the pattern y = (x+1)²? Explain.

## See Also

- [[newton-forward-difference-interpolation|Newton Forward-Difference Interpolation]] — formula for estimation near the table start
- [[newton-backward-difference-interpolation|Newton Backward-Difference Interpolation]] — formula for estimation near the table end
- [[absolute-and-relative-error|Absolute and Relative Error]] — measuring interpolation accuracy against known values
