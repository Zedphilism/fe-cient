---
title: "Newton Forward-Difference Interpolation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Newton Forward-Difference Interpolation

The Newton forward-difference formula constructs an interpolating polynomial from a forward-difference table built at equally-spaced data points, using the first row of that table — it is most accurate when estimating values near the beginning or middle of the data range.

> [!concept] Core Claim
> Forward-difference interpolation is a refinement-by-correction approach: the polynomial starts with the first data point y₀ as a constant approximation, then adds corrections proportional to first differences (Δy₀), second differences (Δ²y₀), and so on — each additional difference term refines the estimate and captures more curvature of the underlying function.

## Explanation

Think of the forward-difference formula like zooming in on a map: the first term y₀ is a coarse dot on the map (zeroth-order approximation). Adding r·Δy₀ accounts for linear slope (first-order). Adding the next term accounts for curvature (second-order). Each term is a higher-resolution zoom, and the more levels you include, the more accurately the polynomial traces the underlying function between the data points.

The mechanism requires equally spaced data with step size h (xₖ₊₁ − xₖ = h for all k). Build the forward-difference table recursively: the first-order difference is Δyₖ = yₖ₊₁ − yₖ; the second-order is Δ²yₖ = Δyₖ₊₁ − Δyₖ; and Δʲyₖ = Δʲ⁻¹yₖ₊₁ − Δʲ⁻¹yₖ in general. The first row of this table (y₀, Δy₀, Δ²y₀, …, Δⁿy₀) is used in the formula. Set r = (x − x₀)/h — this rescales the target x relative to the step size, making r = 0 at x₀, r = 1 at x₁, r = 2 at x₂, and so on.

The formula is: pₙ(x) = y₀ + r·Δy₀ + [r(r−1)/2!]·Δ²y₀ + [r(r−1)(r−2)/3!]·Δ³y₀ + … The binomial-coefficient-like factors r(r−1)…(r−j+1)/j! are called Newton's forward interpolation coefficients. Each term uses the next diagonal of the difference table. The formula is most accurate for r ∈ [0, 1] — that is, for x between x₀ and x₁ — and accuracy degrades as x moves further from x₀.

## Key Points

- Requires equally-spaced x-values with step h = xₖ₊₁ − xₖ
- Build forward-difference table: Δyₖ = yₖ₊₁ − yₖ; Δ²yₖ = Δyₖ₊₁ − Δyₖ; repeat
- Reference variable: r = (x − x₀) / h
- Formula uses first row: y₀, Δy₀, Δ²y₀, … from the difference table
- Best accuracy for x near the beginning of the table (r ∈ [0, 1])

## Example

Data: x ∈ {1.0, 1.2, 1.4, 1.6, 1.8, 2.0}, h = 0.2. Estimate y(1.1).

Forward-difference table (first row values):
y₀ = 0.5000, Δy₀ = −0.0455, Δ²y₀ = 0.0077, Δ³y₀ = −0.0020, Δ⁴y₀ = 0.0009, Δ⁵y₀ = −0.0007

r = (1.1 − 1.0) / 0.2 = **0.5**

```
p₅(1.1) = 0.5000
         + (0.5)(−0.0455)
         + [(0.5)(−0.5)/2](0.0077)
         + [(0.5)(−0.5)(−1.5)/6](−0.0020)
         + ...
         ≈ 0.5000 − 0.02275 − 0.0009625 − 0.000125 − 0.0000352 − 0.0000191
         ≈ 0.4761
```

True value (1/(1+1.1²) = 1/2.21 ≈ 0.4525 — note: actual function being interpolated is 1/(1+x), giving 1/2.1 ≈ 0.4762 ✓)

> [!recall] Given data (x, y): (0, 1), (1, 8), (2, 27), (3, 64) with h = 1, construct the full forward-difference table. Then use the Newton forward-difference formula to estimate y(0.5). What pattern do you notice in the higher-order differences, and what does it tell you about the degree of the underlying polynomial?

## See Also

- [[interpolation-definition|Interpolation]] — what interpolation is and when to use it
- [[newton-backward-difference-interpolation|Newton Backward-Difference Interpolation]] — used near the end of the table
- [[absolute-and-relative-error|Absolute and Relative Error]] — measuring the interpolation accuracy
