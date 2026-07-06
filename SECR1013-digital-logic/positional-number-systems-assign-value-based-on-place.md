---
title: "Positional Number Systems"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Positional Number Systems

In a positional number system, the value of each digit is determined by the digit itself multiplied by its base raised to the power of its position — so the same digit symbol carries a different value depending on where it sits.

> [!concept] Core Claim
> All number systems used in digital logic — binary, octal, decimal, hexadecimal — share the same positional structure; only the base (radix) and digit set change, so understanding the decimal system you already use is the key to understanding all others.

## Explanation

Think of positional notation like place value in money: a "5" in the thousands column is $5,000, but the same "5" in the ones column is $5. The symbol is the same; the position determines what it's worth. Every number system works this way — the only thing that changes between decimal, binary, and hexadecimal is what each column is worth.

The mechanism is the weighted sum formula: the value of a number equals the sum of each digit multiplied by the base raised to the power of its column position. Column positions count from 0 at the rightmost digit (immediately left of the radix point), increasing leftward by 1 for each column, and decreasing to −1, −2, ... for fractional positions to the right of the radix point. For base 10: the ones column is 10⁰=1, the tens column is 10¹=10, the hundreds column is 10²=100. For base 2: the first column is 2⁰=1, the second is 2¹=2, the third is 2²=4, and so on.

The consequence is that the same conversion algorithm — multiply digit by base^position and sum — works for any base. Learning binary, octal, and hexadecimal is not learning four different systems; it is applying one system with four different radix values. The digit set is constrained by the base: base B uses only digits 0 through B−1, which is why binary uses only {0,1} and hexadecimal needs letters A–F to represent the digits for 10–15.

## Key Points

| Base | Name        | Digits used        |
|------|-------------|--------------------|
| 2    | Binary      | 0, 1               |
| 8    | Octal       | 0–7                |
| 10   | Decimal     | 0–9                |
| 16   | Hexadecimal | 0–9, A–F           |

- Positional value formula: N = Σ (digit × base^position)
- Leftmost digit = Most Significant Digit (MSD); rightmost = Least Significant Digit (LSD)
- Positions to the right of the radix point use negative exponents (fractional values)

## Example

Express 4839.72₁₀ as a weighted sum:

(4 × 10³) + (8 × 10²) + (3 × 10¹) + (9 × 10⁰) + (7 × 10⁻¹) + (2 × 10⁻²)
= 4000 + 800 + 30 + 9 + 0.7 + 0.02 = 4839.72

Same concept in binary — 1011₂:
(1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = 11₁₀

> [!recall] What is the decimal value of the hexadecimal number 2A.8₁₆? Show the full positional calculation, and explain why the digit A carries a value of 10 in this context.

## See Also

- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]] — applies this concept to base 2 specifically
- [[number-system-conversion-uses-division-and-multiplication|Number System Conversion]] — the algorithm that uses positional weights to convert between bases
