---
title: "Combinational Logic Circuits"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Combinational Logic Circuits

A combinational logic circuit produces an output that is fully and immediately determined by its current inputs — there is no internal state, no memory of past inputs, and no clock.

> [!concept] Core Claim
> A combinational circuit is a pure function: the same input combination always produces the same output, making it predictable and fully describable by a truth table or Boolean expression alone.

## Explanation

Think of a combinational circuit as a calculator: you press keys (inputs), the display shows the result (output) immediately, and the calculator forgets the last calculation the moment you press new keys. Press the same keys in any order across any session — you always get the same answer. There is no running total, no memory of what you pressed before.

The mechanism is direct propagation: input voltages travel through logic gates, and after propagation delay, the output settles to the value determined by the current input combination. Change any input → output updates; restore the inputs → output returns exactly as before. No internal state ever accumulates.

The consequence is that combinational circuits are the computational workhorses of digital systems: adders sum bits, decoders map addresses to enable lines, multiplexers route data from multiple sources, comparators check equality. All of these transform inputs to outputs without any "remember what happened before" logic. The boundary between combinational and sequential logic is one of the most important conceptual distinctions in digital design — as soon as a circuit needs to count, hold data between clock edges, or respond differently to the same inputs at different times, it has entered sequential territory and needs flip-flops.

## Key Points

- Output depends only on current inputs — no history, no state
- No clock, no memory elements, no feedback paths
- Fully described by a Boolean expression or truth table
- Examples: adders, multiplexers, decoders, encoders, comparators
- Sequential circuits add memory (flip-flops) on top of combinational logic

## Example

Circuit: F = A·(B+C)

| A | B | C | B+C | F = A·(B+C) |
|---|---|---|-----|-------------|
| 0 | 0 | 0 |  0  |      0      |
| 0 | 1 | 1 |  1  |      0      |
| 1 | 0 | 1 |  1  |      1      |
| 1 | 1 | 0 |  1  |      1      |

Change A from 1 to 0: output immediately becomes 0.
Restore A to 1: output immediately returns to its B+C-determined value.
No previous state is retained between changes.

> [!recall] A circuit outputs 1 when you first set A=1, then still outputs 1 when A drops back to 0. Is this circuit combinational or sequential? Justify your answer, and describe the minimum addition needed to make the other type.

## See Also

- [[logic-circuits-implement-boolean-expressions-physically|Logic Circuits and Boolean Expressions]] — how combinational circuits are built from gates
- [[boolean-expression-to-truth-table-maps-all-inputs-to-output|Boolean Expressions to Truth Tables]] — how to fully specify combinational behavior
- [[propagation-delay-limits-digital-circuit-speed|Propagation Delay]] — the only timing factor in purely combinational circuits
