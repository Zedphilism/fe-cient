---
title: "Unsigned Binary Integers"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Unsigned Binary Integers

Unsigned binary integers use every bit for magnitude only — there is no sign bit — giving a range of 0 to 2ⁿ − 1 for an n-bit number.

> [!concept] Core Claim
> In unsigned representation, every possible n-bit pattern is a valid non-negative number; this maximises the usable range but makes the format unsuitable for any quantity that can go negative — subtracting a larger value from a smaller one wraps around silently to a large positive number.

## Explanation

Think of unsigned binary like the mileage counter on a car: it only counts forward from 0, every digit counts toward the total, and if you somehow go past the maximum reading it wraps back to 0 (odometer rollover) — no negative mileage exists.

The mechanism is straightforward: every bit contributes its positional weight (2^position) to a running sum. All n bits are used for magnitude. An 8-bit unsigned integer spans 0–255, a 16-bit spans 0–65535. The minimum value is always 0 (all bits off) and the maximum is always 2ⁿ − 1 (all bits on).

The practical consequence is that wrap-around replaces negative results. When 5 − 8 is computed in 4-bit unsigned arithmetic, the true answer (−3) cannot be represented, so the hardware produces 5 + (16 − 8) = 13, wrapping modulo 2⁴ = 16. This is not an error signal — the hardware produces 1101 = 13 silently, with no warning unless the programmer explicitly checks the carry flag. This silent wrap-around is one of the most common bugs in embedded programming and security-critical code where buffer sizes are compared with unsigned arithmetic.

Unsigned representation is the right choice for quantities that are inherently non-negative: memory addresses, pixel color values, packet counts, array indices, port numbers.

## Key Points

- All n bits represent magnitude; no sign bit
- Range: 0 to 2ⁿ − 1
- Wrap-around: result wraps modulo 2ⁿ if the true result would be negative or exceed max
- Hardware indicates this with the Carry flag, not an exception
- Used for: addresses, counts, sizes, indices, port numbers

## Example

8-bit unsigned range:
- Minimum: 0000 0000 = 0
- Maximum: 1111 1111 = 255 = 2⁸ − 1

Wrap-around example (4-bit):

```
3 − 5 = ?
0011 − 0101 → borrows → 1110 = 14 (decimal)
True answer: −2 — but 14 is what the hardware stores.
14 = 16 − 2 = 2⁴ − 2 (modular wrap-around)
```

> [!recall] A network packet length field is a 16-bit unsigned integer. An attacker sends a crafted packet with length = 0. The receiver computes (received_length − header_size) where header_size = 20. If this subtraction is done in 16-bit unsigned arithmetic, what value does the receiver compute, and how could this lead to a buffer overflow vulnerability?

## See Also

- [[sign-magnitude-representation-separates-sign-and-value|Sign-Magnitude Representation]] — adds a sign bit for negatives
- [[twos-complement-enables-subtraction-using-addition|Two's Complement]] — the standard signed representation; hardware choice for all modern CPUs
