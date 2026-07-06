---
title: "Convergence Criteria"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Convergence Criteria

A convergence criterion is a stopping rule for iterative numerical methods — it specifies when an approximation is "good enough" by testing whether the function value or the change between consecutive iterates falls below a tolerance ε.

> [!concept] Core Claim
> Convergence criteria are the exit conditions for iterative loops: without them, a method runs forever; with them, you trade a controllable residual error for a finite computation — the choice of ε directly determines both the accuracy of the answer and the number of iterations required.

## Explanation

Think of convergence criteria like a sharpshooter's target: you keep firing (iterating) until your grouping is tight enough that the next shot will almost certainly land in the same zone. The tolerance ε is the size of the acceptable zone — wider zones mean stopping sooner with less precision, tighter zones mean more iterations with more precision. The criterion tells you objectively when to stop instead of guessing.

Two standard stopping conditions exist, and they are not equivalent. The function-value criterion |f(xₖ)| < ε checks whether the current iterate nearly satisfies the equation — it stops when f is close to zero. The successive-difference criterion |xₖ − xₖ₊₁| < ε checks whether the iterate has stopped changing — it stops when consecutive approximations are nearly the same. The function-value criterion directly measures residual error; the successive-difference criterion measures convergence rate. For well-behaved functions they agree, but near a root where f is very flat (f′ ≈ 0), the function can be nearly zero even while the iterates are still widely spaced.

For bisection specifically, the number of iterations needed can be computed before starting: (b − a) / 2ⁿ ≤ ε implies n ≥ log₂((b − a)/ε). This formula is powerful because bisection is guaranteed to converge — you can plan the computation cost in advance. For Newton's method and the secant method, no such guarantee exists with arbitrary starting points, and the successive-difference criterion also serves as a divergence detector: if |xₖ₊₁ − xₖ| is growing rather than shrinking, the method is diverging and should be restarted with a different initial guess.

## Key Points

- Criterion 1 (function value): |f(xₖ)| < ε — iterate nearly satisfies the equation
- Criterion 2 (successive difference): |xₖ − xₖ₊₁| < ε — consecutive iterates nearly match
- Bisection iteration count: n ≥ log₂((b − a) / ε)
- ε for d decimal places of accuracy: ε = 0.5 × 10⁻ᵈ
- Growing |xₖ₊₁ − xₖ| signals divergence — restart with a new initial guess

## Example

Bisection on [0, 1] to 2 decimal places: ε = 0.5 × 10⁻² = 0.005.

Iterations needed: 2ⁿ ≥ (1 − 0)/0.005 = 200 → n ≥ log₂(200) ≈ 7.64 → **at least 8 iterations**.

This means after 8 bisections, the interval is (1−0)/2⁸ = 1/256 ≈ 0.0039 < 0.005 — within tolerance.

For bisection on [1, 2] to 4 decimal places: ε = 0.00005. Iterations: n ≥ log₂((2−1)/0.00005) = log₂(20000) ≈ 14.3 → **at least 15 iterations**.

For Newton's method on f(x) = x³ − 2x − 5 starting at x₀ = 2 with ε = 0.0005: monitor |xₖ₊₁ − xₖ|. If it increases over any iteration, the method is diverging — the starting point is likely in a region of poor behaviour (flat derivative, inflection, etc.).

> [!recall] The bisection method is applied to f(x) on the interval [2, 5]. You need the root accurate to 3 decimal places (ε = 0.0005). (a) Calculate the minimum number of iterations required using the formula. (b) After 12 iterations, the interval is [2.4999, 2.5003]. Does this meet the criterion? (c) Explain why bisection's iteration count can be predicted in advance but Newton's method's cannot.

## See Also

- [[bisection-method|Bisection Method]] — guaranteed convergence; uses the iteration-count formula
- [[newton-raphson-method|Newton-Raphson Method]] — fast convergence but no guarantee with arbitrary start
- [[secant-method|Secant Method]] — no bracket required; uses successive-difference criterion
