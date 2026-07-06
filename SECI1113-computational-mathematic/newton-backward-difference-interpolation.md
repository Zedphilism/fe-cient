---
title: "Newton Backward-Difference Interpolation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Newton Backward-Difference Interpolation

The Newton backward-difference formula constructs an interpolating polynomial using backward differences anchored at the last row of an equally-spaced data table — it is the mirror of the forward formula and most accurate when estimating values near the end of the data range.

> [!concept] Core Claim
> Backward-difference interpolation is structurally identical to forward-difference interpolation but reads the difference table from the bottom up instead of the top down — anchoring at the last data point xₙ means the target x is always close to the reference point when estimating near the table end, keeping r small and the approximation accurate.

## Explanation

Think of choosing between forward and backward interpolation like choosing which end of a measuring tape to anchor. If you want to measure near the left end, you clip the tape at the left (x₀, forward formula). If you want to measure near the right end, you clip it at the right (xₙ, backward formula). In both cases the tape is the same length, but anchoring at the closer end gives you the least slack (fewest accumulated difference terms) and the most precision.

The backward difference operator ∇ subtracts the previous value from the current: ∇yₖ = yₖ − yₖ₋₁. Higher orders follow: ∇²yₖ = ∇yₖ − ∇yₖ₋₁, and in general ∇ʲyₖ = ∇ʲ⁻¹yₖ − ∇ʲ⁻¹yₖ₋₁. The backward-difference table is built exactly like the forward table, but the last row (∇yₙ, ∇²yₙ, …, ∇ⁿyₙ) is the one used in the formula. Set r = (x − xₙ)/h — because xₙ is the last (largest) point and x is typically slightly below it, r is typically slightly negative.

The formula is: pₙ(x) = yₙ + r·∇yₙ + [r(r+1)/2!]·∇²yₙ + [r(r+1)(r+2)/3!]·∇³yₙ + … Note the sign difference from the forward formula: the binomial coefficients use r(r+1) not r(r−1), because the backward formula counts differences in the reverse direction. For r ∈ [−1, 0] (x between xₙ₋₁ and xₙ), the approximation is most accurate.

## Key Points

- Requires equally-spaced x-values; reference point is xₙ (last data point)
- Backward difference: ∇yₖ = yₖ − yₖ₋₁ (subtract previous)
- r = (x − xₙ) / h (typically negative for x < xₙ)
- Formula uses bottom row of difference table: yₙ, ∇yₙ, ∇²yₙ, …
- Best for x near the end of the table (r ∈ [−1, 0])

## Example

Same data: x ∈ {1.0, 1.2, 1.4, 1.6, 1.8, 2.0}, h = 0.2. Estimate y(1.9).

Reference point: xₙ = x₅ = 2.0, yₙ = 0.3333.
r = (1.9 − 2.0) / 0.2 = **−0.5**

Bottom row of backward-difference table:
∇y₅ = −0.0238, ∇²y₅ = 0.0037, ∇³y₅ = −0.0009, (higher terms small)

```
p₅(1.9) = 0.3333
         + (−0.5)(−0.0238)
         + [(−0.5)(0.5)/2](0.0037)
         + [(−0.5)(0.5)(1.5)/6](−0.0009)
         + ...
         = 0.3333 + 0.0119 − 0.000463 + 0.0000563...
         ≈ 0.3447
```

Compare with the forward formula applied at the same point — both converge to the same polynomial, but the backward formula requires fewer terms because the reference is closer.

> [!recall] You have 5 equally spaced data points for a function. You need to estimate the value at the second-to-last data interval. (a) Should you use the forward or backward formula? Justify your choice in terms of accuracy. (b) If r = (x − x₄)/h = −0.3, what does this tell you about the position of x relative to x₄ and x₃? (c) Write the first two terms of the backward-difference formula for this case.

## See Also

- [[newton-forward-difference-interpolation|Newton Forward-Difference Interpolation]] — for values near the beginning of the table
- [[interpolation-definition|Interpolation]] — overview and when to use each formula
- [[absolute-and-relative-error|Absolute and Relative Error]] — comparing interpolated vs. true values
