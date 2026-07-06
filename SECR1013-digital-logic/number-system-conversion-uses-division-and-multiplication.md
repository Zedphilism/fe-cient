---
title: "Number System Conversion"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Number System Conversion

Converting a decimal number to another base uses successive division for the integer part and successive multiplication for the fractional part, with digits read in opposite directions.

> [!concept] Core Claim
> Division and multiplication by the target base progressively "peel off" digits from a number — remainders reveal the digit values for integer conversion, and overflow digits reveal them for fractional conversion — and the reading direction is opposite in each case.

## Explanation

Think of integer conversion as repeatedly asking: "what is the remainder when I divide by the target base?" Each remainder becomes one digit of the answer, and you collect them from bottom to top — the last remainder you compute is the most significant digit. Division works here because each step strips away one base-worth of value and leaves the remainder as the column digit.

For fractional conversion, the logic flips: repeatedly multiply the fraction by the target base. Each multiplication "promotes" the most significant fractional digit across the radix point into the integer region, where you can read it directly as a whole number. Collect these whole numbers from top to bottom — the first one you compute is the most significant fractional digit.

The two methods are handled separately because the integer and fractional parts behave differently: integer digits accumulate toward larger positional weights (leftward), while fractional digits accumulate toward smaller weights (rightward). Joining the results at the radix point gives the full converted number.

One important caveat: fractional conversion may not terminate. For example, 0.1₁₀ = 0.000110011...₂ repeating in binary. In practice, stop when you have enough precision for the application.

## Key Points

- Integer part: divide by target base repeatedly; record remainders; read them bottom-to-top
- Fractional part: multiply by target base repeatedly; record whole-number parts; read them top-to-bottom
- Stop integer conversion when quotient reaches 0
- Stop fractional conversion when fraction reaches 0, or at required precision
- Fractional conversions may produce non-terminating representations

## Example

Convert 1447.18359₁₀ to hexadecimal (base 16):

**Integer part (divide by 16, read remainders bottom-to-top):**
```
1447 ÷ 16 = 90  remainder 7
  90 ÷ 16 = 5   remainder A (10)
   5 ÷ 16 = 0   remainder 5  ← start reading here
```
Integer result: **5A7₁₆**

**Fractional part (multiply by 16, read whole parts top-to-bottom):**
```
0.18359 × 16 = 2.93744  → whole part: 2  ← start reading here
0.93744 × 16 = 14.99904 → whole part: E (14)
0.99904 × 16 = 15.98464 → whole part: F (15)
```
Fractional result: **.2EF₁₆**

Final answer: **1447.18359₁₀ ≈ 5A7.2EF₁₆** ✓

> [!recall] Convert 57.625₁₀ to binary using successive division and multiplication. Show every division and multiplication step. Then verify your integer result by converting back to decimal using positional weights.

## See Also

- [[positional-number-systems-assign-value-based-on-place|Positional Number Systems]] — explains why this method works
- [[binary-to-hexadecimal-conversion-uses-grouping-of-four-bits|Binary-to-Hexadecimal Conversion]] — faster shortcut when source is already binary
- [[binary-to-octal-conversion-uses-grouping-of-three-bits|Binary-to-Octal Conversion]] — faster shortcut for octal
