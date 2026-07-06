---
title: "Sign-Magnitude Representation"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Sign-Magnitude Representation

Sign-magnitude encoding reserves the most significant bit as a sign flag (0 = positive, 1 = negative) and uses all remaining bits for the absolute value, mirroring how humans write signed numbers.

> [!concept] Core Claim
> Sign-magnitude is the most intuitive signed encoding but the least practical for hardware: it requires separate add/subtract logic for mixed-sign arithmetic and wastes one code point on a second representation of zero (−0), problems that two's complement was designed to eliminate.

## Explanation

Think of sign-magnitude like a taxi meter with a direction sign: the meter shows the absolute distance traveled, and a separate flag says "outbound" (positive) or "inbound" (negative). Changing direction means flipping only the flag while the meter reading stays the same.

The mechanism uses the MSB as a separate sign indicator: 0 in the MSB means the remaining bits form a positive number; 1 in the MSB means they form a negative number of the same magnitude. To negate a number, flip only the MSB — all other bits stay identical. This makes encoding intuitive: +25 and −25 differ only in their MSB.

The hardware problem is that a mixed-sign addition (e.g., +5 + (−3)) cannot use a single addition circuit. The hardware must first inspect both sign bits, then decide whether to add or subtract the magnitudes, then determine the sign of the result — three decision steps for one operation. This multiplies circuit complexity compared to two's complement, where any addition (signed or unsigned) uses the same circuit.

The second problem is the dual zero: 0000 0000 and 1000 0000 both represent zero (+0 and −0). This wastes a code point and requires equality checks to handle both patterns. Sign-magnitude is used in the mantissa field of IEEE 754 floating-point, where the sign bit separation is convenient, but it is not used for integer arithmetic in any modern processor.

## Key Points

- MSB = 0 → positive; MSB = 1 → negative
- Remaining n−1 bits = absolute value (magnitude)
- Two zeros: +0 (000...0) and −0 (100...0) — wastes one code point
- Range: −(2ⁿ⁻¹ − 1) to +(2ⁿ⁻¹ − 1) for n bits
- Requires separate add/subtract logic for signed arithmetic

## Example

8-bit sign-magnitude:

| Value | Binary    | How read                |
|-------|-----------|-------------------------|
| +25   | 0001 1001 | MSB=0 (pos), 25 = 25    |
| −25   | 1001 1001 | MSB=1 (neg), 25 = −25   |
| +0    | 0000 0000 | MSB=0, magnitude 0      |
| −0    | 1000 0000 | MSB=1, magnitude 0 (!)  |

+25 and −25 are identical except for the MSB — intuitive to humans, problematic for hardware.

> [!recall] A hardware designer proposes using sign-magnitude for an 8-bit ALU. A student claims two's complement requires no additional hardware for subtraction while sign-magnitude does. Explain the exact hardware steps needed to compute +5 + (−3) in sign-magnitude, then contrast with how two's complement handles the same computation.

## See Also

- [[unsigned-binary-integers-represent-only-non-negative-values|Unsigned Binary Integers]] — no sign bit at all; only non-negative values
- [[ones-complement-inverts-bits-to-represent-negative-values|Ones Complement]] — next evolution: negate by inverting all bits
- [[twos-complement-enables-subtraction-using-addition|Two's Complement]] — the standard that solved sign-magnitude's hardware problems
