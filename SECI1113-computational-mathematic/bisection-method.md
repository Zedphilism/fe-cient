---
title: "Bisection Method"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Bisection Method

The bisection method finds a root of f(x) = 0 by repeatedly halving an interval [a, b] that brackets a root — each step discards the half that cannot contain the root, and after n steps the root is pinned to within (b − a)/2ⁿ.

> [!concept] Core Claim
> Bisection is the most robust root-finding method because it is guaranteed to converge from any valid bracket — it trades speed for certainty, halving the uncertainty at every step at a fixed rate, making it the default choice whenever the function is continuous and a sign-change bracket can be found.

## Explanation

Think of bisection like a binary search: you know the answer is somewhere in a range, and you always cut the range in half by checking the midpoint. Each check eliminates exactly half the possibilities. After 10 bisections, the range is 1/1024 of the original; after 20, it is 1/1,048,576. The method is slow compared to Newton's but cannot fail once a valid bracket is found.

The algorithm requires the IVT to hold first: verify f(a) · f(b) < 0. Then compute the midpoint c = (a + b)/2 and evaluate f(c). Three cases: if f(c) = 0, c is the root (stop). If f(a) · f(c) < 0, the root is in [a, c] — discard the right half (set b = c). If f(b) · f(c) < 0, the root is in [c, b] — discard the left half (set a = c). Repeat until the interval is small enough or f(c) is small enough.

The iteration count can be computed before starting, which is unique to bisection: to achieve accuracy ε, solve (b − a) / 2ⁿ ≤ ε for n, giving n ≥ log₂((b − a)/ε). This allows planning — you know exactly how many iterations are needed before running a single one. The method cannot find tangential roots (where f touches zero without changing sign), and it is slower than Newton's method (quadratic convergence) or the secant method (superlinear convergence), which both use local function behaviour to converge faster at the cost of requiring more conditions.

## Key Points

- Prerequisite: f(a) · f(b) < 0 (IVT sign-change bracket)
- Midpoint: c = (a + b)/2; assign c to whichever endpoint has the same sign as f(c)
- Error after n steps: (b − a)/2ⁿ
- Required iterations for accuracy ε: n ≥ log₂((b − a)/ε)
- Always converges from a valid bracket; cannot handle tangential roots

## Example

Find root of f(x) = x³ − 3x² + 8x − 5 in [0, 1] to 2 decimal places (ε = 0.005).

IVT check: f(0) = −5 < 0, f(1) = 1 − 3 + 8 − 5 = 1 > 0. Product = −5 < 0 ✓.

Minimum iterations: 2ⁿ ≥ (1 − 0)/0.005 = 200 → n ≥ log₂(200) ≈ 7.64 → **8 iterations minimum**.

Iteration 1: c = 0.5. f(0.5) = 0.125 − 0.75 + 4 − 5 = −1.625 < 0. f(0) and f(c) same sign → root in [**0.5, 1**].

Iteration 2: c = 0.75. f(0.75) < 0 (evaluate) → root in [**0.75, 1**].

Continue halving. After 8 iterations, the interval width is ≤ 0.0039 < 0.005 — root located to required accuracy.

> [!recall] Apply bisection to f(x) = x² − 3 on [1, 2]. (a) Verify the IVT condition. (b) Compute the minimum number of iterations needed for accuracy to 3 decimal places. (c) Carry out 4 iterations by hand, showing a, b, c, and f(c) at each step. (d) What is the error bound after your 4th iteration?

## See Also

- [[intermediate-value-theorem|Intermediate Value Theorem]] — prerequisite that must hold before starting
- [[convergence-criteria|Convergence Criteria]] — stopping conditions including the iteration-count formula
- [[newton-raphson-method|Newton-Raphson Method]] — faster convergence when the derivative is available
- [[secant-method|Secant Method]] — faster alternative that does not require a sign-change bracket
