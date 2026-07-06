---
title: "Numerical Error Types"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Numerical Error Types

In numerical computation, the gap between a computed answer and the true mathematical answer is called error — it arises from three distinct sources: imprecise input data, truncation of infinite series, and finite-precision floating-point storage.

> [!concept] Core Claim
> Numerical error is not a flaw to be fixed but a property to be managed: mistakes (blunders) can be eliminated, but the three inherent error types cannot — they can only be bounded, traded off against each other, and controlled to stay within acceptable tolerances for the problem at hand.

## Explanation

Think of numerical computation like measuring a room with a tape measure that only reads to the nearest centimetre: the measurement tool (floating-point hardware), the method (whether you measure once or average multiple readings), and the original data (the room itself being irregular) each introduce their own unavoidable imprecision. You cannot eliminate any of the three — you can only choose better tools, better methods, and better data acquisition.

The three error types are mechanistically distinct. Data error enters at the very beginning: any real-world measurement is rounded to finite precision (a temperature sensor reports 23.5°C, not 23.514…°C). This imprecision propagates through every calculation that uses it. Truncation error arises when a mathematical procedure requires infinitely many steps but we stop early: numerical integration methods (trapezoid rule, Simpson's rule) approximate the area under a curve using finitely many rectangles, and the discarded remainder is truncation error. Rounding error comes from the computer's finite representation: numbers like 1/3 have infinite decimal expansions, and storing them in a 64-bit float cuts them off — the cut-off value is not exactly 1/3, and that small difference is rounding error.

The practical consequence is that reducing one error type may increase another. Using more terms in a series (reducing truncation error) means more arithmetic operations, each introducing its own rounding error. This tension — truncation vs. rounding — is a central design problem in numerical methods. A method is called stable if small perturbations in input produce proportionally small perturbations in output; it is convergent if iterating it drives the error toward zero.

## Key Points

- Mistake: human blunder or machine fault; avoidable and correctable
- Data error: input measurements are inherently approximate; propagates through calculations
- Truncation error: using finite terms from an infinite series; the discarded remainder
- Rounding error: finite floating-point representation cuts off infinite decimals
- Stability: small input change → small output change; convergence: iterations approach the true value

## Example

Analytical integral: ∫ 2x³ dx = x⁴/2 + C — exact, no truncation error.

Numerical integral: ∫ 1/(1 + sin²x) dx has no closed form — any numerical method introduces truncation error by using a finite approximation to the exact area.

Rounding: π ≈ 3.1415926… stored as 3.14159 in a 5-decimal approximation. Rounding error = 3.1415926… − 3.14159 = 0.0000026…

Data error: a distance of 12.3456 m measured with a ruler reading to 0.1 m is recorded as 12.3 m. Every calculation using this value carries the error of 0.0456 m.

> [!recall] A numerical method computes an integral in 10 steps (producing truncation error of 0.05) versus 100 steps (truncation error 0.0005 but 10× more rounding from more arithmetic). Explain the tension between truncation and rounding error, and describe what "convergence" means in this context — what happens to the total error as you take more and more steps?

## See Also

- [[absolute-and-relative-error|Absolute and Relative Error]] — quantifying how large the error is
- [[rounding-error-propagation|Rounding Error Propagation]] — how errors accumulate in calculations
- [[convergence-criteria|Convergence Criteria]] — stopping rules that bound the error
