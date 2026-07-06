---
title: "Secant Method"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Secant Method

The secant method finds roots of f(x) = 0 by drawing a straight line through two recent function evaluations and finding where that line crosses the x-axis — it approximates Newton's method without needing the derivative f′(x), but it can diverge with poor initial guesses.

> [!concept] Core Claim
> The secant method is derivative-free Newton's method: instead of using the exact slope f′(xₙ) (which requires an analytical formula), it estimates the slope from the last two iterates as a finite difference — the approximation is slightly less accurate per step but eliminates the need to compute or know f′ analytically.

## Explanation

Think of the secant method like a navigator using dead reckoning without a compass: instead of knowing the exact heading (the derivative), you estimate direction from your last two known positions and project forward. Two points determine a line; that line points toward an estimated crossing with the x-axis; you move there and repeat. The estimate gets better as the points get closer to the root.

The iteration formula is derived by finding where the secant line through (xₙ₋₁, f(xₙ₋₁)) and (xₙ, f(xₙ)) crosses the x-axis. The slope of this line is [f(xₙ) − f(xₙ₋₁)] / (xₙ − xₙ₋₁). Setting y = 0 in the point-slope equation gives:

xₙ₊₁ = xₙ − f(xₙ) · (xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))

The algorithm requires two initial guesses x₀ and x₁ — neither requires a sign-change condition (unlike bisection) and neither requires knowing the derivative (unlike Newton's). Each iteration discards the oldest point and uses the two most recent. The stopping criterion is |xₙ₊₁ − xₙ| < ε.

The trade-offs are clear: the secant method converges faster than bisection (roughly order 1.618 — the golden ratio) but slower than Newton's (order 2). It may diverge if initial guesses are poorly chosen, and swapping x₀ and x₁ sometimes rescues a diverging sequence by changing which secant line geometry develops. Unlike Newton's, it cannot fail from a zero derivative — the formula would only fail if f(xₙ) = f(xₙ₋₁), causing division by zero in the denominator.

## Key Points

- Formula: xₙ₊₁ = xₙ − f(xₙ) · (xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))
- Two initial guesses required; no sign-change condition needed
- Approximates f′ as a finite difference of recent function values
- Faster than bisection but slower than Newton's method
- Can diverge; swapping initial guesses may help; stop when |xₙ₊₁ − xₙ| < ε

## Example

Solve f(x) = eˣ − x², x₀ = −1, x₁ = 0, ε = 0.0005. (Root ≈ −0.7035.)

f(−1) = e⁻¹ − 1 ≈ 0.368 − 1 = −0.632; f(0) = e⁰ − 0 = 1.

Iteration 1:
x₂ = 0 − (1) · (0 − (−1)) / (1 − (−0.632)) = 0 − 1/1.632 ≈ **−0.613**

Iteration 2:
f(−0.613) ≈ e^{−0.613} − 0.613² ≈ 0.542 − 0.376 = 0.166
x₃ = −0.613 − 0.166·(−0.613 − 0)/(0.166 − 1) = −0.613 − 0.166·(−0.613)/(−0.834) ≈ **−0.735**

Continue until |xₙ₊₁ − xₙ| < 0.0005.

> [!recall] Apply 2 iterations of the secant method to f(x) = x³ − 2, using x₀ = 1 and x₁ = 2. Show the formula application at each step. Compare your iterate x₂ with the result Newton's method would give starting from x₁ = 2. Explain in terms of the derivative approximation why the secant and Newton results differ.

## See Also

- [[newton-raphson-method|Newton-Raphson Method]] — requires f′ but converges faster (quadratic vs. ~1.618)
- [[bisection-method|Bisection Method]] — slower but guaranteed to converge from a valid bracket
- [[convergence-criteria|Convergence Criteria]] — stopping rules applied to both methods
- [[intermediate-value-theorem|Intermediate Value Theorem]] — not required for secant; useful context for initial guess selection
