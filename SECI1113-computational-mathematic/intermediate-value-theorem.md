---
title: "Intermediate Value Theorem"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Intermediate Value Theorem

The Intermediate Value Theorem (IVT) guarantees that if f is continuous on [a, b] and f(a) and f(b) have opposite signs, then at least one root exists in (a, b) — this sign-change condition is the prerequisite check before applying any bracketing root-finding method.

> [!concept] Core Claim
> The IVT is a continuity consequence: a continuous function cannot jump from one side of zero to the other without crossing it — if f(a) is negative and f(b) is positive, the graph must cross the x-axis somewhere in between, and that crossing point is the root the theorem guarantees.

## Explanation

Think of the IVT like a hiking trail crossing from one altitude to another: if you start above sea level and end below sea level, you must have crossed sea level at least once — no teleporting, no gaps. A continuous function is like the trail's elevation: it cannot jump discontinuously. If f(a) > 0 (above the x-axis) and f(b) < 0 (below the x-axis), the trail must cross the x-axis at some point c ∈ (a, b). That crossing is the root.

The mechanism is the sign-change test: compute the product f(a) · f(b). If this product is negative (one factor positive, one negative), the signs differ and IVT guarantees at least one root in (a, b). The formal condition f(a) · f(b) < 0 is compact and easy to compute. If the product is positive (both signs the same), IVT gives no conclusion — there may still be roots, or there may be none; IVT simply cannot tell you. If the product is zero, one endpoint is itself a root — you are already done.

The critical word in the theorem is "existence": IVT guarantees only that a root exists, not how many or where exactly. It provides the justification for starting bisection (which needs a bracket containing a root) but does not locate the root itself. Continuity is non-negotiable — for a discontinuous function, the sign-change test means nothing: f could jump from positive to negative across a discontinuity with no crossing.

## Key Points

- f must be continuous on [a, b] — non-negotiable
- f(a) · f(b) < 0 → at least one root in (a, b) — IVT applies
- f(a) · f(b) > 0 → IVT gives no conclusion (roots may or may not exist)
- f(a) · f(b) = 0 → an endpoint is already a root
- IVT guarantees existence only — a numerical method is needed to locate the root

## Example

For f(x) = x² + 2x − 1:

Interval [−1, 0]: f(−1) = 1 − 2 − 1 = −2 < 0; f(0) = 0 + 0 − 1 = −1 < 0.
Product: (−2)(−1) = 2 > 0 → **no IVT guarantee** (same sign, both negative).

Interval [0, 1]: f(0) = −1 < 0; f(1) = 1 + 2 − 1 = 2 > 0.
Product: (−1)(2) = −2 < 0 → **at least one root exists in (0, 1)** ✓.

Interval [1, 2]: f(1) = 2 > 0; f(2) = 4 + 4 − 1 = 7 > 0.
Product: (2)(7) = 14 > 0 → **no IVT guarantee**.

Note: the fact that [−1, 0] showed no guarantee does not mean there are no roots there — IVT absence of guarantee ≠ absence of root.

> [!recall] For f(x) = x³ − x − 1, check the intervals [−1, 0], [0, 1], and [1, 2] using the IVT sign-change test. For each interval that passes, explain what the theorem guarantees and what it does not guarantee. Can you determine the number of roots from IVT alone?

## See Also

- [[bisection-method|Bisection Method]] — requires IVT to be satisfied before starting
- [[convergence-criteria|Convergence Criteria]] — stopping rule for bisection after IVT bracket is found
- [[numerical-error-types|Numerical Error Types]] — error in the located root value
