---
title: "Binary-to-Hexadecimal Conversion"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Binary-to-Hexadecimal Conversion

Binary converts to hexadecimal by grouping bits into sets of four, because 2⁴ = 16 — each 4-bit group maps directly to one hexadecimal digit with no arithmetic required.

> [!concept] Core Claim
> The 4-bit grouping shortcut works because hexadecimal base 16 is exactly 2⁴ — a perfect power of 2 — so each hex digit accounts for exactly four bit positions, making conversion a lookup rather than a calculation.

## Explanation

Think of the 4-bit grouping as a packing rule: just as 4 quarters always make exactly 1 dollar (the conversion is exact, not approximate), exactly 4 binary bits always make exactly 1 hex digit. You never need to add, multiply, or carry — you just read the groups.

The mechanism exploits the power-of-2 relationship: because 16 = 2⁴, the value range of one hex digit (0–15) exactly matches the value range of four binary bits (0000–1111). There is a one-to-one correspondence with no overlap and no gap. Group the bits in fours from the radix point outward: for the integer part, group leftward and pad the leftmost group with leading zeros if needed; for the fractional part, group rightward and pad the rightmost group with trailing zeros if needed. Then substitute each group with its hex equivalent using the table (A=10 through F=15).

The reason hexadecimal is the dominant notation in programming and hardware documentation is exactly this compactness: a 32-bit address takes 32 binary digits or 8 hex digits. Eight hex digits are manageable; 32 binary digits are error-prone. Memory addresses, machine code, color values, MAC addresses — all are written in hex for this reason.

## Key Points

- 4-bit grouping works because 2⁴ = 16 (hex base is a perfect power of 2)
- Integer part: group from radix point leftward; pad leftmost group with leading zeros
- Fractional part: group from radix point rightward; pad rightmost group with trailing zeros
- Each group maps to: 0–9 or A(10), B(11), C(12), D(13), E(14), F(15)
- Hex → binary: expand each digit to 4 bits; drop leading zeros from MSB only

## Example

Convert 10011001110₂ to hexadecimal:

```
Binary:   0 1 0 0  1 1 0 0  1 1 1 0
           ↓         ↓         ↓
Hex:        4         C         E
Result: 4CE₁₆
```

Reverse — convert 124.AB7₁₆ to binary:

```
1=0001, 2=0010, 4=0100 . A=1010, B=1011, 7=0111
Binary: 000100100100.101010110111₂
Remove leading zeros: 100100100.101010110111₂
```

> [!recall] A memory address is given as 0x3F8C. Without a calculator, determine the binary representation and then count the total number of 1-bits. Explain why hex is preferred for addressing over binary when writing documentation.

## See Also

- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]] — the base-2 system being converted from
- [[binary-to-octal-conversion-uses-grouping-of-three-bits|Binary-to-Octal Conversion]] — same principle with 3-bit groups (2³ = 8)
- [[number-system-conversion-uses-division-and-multiplication|Number System Conversion]] — general method without the grouping shortcut
