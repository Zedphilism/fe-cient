---
title: "Vector Subspace"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Vector Subspace

A subspace W of a vector space V is a non-empty subset that is itself a vector space — and because it inherits its operations from V, only two conditions need checking: closure under addition and closure under scalar multiplication.

> [!concept] Core Claim
> The two-condition subspace test works because a subset that stays inside V under addition and scaling automatically satisfies all ten vector space axioms — it inherits commutativity, associativity, and all the rest from V — so the only thing that can break is "escaping" the subset, which is exactly what the closure conditions check.

## Explanation

Think of a subspace like a swimming lane in a pool: the lane (W) is a smaller region inside the pool (V), and the water behaves the same way everywhere — the same physics, the same rules. If every valid stroke (addition or scaling) keeps you inside your lane, your lane qualifies as its own valid swimming environment. But if one stroke carries you into another lane, the lane is not self-contained and fails to be a subspace.

The mechanism is the inheritance principle: if W ⊆ V uses V's addition and scalar multiplication operations, then all the algebraic properties (commutativity, associativity, distributivity, and so on) hold automatically inside W — they hold in all of V, so they certainly hold in W. The only properties that could fail are the ones that depend on the subset's specific boundaries: closure under addition (adding two elements of W might land outside W) and closure under scalar multiplication (scaling an element of W might exit W). These are the only two checks needed.

Two important consequences follow for free. First, every subspace must contain the zero vector: applying scalar multiplication with c = 0 to any element u ∈ W gives 0·u = 0, which must stay in W by closure. So if a subset does not contain 0, it is immediately not a subspace. Second, every subspace must be closed under negation: c = −1 gives −u ∈ W for any u ∈ W. A line or plane through the origin passes both checks; a line or plane not through the origin fails immediately (0 is not in it).

## Key Points

- Two conditions: closed under addition (u + v ∈ W) and closed under scalar multiplication (cu ∈ W)
- Both must hold; failing either disqualifies the subset
- Zero vector must be in any subspace (follows from scaling by 0)
- Lines and planes are subspaces only if they pass through the origin
- Span of any set of vectors is always a subspace

## Example

V = R², W = {(a, 0) : a ∈ R} (the x-axis):

Closure under addition: (a, 0) + (b, 0) = (a+b, 0) ∈ W ✓
Closure under scalar multiplication: c(a, 0) = (ca, 0) ∈ W ✓
→ W is a subspace of R².

Non-example: W = {(a, b, 1) : a, b ∈ R} ⊆ R³.

Zero vector test: (0, 0, 0) ∉ W (third component is 1, not 0). Fail immediately — not a subspace.
Or: (a₁, b₁, 1) + (a₂, b₂, 1) = (a₁+a₂, b₁+b₂, 2) ∉ W — closure under addition fails.

> [!recall] Let W = {(a, b, c) ∈ R³ : a + b + c = 0}. (a) Show W is a subspace by verifying the two conditions. (b) Geometrically, what shape is W? Does it pass through the origin? (c) Now let W′ = {(a, b, c) : a + b + c = 1}. Without doing arithmetic, explain immediately why W′ cannot be a subspace.

## See Also

- [[vector-space-axioms|Vector Space Axioms]] — the full set W ultimately must satisfy
- [[linear-independence-and-dependence|Linear Independence and Dependence]] — basis and dimension concepts build on subspaces
- [[linear-combination-of-vectors|Linear Combination of Vectors]] — the span of any set of vectors is always a subspace
