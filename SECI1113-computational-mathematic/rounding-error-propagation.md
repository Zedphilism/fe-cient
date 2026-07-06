---
title: "Rounding Error Propagation"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Rounding Error Propagation

When approximate numbers are added or subtracted, their errors combine: the modulus error of the result is at most the sum of the individual modulus errors — so every term in a long calculation contributes to the final uncertainty.

> [!concept] Core Claim
> Rounding errors propagate additively through arithmetic: each input value carries its own uncertainty bound, and the worst-case error in any sum or difference cannot exceed the sum of all individual bounds — which means long calculations accumulate error, and the final result's precision is limited by its least precise input.

## Explanation

Think of rounding error propagation like carrying water in multiple leaky buckets: each bucket (approximated number) loses a small but known maximum amount of water (its rounding error). If you pour all the buckets into one basin (addition), the maximum water lost is the sum of all the individual leaks — you can bound the total loss even though you don't know exactly where each leak went.

The mechanism is algebraic. Let N₁ and N₂ be exact values with approximations n₁ = N₁ − e₁ and n₂ = N₂ − e₂. For addition: the computed result is n₁ + n₂ = (N₁ − e₁) + (N₂ − e₂) = (N₁ + N₂) − (e₁ + e₂). The exact answer is N₁ + N₂, so the error in the sum is e₁ + e₂. Taking absolute values and applying the triangle inequality gives |e_sum| ≤ |e₁| + |e₂|. The same bound holds for subtraction. This bound is conservative but exact as a worst case.

The practical consequence is that the answer should only claim precision to the decimal place that both (computed sum) and (computed sum ± total error bound) agree on. Performing arithmetic on 4-decimal-place numbers and reporting the result to 4 decimal places is often unjustified — the accumulated error may have corrupted the last digit or two. Rounding the final answer to reflect the actual precision (where the error bound becomes significant) is the honest reporting of results.

## Key Points

- |e_result| ≤ |e₁| + |e₂| for any sum or difference (triangle inequality)
- More terms → more accumulated error
- Max rounding error per term rounded to n decimal places: 0.5 × 10⁻ⁿ
- Final answer should be rounded to the decimal place where the error bound becomes significant
- This is a worst-case bound; actual error may be smaller

## Example

Compute 3.69 + 5.432 − 2.37 − 3.5214.

Step 1 — arithmetic result: 3.69 + 5.432 − 2.37 − 3.5214 = 3.2306.

Step 2 — error bounds per term:
- 3.69 (2 d.p.): |e₁| ≤ 0.005
- 5.432 (3 d.p.): |e₂| ≤ 0.0005
- 2.37 (2 d.p.): |e₃| ≤ 0.005
- 3.5214 (4 d.p.): |e₄| ≤ 0.00005

Total bound: |e| ≤ 0.005 + 0.0005 + 0.005 + 0.00005 = **0.01055**

Step 3 — result range: 3.2306 ± 0.01055 → between 3.22005 and 3.24115.

Both bounds agree to 1 decimal place (both round to 3.2) but disagree at 2 decimal places (3.22 vs 3.24). Best honest answer: **3.2** (1 decimal place).

> [!recall] You compute the sum 12.3 + 0.456 − 7.89. (a) Compute the arithmetic result. (b) State the error bound for each term. (c) Compute the total error bound. (d) Determine to how many decimal places your result is trustworthy. (e) Why does including the high-precision term 0.456 not make the final answer more precise than 12.3 alone would allow?

## See Also

- [[absolute-and-relative-error|Absolute and Relative Error]] — measuring individual errors before propagation
- [[numerical-error-types|Numerical Error Types]] — sources of error including rounding
- [[convergence-criteria|Convergence Criteria]] — stopping rules that bound accumulated iteration error
