---
title: "XOR Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# XOR Gate

An XOR (exclusive OR) gate outputs HIGH when its two inputs have different values, and LOW when they are the same — it is a 1-bit difference detector.

> [!concept] Core Claim
> XOR is "OR but not both": it outputs 1 when exactly one input is 1, making it the hardware primitive for detecting inequality, computing binary sum bits, and generating parity.

## Explanation

Think of XOR as a toggle switch with two controllers: if both are in the same position (both up or both down), nothing happens (output LOW). Only when they are in opposite positions (one up, one down) does the circuit activate (output HIGH). Two people trying to control the same light with matching switches — XOR captures that conflict.

The mechanism comes from the expression F = A'B + AB': the output is 1 when A is 0 and B is 1 (case A'B), or when A is 1 and B is 0 (case AB'). Both cases represent "inputs are different." The all-zeros and all-ones cases are both excluded, which is what makes XOR exclusive — it rejects the consensus cases that OR would accept.

This difference-detecting behavior makes XOR indispensable in three domains. In arithmetic, XOR computes the 1-bit sum without carry: 0+0=0, 0+1=1, 1+0=1, 1+1=0 (with carry to the next bit). A half adder is literally one XOR plus one AND gate. In error detection, XOR chains bits together to compute parity: the output flips for each 1 it encounters, so the final result reveals whether an odd or even number of 1s were present. In cryptography, XOR is perfectly reversible — applying the same key twice recovers the original, enabling stream ciphers.

For more than two inputs, the extended XOR rule is: output is 1 when an odd number of inputs are 1.

## Key Points

- F = A⊕B = A'B + AB'
- Output = 1 when inputs differ; output = 0 when inputs are equal
- Multi-input XOR: output = 1 when an odd number of inputs = 1
- Key uses: binary addition (sum bit), parity generation, inequality detection

## Example

2-input XOR truth table:

| A | B | F = A⊕B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    0    |

Half adder: Sum = A⊕B (XOR gives the sum bit), Carry = A·B (AND gives the carry bit).

3-input XOR parity check: A=1, B=1, C=1 → 1⊕1⊕1 = 1 (odd number of 1s → output 1).

> [!recall] You receive a 4-bit data word followed by a parity bit: 1011 1. The sender used even parity (XOR of all data bits appended as parity). Determine whether the received word is error-free, and explain the XOR mechanism that tells you.

## See Also

- [[xnor-gate-outputs-high-when-inputs-are-equal|XNOR Gate]] — XOR inverted; outputs HIGH when inputs are equal
- [[or-gate-outputs-high-when-any-input-is-high|OR Gate]] — XOR is OR minus the all-ones input case
- [[parity-bit-detects-errors-using-even-or-odd-counts|Parity Bit]] — uses XOR chains to count 1s and detect errors
