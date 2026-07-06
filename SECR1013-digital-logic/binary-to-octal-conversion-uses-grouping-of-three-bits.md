---
title: "Binary-to-Octal Conversion"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Binary-to-Octal Conversion

Binary converts to octal by grouping bits into sets of three, because 2³ = 8 — each 3-bit group maps directly to one octal digit (0–7) with no arithmetic required.

> [!concept] Core Claim
> Like the 4-bit grouping for hexadecimal, the 3-bit grouping for octal works because 8 is exactly 2³ — a perfect power of 2 — so each octal digit accounts for exactly three bit positions and the conversion is a direct substitution with no calculation.

## Explanation

Think of each group of three bits as a single package: the package contains between 0 and 7 items (the three bits encode 2³ = 8 possible values), and each package is labeled with its octal digit (0 through 7). Conversion is simply labeling packages — no addition, no carrying, just reading.

The mechanism is the same perfect-power-of-2 relationship as hexadecimal-binary conversion, but with groups of 3 instead of 4. Since 8 = 2³, the value range 0–7 of one octal digit matches exactly the value range 000–111 of three binary bits. Group bits in threes from the radix point: leftward for the integer part (pad the leftmost group with leading zeros if needed), rightward for the fractional part (pad the rightmost group with trailing zeros if needed). Substitute each group with its octal digit.

Octal was popular in early computing (PDP-8, Unix file permissions) because 3-bit groupings aligned naturally with 6-bit, 12-bit, and 24-bit word sizes. Today it appears mainly in Unix file permissions (chmod 755 = rwxr-xr-x) and is less common than hexadecimal for general-purpose programming. When converting between octal and hexadecimal, the cleanest route is binary as an intermediate step — expand each octal digit to 3 bits, regroup as 4-bit groups, and read as hex.

## Key Points

- 3-bit grouping works because 2³ = 8 (octal base is a perfect power of 2)
- Integer part: group from radix point leftward; pad leftmost group with leading zeros
- Fractional part: group from radix point rightward; pad rightmost group with trailing zeros
- Octal digits: 0–7 only — the digit 8 or 9 does not exist in octal
- Octal → binary: expand each digit to 3 bits; drop leading zeros from MSB only
- Octal ↔ Hex: convert through binary as intermediate

## Example

Convert 10001101.1101001₂ to octal:

```
Integer part (group leftward from dot):
  010  001  101
   2    1    5
  
Fractional part (group rightward from dot):
  110  100  100
   6    4    4

Result: 215.644₈
```

Reverse — convert 623.53₈ to binary:

```
6=110, 2=010, 3=011 . 5=101, 3=011
Binary: 110010011.101011₂
```

> [!recall] A Unix file has permissions 754₈. Convert this to binary to show the exact bit pattern, then interpret each 3-bit group as rwx (read=4, write=2, execute=1) permissions for owner, group, and others.

## See Also

- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]] — the base-2 system being converted from
- [[binary-to-hexadecimal-conversion-uses-grouping-of-four-bits|Binary-to-Hexadecimal Conversion]] — same principle with 4-bit groups (2⁴ = 16)
- [[number-system-conversion-uses-division-and-multiplication|Number System Conversion]] — general method without the grouping shortcut
