---
title: "Vector Space Axioms"
date: 2026-04-18
tags: [semester-3, seci1113, discrete-math]
---

# Vector Space Axioms

A vector space is any set V with addition and scalar multiplication operations that jointly satisfy ten axioms — Rⁿ is the standard example, but matrices, polynomials, and functions can all be vector spaces if their operations obey the same rules.

> [!concept] Core Claim
> The ten axioms are not arbitrary rules but a minimal contract: they guarantee that addition and scaling behave "reasonably" — predictably, reversibly, and without surprises — which is exactly what is needed for linear algebra tools (combinations, independence, spans) to work correctly on any set, not just Rⁿ.

## Explanation

Think of the ten axioms as a checklist for a well-behaved arithmetic: commutativity means order does not matter for addition; associativity means grouping does not matter; the identity and inverse axioms guarantee that every move can be undone; the scalar axioms guarantee that scaling is compatible with addition. Any set that passes all ten checks earns the title "vector space" and immediately becomes compatible with all of linear algebra — independence, span, basis, and subspace all apply.

The two most important axioms to check first are the closure axioms (axioms 1 and 6): closure under addition means that adding any two elements of V produces another element of V (you cannot "escape" the set by adding), and closure under scalar multiplication means that scaling any element by any real number stays inside V. These are the axioms most commonly violated by non-standard sets, so checking them first saves work.

When proving a set is not a vector space, you only need to find one axiom that fails and provide a specific counterexample. When proving it is a vector space, all ten must be verified. In practice, if a set is a subset of a known vector space and uses the same operations, it inherits axioms 2–5 and 7–10 automatically — only closure needs new verification. This is the shortcut used when checking subspaces.

## Key Points

- Ten axioms: 2 closure, 4 addition, 4 scalar multiplication
- Must satisfy ALL ten — one failure disqualifies the set
- Closure axioms (1 and 6) are checked first; most commonly violated
- Standard examples: Rⁿ, space of all m × n matrices Mₘₓₙ
- To disprove: find one counterexample; to prove: verify all ten

## Example

Rⁿ with standard component-wise addition and scalar multiplication satisfies all ten — this is why Rⁿ is the canonical vector space.

Non-example: V = R with a ⊕ b := 2a + 2b (modified addition) and k ⊙ a := ka (normal scaling).

Check axiom 3 (associativity): (a ⊕ b) ⊕ c = 2(2a+2b) + 2c = 4a + 4b + 2c. Compare a ⊕ (b ⊕ c) = 2a + 2(2b+2c) = 2a + 4b + 4c. These are not equal in general (e.g., a=1, b=0, c=0: left = 4, right = 2). **Axiom 3 fails** → not a vector space.

Check axiom 1 (closure under addition): does a ⊕ b = 2a+2b ∈ R? Yes — but closure alone is not enough; all ten must hold.

> [!recall] Let V be the set of all 2×2 matrices with the operation A ⊕ B := AB (matrix multiplication as "addition") and k ⊙ A := kA (normal scalar multiplication). Without doing all ten, identify which axiom fails first and provide a counterexample. Then explain why Rⁿ with its standard operations satisfies all ten.

## See Also

- [[vector-arithmetic|Vector Arithmetic]] — the concrete example of all properties in Rⁿ
- [[vector-subspace|Vector Subspace]] — a subset that is itself a vector space
- [[linear-independence-and-dependence|Linear Independence and Dependence]] — key concept enabled by the vector space structure
