---
title: "Binary Representation"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Binary Representation

Binary numbers represent values using only the digits 0 and 1, where each bit position carries a weight equal to 2 raised to that position's index.

> [!concept] Core Claim
> Binary is the native language of digital hardware because transistors have exactly two stable states (on/off), and those states map directly to the two binary digits — so every binary calculation the processor does corresponds to physical switching events in silicon.

## Explanation

Think of a binary number like a row of light switches: each switch can only be ON (1) or OFF (0), and the switches are worth different amounts depending on their position in the row. The rightmost switch is worth 1, the next is worth 2, then 4, 8, 16... The total value is the sum of all the ON switches' positions.

The mechanism is the positional weight formula applied at base 2: the digit in column n (counting from 0 at the rightmost) contributes digit × 2ⁿ to the total value. Columns to the right of the radix point use negative exponents — 2⁻¹ = 0.5, 2⁻² = 0.25 — enabling binary fractions. This makes binary a complete number system, not limited to integers.

Two useful patterns emerge directly from the base-2 structure. First, powers of 2 in binary always look like "1 followed by zeros" (8 = 1000₂, 16 = 10000₂), so you can spot them instantly. Second, even numbers always end in 0 (the 2⁰ column is off) and odd numbers always end in 1 (the 2⁰ column is on). These patterns speed up mental estimation and error-checking when reading binary values.

## Key Points

| Power | Value | Binary  |
|-------|-------|---------|
| 2⁰    | 1     | 1       |
| 2¹    | 2     | 10      |
| 2²    | 4     | 100     |
| 2³    | 8     | 1000    |
| 2⁴    | 16    | 10000   |
| 2⁵    | 32    | 100000  |

- Each bit = face value (0 or 1) × its positional weight (2^position)
- Even binary numbers end in 0; odd end in 1
- 2ⁿ − 1 in binary = n consecutive 1s (e.g., 2³−1 = 7 = 0111)

## Example

Convert 110100.011₂ to decimal:

(1×2⁵) + (1×2⁴) + (0×2³) + (1×2²) + (0×2¹) + (0×2⁰) + (0×2⁻¹) + (1×2⁻²) + (1×2⁻³)
= 32 + 16 + 0 + 4 + 0 + 0 + 0 + 0.25 + 0.125
= **52.375₁₀** ✓

> [!recall] Without converting to decimal, determine whether 11010110₂ is divisible by 2, and whether 10000000₂ is a power of 2. Then convert 11010110₂ to decimal by positional expansion and verify your parity prediction.

## See Also

- [[positional-number-systems-assign-value-based-on-place|Positional Number Systems]] — the general framework binary applies
- [[binary-to-hexadecimal-conversion-uses-grouping-of-four-bits|Binary-to-Hexadecimal Conversion]] — compact notation for binary values
- [[binary-to-octal-conversion-uses-grouping-of-three-bits|Binary-to-Octal Conversion]] — alternative compact grouping
