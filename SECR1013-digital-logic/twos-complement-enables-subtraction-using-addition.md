---
title: "Two's Complement"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Two's Complement

Two's complement is the universal signed integer encoding in digital hardware because it lets the same addition circuit perform both addition and subtraction, with no correction step and only one representation of zero.

> [!concept] Core Claim
> Two's complement is one's complement plus 1: this single extra step eliminates the dual-zero problem and the end-around carry, so an ALU needs only one addition circuit to handle all signed arithmetic — subtraction becomes "add the two's complement" and the carry-out is simply discarded.

## Explanation

Think of two's complement like a clock face with numbers 0–15 on a 4-bit wheel: going "backwards" by 1 from 0 wraps to 15, which represents −1 in two's complement. The key insight is that adding any number to its two's complement always produces a result of all-zeros (plus a carry that gets discarded), exactly as adding 3 hours + 9 hours on a 12-hour clock produces 12, which resets to 0.

The mechanism: to negate a number, invert all bits (one's complement) then add 1. The +1 step bumps the all-ones pattern (−0) up to all-zeros (+0), giving a single zero representation. It also means the carry correction step disappears from addition — any carry out of the MSB is just discarded, not wrapped around. The same adder circuit works for all signed computations without special cases.

The asymmetric range is a defining consequence: for n bits, two's complement covers −2ⁿ⁻¹ to +(2ⁿ⁻¹ − 1). There is one more negative value than positive value — 8-bit covers −128 to +127. The most negative number (−128 in 8-bit, 1000 0000) has no positive counterpart: attempting to negate −128 overflows back to −128. The MSB remains the sign indicator: 0 = positive, 1 = negative. To decode a negative two's complement number back to its magnitude, apply the same process: invert all bits, add 1.

## Key Points

- Negative = bitwise NOT + 1 (invert all bits, then add 1)
- Single zero representation (0000...0 — no −0)
- Range for n bits: −2ⁿ⁻¹ to +(2ⁿ⁻¹ − 1)
- Subtraction: A − B = A + (two's complement of B); discard carry-out
- MSB = sign bit: 0 = non-negative, 1 = negative
- Every modern CPU uses two's complement internally

## Example

Compute 7 − 3 in 4-bit two's complement:

```
7  = 0111
3  = 0011
−3 = invert → 1100 → + 1 → 1101

  0111
+ 1101
------
1 0100   ← discard the carry-out
= 0100 = 4 ✓
```

Identifying negative numbers: 1011 in 4-bit two's complement:
MSB = 1 → negative. Negate: invert → 0100, add 1 → 0101 = 5. So 1011 = −5.

> [!recall] An 8-bit two's complement system computes −128 + (−1). Show the binary addition, identify whether overflow occurred using the carry-into-MSB vs carry-out-of-MSB rule, and explain what the hardware stores vs what the correct result should be.

## See Also

- [[ones-complement-inverts-bits-to-represent-negative-values|Ones Complement]] — the step before: same process without the +1
- [[binary-overflow-occurs-when-results-exceed-bit-capacity|Binary Overflow]] — when results exceed the two's complement range
- [[sign-magnitude-representation-separates-sign-and-value|Sign-Magnitude Representation]] — the conceptually simpler but hardware-expensive alternative
