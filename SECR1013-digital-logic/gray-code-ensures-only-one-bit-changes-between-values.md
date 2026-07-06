---
title: "Gray Code"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Gray Code

Gray code is a binary encoding where consecutive values differ in exactly one bit — it eliminates the multi-bit transition glitches that standard binary counting produces.

> [!concept] Core Claim
> Gray code solves the reliability problem in mechanical sensing: because only one bit changes at a time, there is never an ambiguous intermediate state during a transition, making it the standard encoding for rotary encoders and position sensors.

## Explanation

Think of a rotary encoder on a dial — a sensor that reads the dial's position as a binary number. In standard binary, turning from position 3 (011) to position 4 (100) requires all three bits to flip simultaneously. In reality, the three bits flip at slightly different instants due to mechanical tolerances. During the brief overlap, the sensor might read 001, 010, 100, or 110 — spurious positions that were never actually reached. These false readings are called glitches.

Gray code is designed so that any transition between consecutive positions changes exactly one bit. This means there is only one bit changing at a time — no overlap, no ambiguous state. If the mechanical transition is caught mid-change, the sensor reads either the previous position or the next position, but never a phantom position in between.

The conversion algorithm from binary to Gray code is simple: keep the most significant bit unchanged; for every subsequent bit position, XOR the current binary bit with the one to its left. To convert Gray code back to binary: keep the MSB; for each subsequent position, XOR the previous decoded binary bit with the current Gray bit. The important caveat is that Gray code values are not positionally weighted like binary — you cannot do arithmetic directly on Gray code values; they must first be decoded back to binary.

## Key Points

- Only one bit changes between consecutive values
- Prevents erroneous intermediate readings during transitions
- Not directly usable for arithmetic — must decode to binary first
- Binary → Gray: G_MSB = B_MSB; Gᵢ = Bᵢ XOR Bᵢ₋₁ (current XOR adjacent-left)
- Gray → Binary: B_MSB = G_MSB; Bᵢ = Bᵢ₋₁ XOR Gᵢ

## Example

Binary 0–4 vs Gray code — notice only one bit changes per row:

| Decimal | Binary | Gray | Bit change |
|---------|--------|------|------------|
| 0       | 000    | 000  | —          |
| 1       | 001    | 001  | bit 0      |
| 2       | 010    | 011  | bit 1      |
| 3       | 011    | 010  | bit 1      |
| 4       | 100    | 110  | bit 2      |

Convert binary 1001₂ to Gray code:

```
B:  1  0  0  1
    ↓  ↓  ↓  ↓
G:  1  1⊕0  0⊕0  0⊕1  =  1  1  0  1
```
Gray result: 1101

> [!recall] A rotary encoder uses standard binary. At the transition from 7 (0111) to 8 (1000), list all invalid intermediate states the sensor could read due to asynchronous bit transitions. Then show the Gray code for both 7 and 8 and explain why Gray code eliminates the problem.

## See Also

- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]] — the standard encoding Gray code converts from
- [[parity-bit-detects-errors-using-even-or-odd-counts|Parity Bit]] — a different error-mitigation technique (detection rather than prevention)
