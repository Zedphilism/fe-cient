---
title: "Ones Complement"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Ones Complement

One's complement represents a negative number by inverting every bit of the corresponding positive number — the MSB still signals sign, but the entire bit pattern changes, enabling a simpler addition circuit than sign-magnitude.

> [!concept] Core Claim
> One's complement was designed so that the same addition hardware handles both positive and negative numbers, at the cost of an end-around carry correction step and the persistent problem of two zeros (+0 = 000...0, −0 = 111...1).

## Explanation

Think of one's complement as a mirror: +25 and −25 are exact mirror images of each other's bit pattern (every 0 becomes 1 and vice versa). Any number plus its one's complement gives all-ones (1111...1 = −0), which is the complement property the name refers to. This is more symmetric than sign-magnitude, where the relationship between a number and its negative is only in the sign bit.

The mechanism is bitwise NOT: negate any number by flipping all its bits. Positive numbers still have MSB = 0; negative numbers have MSB = 1 (since the MSB of any positive number is 0, flipping it gives 1). Addition is now almost unified: run both numbers through the same adder. However, if the addition produces a carry out of the MSB, that carry must be added back into the LSB — this is the end-around carry correction. Without it, the result could be −0 when +0 is expected.

The end-around carry complicates hardware compared to two's complement, which requires no correction. The dual-zero problem also persists: 0000 0000 = +0 and 1111 1111 = −0. This is why one's complement was a stepping stone, not a destination. Its legacy lives on in the Internet checksum algorithm, which uses one's complement addition because the end-around carry makes the sum byte-order-independent — an important property for cross-platform network communication.

## Key Points

- Negative = bitwise NOT (invert all bits)
- MSB = 0 → positive; MSB = 1 → negative
- Two zeros still exist: +0 = 000...0, −0 = 111...1
- Range: −(2ⁿ⁻¹ − 1) to +(2ⁿ⁻¹ − 1) (same as sign-magnitude)
- Addition requires end-around carry: add carry-out back to the LSB

## Example

8-bit one's complement:

```
+25 = 0001 1001
−25 = 1110 0110  (every bit flipped)

Verify: 0001 1001 + 1110 0110 = 1111 1111 = −0 ✓
```

End-around carry example (+5 + (−3)):

```
  0000 0101   (+5)
+ 1111 1100   (−3 in one's complement)
-----------
1 0000 0001   carry out!
        +1    end-around carry
-----------
  0000 0010 = +2 ✓
```

> [!recall] Compute +7 + (−4) in 4-bit one's complement. Show the full addition including the end-around carry step. Then explain why two's complement eliminated the need for this step.

## See Also

- [[sign-magnitude-representation-separates-sign-and-value|Sign-Magnitude Representation]] — the predecessor encoding
- [[twos-complement-enables-subtraction-using-addition|Two's Complement]] — adds 1 to one's complement; eliminates double-zero and end-around carry
