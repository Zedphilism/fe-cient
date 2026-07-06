---
title: "Absolute and Relative Error"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Absolute and Relative Error

Absolute error |N − n| measures the raw gap between a true value N and its approximation n, while relative error |N − n| / |N| scales that gap by the magnitude of the true value — making it the more informative measure when values span very large or very small ranges.

> [!concept] Core Claim
> Relative error is contextual precision: a gap of 4 is excellent when the true value is 10 million (four parts per ten million) but catastrophic when it is 0.000012 (a third of the value gone missing) — absolute error alone is blind to this context, which is why relative error is the standard quality measure in numerical methods.

## Explanation

Think of absolute and relative error like two ways to describe how late a train is. Saying "the train is 5 minutes late" is the absolute error — a raw gap. But whether that matters depends on the context: 5 minutes late on a 2-hour journey is negligible, but 5 minutes late when the connection window is 4 minutes is catastrophic. Relative error is the "fraction of the total journey that was lost" — a scale-free measure that accounts for context.

The mechanism is simple arithmetic. Given the true value N and the approximation n, the signed error is ε = N − n (positive means we underestimated, negative means we overestimated). The absolute error |e| = |N − n| discards the sign and always reports a non-negative gap. The relative error eᵣₑₗ = |N − n| / |N| divides by |N| to normalise — it is dimensionless and tells you what fraction of the true value the error represents. When N is unknown in practice (as it usually is), the denominator is replaced by the approximation |n|.

For rounding specifically, the rule is: rounding a number to n decimal places guarantees |e| ≤ 0.5 × 10⁻ⁿ. Rounding to 2 decimal places, the maximum absolute error is 0.005; to 4 decimal places, it is 0.00005. This bound is exact and follows directly from how the round-half-up rule works.

## Key Points

- Absolute error: |e| = |N − n|; always ≥ 0; measures raw gap
- Relative error: eᵣₑₗ = |N − n| / |N|; scale-free; use |n| if |N| unknown
- Percentage relative error: eᵣₑₗ × 100%
- Rounding to n decimal places: |e| ≤ 0.5 × 10⁻ⁿ
- Relative error is more meaningful when values are very large or very small

## Example

True value N = π ≈ 3.1415926535898, approximation n = 3.14:

Absolute error: |3.1415926… − 3.14| = **0.0015927**
Relative error: 0.0015927 / 3.1415927 ≈ **0.000507** ≈ **0.05%**

Contrast — same absolute error, different relative error:
- N = 1,000,000; n = 999,996: |e| = 4, eᵣₑₗ = 4/1,000,000 = 0.000004 (excellent: 0.0004%)
- N = 0.000012; n = 0.000009: |e| = 0.000003 (tiny!), eᵣₑₗ = 0.000003/0.000012 = 0.25 (terrible: 25%)

Rounding bound: rounding to 3 decimal places → |e| ≤ 0.5 × 10⁻³ = 0.0005.

> [!recall] A barometer reads 101,324 Pa when the true atmospheric pressure is 101,325 Pa. A second device reads 0.98 atm when the true pressure is 1.00 atm. (a) Compute absolute and relative error for each device. (b) Which device is more accurate by relative error? (c) Why would reporting only the absolute error be misleading when comparing these two devices?

## See Also

- [[numerical-error-types|Numerical Error Types]] — where errors originate
- [[rounding-error-propagation|Rounding Error Propagation]] — how errors combine in arithmetic operations
- [[convergence-criteria|Convergence Criteria]] — relative error used as a stopping criterion for iterations
