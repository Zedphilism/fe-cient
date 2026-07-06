---
title: "AND Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# AND Gate

An AND gate performs logical multiplication and outputs HIGH only when every one of its inputs is simultaneously HIGH.

> [!concept] Core Claim
> The AND gate acts as a series switch: the output path is only complete when all input switches are closed at the same time — one open switch (LOW input) breaks the chain and forces the output LOW.

## Explanation

Think of the AND gate as a set of doors you must pass through in sequence: you can only exit the building if door A is open AND door B is open AND every subsequent door is also open. One locked door stops you regardless of all the others.

The mechanism is Boolean multiplication. In binary, 1·1=1, but 1·0=0 and 0·0=0 — any zero in the chain zeroes the result. Electrically, a single LOW input forces the output transistor into its off state, pulling the output to LOW regardless of what the other inputs are doing. Only when all inputs are simultaneously HIGH does the circuit allow the output to rise to HIGH.

This behavior makes the AND gate the natural choice whenever multiple conditions must all be satisfied simultaneously. A common circuit pattern connects a data signal to one AND input and an enable control signal to another input; the data signal only passes through to the output when the control is HIGH — otherwise the output is locked at LOW. This is called gating a signal.

## Key Points

- Boolean expression: F = A·B (also written A AND B)
- Output = 1 only if ALL inputs = 1
- Output = 0 if ANY single input = 0
- Symbol: D-shape with flat left side and curved right side

## Example

2-input AND truth table:

| A | B | F = A·B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

Enable gate circuit: if EN=0, output = 0·DATA = 0 always. If EN=1, output = 1·DATA = DATA. The AND gate passes or blocks the data signal.

> [!recall] Design a 1-bit comparator that outputs 1 only when A equals B. You may use only AND, OR, and NOT gates. Hint: when are A and B equal? Write the Boolean expression, then trace through it for A=1, B=1 and A=1, B=0.

## See Also

- [[or-gate-outputs-high-when-any-input-is-high|OR Gate]] — any single HIGH input suffices
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — AND followed by NOT; outputs LOW only when all inputs are HIGH
- [[logic-gates-implement-boolean-operations-using-binary-inputs|Logic Gates]] — context for all gate types
