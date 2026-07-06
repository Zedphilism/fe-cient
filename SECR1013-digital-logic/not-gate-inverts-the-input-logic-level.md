---
title: "NOT Gate"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# NOT Gate

A NOT gate (inverter) produces the logical complement of its single input: HIGH in produces LOW out, and LOW in produces HIGH out — it simply flips the logic level.

> [!concept] Core Claim
> The NOT gate is the essential inversion primitive: it lets a circuit act on the absence of a condition (when A is false) as easily as it acts on the presence (when A is true), which is impossible without complementation.

## Explanation

Think of the NOT gate as a light switch wired backwards: when you flip the switch up (input HIGH), the light turns OFF (output LOW), and when you flip it down (input LOW), the light turns ON (output HIGH). The output always reports the opposite of what the input says.

The mechanism is a single transistor in a common-emitter configuration: when the input drives the base HIGH, the transistor saturates, pulling the output to near ground (LOW). When the input is LOW, the transistor cuts off, allowing a pull-up resistor to bring the output HIGH. No logic, no memory — just a single transistor flip.

The consequence is that NOT gates are the ingredient that allows all Boolean expressions to include both a variable and its complement. Without inversion, the algebra is severely restricted. NOT is also what makes NAND and NOR "universal" gates — they each combine AND or OR with a built-in inversion, giving them the complementing power to synthesize any other gate type.

The bubble symbol (a small circle on the output) means inversion wherever it appears in a schematic — on NOT gates, NAND gates, NOR gates, and input pins of active-low devices. Learning to read bubbles is learning to read polarity.

## Key Points

- Single input, single output
- F = A' (complement of A; also written Ā or ¬A)
- Output is always the opposite of the input
- Symbol: triangle (buffer shape) + output bubble
- Double inversion cancels: (A')' = A

## Example

Truth table:

| A | F = A' |
|---|--------|
| 0 |    1   |
| 1 |    0   |

Using NOT to build AND from NAND: connect NAND output to a NOT gate input → F = ((A·B)')' = A·B. This proves NAND is universal — NOT is recoverable from it.

> [!recall] You need to implement the function F = A' using only NAND gates (no NOT gates allowed). Draw the gate connections and explain why this works by tracing the logic for A=0 and A=1.

## See Also

- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]] — AND + NOT combined into one universal gate
- [[nor-gate-is-a-universal-gate-built-from-or-and-not|NOR Gate]] — OR + NOT combined into one universal gate
- [[active-high-vs-active-low|Active-High vs Active-Low]] — inversion is the basis of active-low signal convention
