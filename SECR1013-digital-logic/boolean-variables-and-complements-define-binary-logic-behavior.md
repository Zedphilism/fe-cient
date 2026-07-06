---
title: "Boolean Variables and Complements"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Boolean Variables and Complements

In Boolean algebra, a variable represents a binary logic signal that holds exactly one of two values (0 or 1), and appears in expressions either in its true form (A) or its complement form (A') — the same variable can contribute two different logical conditions to the same expression.

> [!concept] Core Claim
> A Boolean literal is a variable (A) or its complement (A'); because A and A' are always opposite, every identity involving both — such as A + A' = 1 — is provably true for all input values, enabling powerful simplification shortcuts.

## Explanation

Think of a Boolean variable like a named light switch: A = 1 means the switch is ON, A = 0 means the switch is OFF. The complement A' flips that reading — when A = 1, A' = 0, and vice versa. Both A and A' refer to the same physical switch, but they describe it from opposite perspectives.

The mechanism of complementation is simply the NOT operation: A' is the output of a NOT gate whose input is A. Double complementation cancels because applying NOT twice returns to the original: (A')' = A. This is not an arbitrary rule but a physical fact — flipping a switch twice leaves it in its original state.

The consequence is that certain combinations of a variable and its complement are always resolved, regardless of what value the variable actually holds. A + A' = 1 is true whether A is 0 or 1, because one of them must be 1. Similarly, A · A' = 0 is always true because they can never both be 1 at the same moment. These identities are the engine of the most powerful simplification steps in Boolean algebra — they collapse entire sub-expressions to constants.

## Key Points

- Variable: binary (0 or 1), represents one logic signal
- Literal: a variable in true form (A) or complement form (A')
- (A')' = A — double negation cancels
- A + A' = 1 — complement OR identity (always true)
- A · A' = 0 — complement AND identity (always false)

## Example

Given F = A + B':

If A=1, B=1: B'=0, F = 1+0 = 1
If A=0, B=0: B'=1, F = 0+1 = 1
If A=0, B=1: B'=0, F = 0+0 = 0

Simplification using complement identity:
G = AB' + AB = A(B'+B) = A·1 = A — the whole B term vanishes because B+B' = 1.

> [!recall] Simplify F = A'B'C + A'BC + AB'C + ABC by grouping complement pairs. What does the simplified result reveal about which variables actually matter to the output?

## See Also

- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]] — the system these variables operate within
- [[boolean-rules-provide-direct-simplification-shortcuts|Boolean Simplification Rules]] — identities built from variable + complement relationships
