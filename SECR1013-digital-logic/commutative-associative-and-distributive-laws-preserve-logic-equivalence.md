---
title: "Laws of Boolean Algebra"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Laws of Boolean Algebra

The commutative, associative, and distributive laws define how Boolean operands can be freely reordered, regrouped, and factored without changing the function's output.

> [!concept] Core Claim
> These three laws are the structural rules of Boolean algebra — they make expressions malleable so that terms can be rearranged into forms where identities and DeMorgan's theorems can be applied to reduce gate count.

## Explanation

Think of the commutative and associative laws as the permission to rearrange furniture in a room: the room (the function) stays the same, but moving things around can expose hidden simplification opportunities. The distributive law is the permission to factor — like pulling a shared wall bracket out from between two shelves.

The commutative law states that order does not matter: A·B = B·A and A+B = B+A. AND-ing A with B is identical to AND-ing B with A, just as multiplication order is irrelevant in arithmetic. This allows terms to be sorted so that matching groups become adjacent for the next simplification step.

The associative law states that grouping is irrelevant for chains of the same operator: (A+B)+C = A+(B+C). You can insert or remove parentheses freely within a chain of all-ANDs or all-ORs. This matters when flattening nested expressions for manipulation.

The distributive law has two forms. The standard form (AND over OR) matches ordinary algebra: A·(B+C) = A·B + A·C. But Boolean algebra has a dual that has no arithmetic equivalent — OR distributes over AND: A+(B·C) = (A+B)·(A+C). Both directions of the distributive law are used in simplification: one to expand (breaking into sum-of-products form) and the other to factor (reducing gate count).

## Key Points

- **Commutative:** A+B = B+A; A·B = B·A — order is irrelevant
- **Associative:** A+(B+C) = (A+B)+C; A·(B·C) = (A·B)·C — grouping is irrelevant
- **Distributive (AND over OR):** A·(B+C) = A·B + A·C
- **Distributive (OR over AND):** A+(B·C) = (A+B)·(A+C) — no arithmetic equivalent!

## Example

Simplify: F = A·B + A·C

Apply distributive law (factor out A): F = A·(B+C)

This replaces two AND gates + one OR gate with one OR gate + one AND gate. Gate count stays the same here, but the factored form is now compatible with further absorption rules if A reappears elsewhere.

Second example using OR-over-AND distributive law:
F = A + B·C = (A+B)·(A+C) — converts sum-of-products to product-of-sums, useful when targeting NOR-gate implementations.

> [!recall] Simplify F = AB + AC + AD using the distributive law. Then explain what hardware change results and whether the output behavior has changed. Use a truth table row (A=1, B=0, C=1, D=0) to verify.

## See Also

- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — the system these laws operate within
- [[boolean-rules-provide-direct-simplification-shortcuts|Boolean Simplification Rules]] — specific identities that use these laws as their foundation
