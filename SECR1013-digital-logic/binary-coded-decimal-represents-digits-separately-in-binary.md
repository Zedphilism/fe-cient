---
title: "Binary Coded Decimal (BCD)"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Binary Coded Decimal (BCD)

BCD stores each decimal digit independently as its own 4-bit binary value, rather than converting the entire number into a single binary representation.

> [!concept] Core Claim
> BCD sacrifices storage efficiency to preserve decimal structure: each digit stays recognizable in its 4-bit group, so converting BCD back to display digits requires only a lookup — no division or modulo arithmetic — making it ideal for devices that show decimal output directly.

## Explanation

Think of BCD as storing a phone number digit-by-digit in separate boxes, rather than converting the whole number to one large integer. The number "294" becomes three boxes: [0010] [1001] [0100] (2, 9, 4). Compare this to pure binary, where 294 becomes one merged value: 100100110₂. The boxes (BCD) are easy to read on a display; the merged value (binary) requires arithmetic to extract each digit back.

The mechanism uses four bits per digit because decimal has 10 symbols (0–9). Two bits (00–11) can only represent 4 values — too few. Three bits (000–111) represent 8 values — still too few (8 < 10). Four bits (0000–1111) represent 16 values — more than enough. BCD uses only 0000 through 1001 (0–9); the bit patterns 1010 through 1111 (10–15) are invalid in BCD and must never appear in a properly encoded value.

The consequence of this design is that BCD and pure binary are completely different encodings of the same number. The BCD pattern for 294 (0010 1001 0100) interpreted as pure binary is 660 — a completely different number. This distinction matters whenever two systems communicate: both must agree on which encoding is in use, or data corruption results. BCD is used in calculators, cash registers, digital clock ICs, and financial systems where exact decimal representation prevents rounding errors.

## Key Points

- 4 bits per decimal digit; n decimal digits → 4n bits total
- Valid range per group: 0000 (0) to 1001 (9)
- Invalid BCD patterns: 1010–1111 (decimal 10–15 have no BCD representation)
- BCD ≠ pure binary: the same bit pattern means different things in each encoding

## Example

Convert 294₁₀ to BCD:

```
Digit:   2      9      4
BCD:   0010   1001   0100
```

BCD result: 0010 1001 0100

For comparison, pure binary 294₁₀ = 1 0010 0110₂ — completely different bit pattern.

Reading back 0010 1001 0100 as pure binary: (256+0+64+32+0+4) = 356₁₀ — wrong if treated as binary.

> [!recall] A digital clock stores the time 09:47 in BCD. Write out the complete BCD bit pattern. Then explain what a processor would compute if it accidentally treated this BCD pattern as a pure binary integer — and what the correct mechanism is to avoid this error.

## See Also

- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]] — pure binary encoding contrasted with BCD
- [[ascii-encodes-characters-as-binary-values|ASCII Encoding]] — another character-to-binary mapping with different goals
- [[gray-code-ensures-only-one-bit-changes-between-values|Gray Code]] — another alternative encoding with single-bit transition guarantee
