---
title: "Binary Overflow"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic, supplemental, thomas-floyd]
---

# Binary Overflow

Overflow occurs when an arithmetic operation produces a result that falls outside the range representable by the fixed bit width, causing the stored value to be silently wrong.

> [!concept] Core Claim
> Overflow is a silent failure: the hardware stores a mathematically incorrect result without raising an exception unless the program explicitly checks the CPU's overflow or carry flag — making it one of the most dangerous bugs in low-level and security-critical code.

## Explanation

Think of overflow like addition on an analog speedometer that only goes to 999 km/h: if the vehicle somehow hits 1000 km/h, the needle wraps back to 0 — but the driver's display shows zero, not a warning. The hardware has no way to flag the problem unless the instrument is specifically designed to detect wrap-around.

For unsigned arithmetic, overflow is indicated by a carry out of the MSB. Adding two large unsigned numbers produces a carry out when the true result exceeds 2ⁿ − 1, and the stored value is the true result modulo 2ⁿ. Example: 255 + 1 in 8-bit unsigned wraps to 0. The CPU's Carry flag is set, but the result register shows 0 with no error.

For signed two's complement, overflow has a different rule: overflow occurs if and only if both operands have the same sign and the result has the opposite sign. The hardware detects this by comparing the carry into the MSB with the carry out of the MSB — if these two carries differ, signed overflow has occurred. The CPU's Overflow (V or O) flag is set. Two examples: +127 + 1 = −128 (two positives give a negative — overflow); −128 + (−1) = +127 (two negatives give a positive — overflow).

The consequence is that overflow is a programmer's responsibility to check. Division, multiplication, and all arithmetic must be explicitly guarded in safety-critical systems. Buffer overflow attacks often exploit unsigned wrap-around in length calculations.

## Key Points

- Unsigned overflow: carry out of MSB; result wraps modulo 2ⁿ; Carry flag set
- Signed overflow: two same-sign operands produce opposite-sign result; Overflow flag set
- Detection rule: carry-into-MSB ≠ carry-out-of-MSB → overflow
- No exception is raised automatically — programmer must check the CPU flag

## Example

8-bit signed two's complement overflow:

```
127 + 1:
  0111 1111  (+127)
+ 0000 0001  (+1)
-----------
  1000 0000  = −128 ← WRONG: two positives give a negative → overflow!

−128 + (−1):
  1000 0000  (−128)
+ 1111 1111  (−1)
-----------
1 0111 1111  → discard carry → +127 ← WRONG: two negatives give a positive → overflow!
```

> [!recall] Compute 100 + 100 in 8-bit signed two's complement. Show the full binary addition, apply the carry-into-MSB vs carry-out-of-MSB rule to determine whether overflow occurred, and state what value the hardware stores and why it is wrong.

## See Also

- [[twos-complement-enables-subtraction-using-addition|Two's Complement]] — the signed context in which overflow detection applies
- [[unsigned-binary-integers-represent-only-non-negative-values|Unsigned Binary Integers]] — simpler overflow model: carry-out only
