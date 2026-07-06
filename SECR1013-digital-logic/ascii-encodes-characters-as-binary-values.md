---
title: "ASCII Encoding"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# ASCII Encoding

ASCII (American Standard Code for Information Interchange) assigns each printable character, digit, and control code a unique 7-bit binary number in the range 0–127, giving computers a shared language for storing and transmitting text.

> [!concept] Core Claim
> ASCII is a lookup table baked into every computer: the bit pattern 0100 0001 means the letter 'A' everywhere, because all systems agreed on this mapping — without that agreement, the same bits would mean different things on different machines.

## Explanation

Think of ASCII like the Morse code alphabet: it is a pre-agreed translation table between symbols and signals. Before ASCII, different computer manufacturers used incompatible codes for text — 'A' might be stored as 65 on one machine and 193 on another. ASCII ended that chaos by establishing a single international standard that all systems could implement.

The mechanism is a 128-entry lookup table mapped to 7 bits (2⁷ = 128). Characters 0–31 and 127 are non-printable control codes (e.g., 10 = newline, 13 = carriage return, 8 = backspace) that control terminal behavior. Characters 32–126 are printable: 32 is space, 48–57 are the digits '0'–'9', 65–90 are uppercase 'A'–'Z', 97–122 are lowercase 'a'–'z', and the remaining slots hold punctuation and symbols.

The most useful pattern is the relationship between uppercase and lowercase letters: 'A' = 65 = 0100 0001 and 'a' = 97 = 0110 0001. The only difference is bit 5 (the third bit from the left in the 7-bit code). Flipping bit 5 converts between cases — toggling one bit is all any hardware needs to perform case conversion. The consequence for digital systems is that case comparisons and conversions are single-operation bit manipulations, not table lookups, making text handling efficient even in minimal hardware.

## Key Points

- 7-bit standard: 128 characters (codes 0–127)
- Digits '0'–'9': codes 48–57
- Uppercase 'A'–'Z': codes 65–90
- Lowercase 'a'–'z': codes 97–122
- Upper vs lowercase: only bit 5 differs (0 = upper, 1 = lower)
- Extended ASCII: 8-bit (0–255); Unicode/UTF-8 is a superset of ASCII for the first 128 codes

## Example

Character 'm':
- Decimal: 109
- Binary: 0110 1101
- Hex: 6D

Character 'M':
- Decimal: 77
- Binary: 0100 1101
- Hex: 4D

'm' vs 'M': bit 5 is 1 vs 0 — all other bits identical.

Case conversion: 'm' OR 0xDF = 'M' (clears bit 5); 'M' OR 0x20 = 'm' (sets bit 5).

> [!recall] A keystroke produces the 7-bit code 0110 1111. Without a lookup table, determine the character using the ASCII structure described here. Then explain how you would modify this code to produce its uppercase equivalent, and verify by calculating the resulting decimal value.

## See Also

- [[binary-coded-decimal-represents-digits-separately-in-binary|Binary Coded Decimal (BCD)]] — digit-only alternative encoding
- [[parity-bit-detects-errors-using-even-or-odd-counts|Parity Bit]] — historically appended to ASCII for error detection in serial transmission
