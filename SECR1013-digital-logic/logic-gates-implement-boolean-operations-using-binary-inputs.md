---
title: "Logic Gates"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Logic Gates

A logic gate is an electronic circuit that takes one or more binary inputs and produces a single binary output determined entirely by a Boolean operation applied to those inputs.

> [!concept] Core Claim
> Logic gates are the hardware implementation of Boolean algebra — each gate permanently performs one Boolean function, and complex digital systems are built by wiring these gates together into larger networks.

## Explanation

Think of a logic gate as a machine that applies a rule: the AND gate applies the rule "are all conditions met?"; the OR gate applies "is at least one condition met?"; the NOT gate applies "flip it." The gate itself is a transistor circuit that enforces this rule electrically — it does not remember previous inputs and cannot be reprogrammed.

Every gate is fully described by three interchangeable representations: its symbol (the graphical shape used in schematics), its Boolean expression (the algebraic formula), and its truth table (the exhaustive input/output map). These three are equivalent — given any one, the other two can be derived. This interchangeability makes logic design verifiable: draw the circuit, write the expression, or check the truth table — all three describe the exact same behavior.

The consequence is that any digital computation — from a single equality check to a full CPU instruction — can be broken down into a network of these primitive gates. Complexity is assembled from simplicity, which is why understanding individual gates is the prerequisite to understanding every digital system ever built.

## Key Points

- Inputs and outputs are binary (0 = LOW, 1 = HIGH)
- Each gate implements exactly one Boolean function
- Three equivalent representations: symbol, Boolean expression, truth table
- Output depends only on current inputs — gates have no memory
- Seven standard gate types: AND, OR, NOT, NAND, NOR, XOR, XNOR

## Example

2-input AND gate — three representations of the same function:

Boolean expression: F = A · B

Truth table:

| A | B | F = A·B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

Symbol: D-shaped body with flat left edge; inputs on left, output on right.

> [!recall] A circuit has three gates: AND(A,B) feeds into OR with input C, and that output feeds into NOT. Write the Boolean expression for the final output and build its truth table. What logic function does this implement?

## See Also

- [[truth-tables-enumerate-all-possible-input-output-combinations|Truth Tables]] — full behavioral specification of any gate
- [[and-gate-outputs-high-only-when-all-inputs-are-high|AND Gate]] — first specific gate to study
- [[binary-digits-and-logic-levels|Binary Digits and Logic Levels]] — physical basis of 0 and 1
