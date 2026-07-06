---
title: "Parity Bit"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Parity Bit

A parity bit is one extra bit appended to a binary word so that the total count of 1s always matches an agreed-upon parity convention (even or odd), enabling single-bit transmission errors to be detected at the receiver.

> [!concept] Core Claim
> Parity works as a checksum on the number of 1s: the sender enforces the correct count by setting the parity bit, and the receiver checks that the count still holds — a mismatch proves that at least one bit was corrupted in transit.

## Explanation

Think of parity like a "count check" on a spreadsheet: before emailing a spreadsheet to a colleague, you note that it has 14 non-zero cells. When your colleague receives it, they count 15 non-zero cells and immediately know something changed during transmission. The parity bit is that count — reduced to just even or odd — and the receiver is the colleague doing the recount.

The mechanism is the XOR operation: XOR-ing all data bits together produces 0 if the count of 1s is even, and 1 if it is odd. For even parity, the parity bit is set to make the XOR of all bits (including the parity bit itself) equal 0 — meaning the total count of 1s is even. The receiver XORs all received bits; if the result is 0, the count is still even and no error is detected.

The limitation is fundamental: parity detects only an odd number of bit flips. If two bits flip, the count of 1s changes by ±2, keeping the parity correct — the error goes undetected. Parity also cannot locate which bit flipped, only that something changed. Despite this, parity remains useful in RAM modules (ECC memory extends it to correction) and simple serial protocols like UART, because single-bit errors dominate in most real environments and the overhead is just one bit per byte.

## Key Points

- Even parity: parity bit chosen so total 1-count is even
- Odd parity: parity bit chosen so total 1-count is odd
- Detects odd-count bit errors (1, 3, 5, ... flipped bits)
- Cannot detect even-count errors (2, 4, 6, ... flipped bits)
- Cannot identify which bit is wrong — detection only, no correction

## Example

Data: 1010011 — four 1s (even count)

Even parity: count is already even → parity bit = **0**
Transmitted: **0** 1010011

Odd parity: count is even, need odd → parity bit = **1**
Transmitted: **1** 1010011

Receiver gets: 1 1010111 (bit 1 flipped — now five 1s)
Check: 5 is odd. Expected even parity → **error detected** ✓

Receiver gets: 0 1011111 (two bits flipped — still four 1s)
Check: 4 is even. Parity passes → **error NOT detected** ✗

> [!recall] A 7-bit data word 1100101 is transmitted with even parity over a noisy channel. What parity bit is appended? If the receiver gets 11100101 (the word with parity bit), determine whether any error occurred. Then explain why receiving 01100111 with the same parity scheme might not raise an alarm.

## See Also

- [[gray-code-ensures-only-one-bit-changes-between-values|Gray Code]] — prevents errors rather than detecting them after the fact
- [[ascii-encodes-characters-as-binary-values|ASCII Encoding]] — historically transmitted with a parity bit over serial lines
