---
title: "Sequential Logic Circuits"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Sequential Logic Circuits

A sequential logic circuit is a digital circuit whose output depends on both the current inputs and the circuit's stored past state, giving it memory that combinational logic cannot have.

> [!concept] Core Claim
> Sequential circuits have memory: the same inputs can produce different outputs depending on what the circuit has "seen" before.

## Explanation

Think of a sequential circuit as a combination lock — the same combination of button presses (inputs) yields different results depending on the order in which they were pressed (history). This is fundamentally different from a combinational circuit, which behaves like a calculator: the same inputs always produce the same output with no memory of previous operations.

The mechanism relies on feedback: the output of a memory element (latch or flip-flop) is fed back as an input to the circuit. This feedback loop allows the circuit to remember a previous state. The current output is then a function of both the current external input and this stored internal state.

Sequential circuits divide into two classes. Asynchronous (event-driven) circuits change state immediately when an input changes. Synchronous (clock-driven) circuits only change state at the precise moment defined by a clock signal — the standard approach in CPUs, registers, and controllers because it makes timing predictable and verifiable.

## Key Points

- Output = f(current inputs, stored past state)
- Memory element: latch (level-triggered) or flip-flop (edge-triggered)
- Asynchronous: state changes on input events; no clock
- Synchronous: state changes only on clock edges
- Examples: counters, registers, FSMs, CPUs

## Example

A 2-bit binary counter counts: 00 → 01 → 10 → 11 → 00. After clock pulse 3, the state is 11. A combinational circuit given the same inputs would give the same output regardless of clock pulse count; the counter "remembers" how many pulses it has received.

> [!recall] You build a circuit that counts button presses up to 8 and resets. Is this combinational or sequential? What minimum information must be stored at any instant, and how many bits does that require?

## See Also

- [[combinational-logic-circuits-depend-only-on-current-inputs|Combinational Logic]] — the stateless counterpart; no memory or feedback
- [[sr-latch|SR Latch]] — the simplest sequential memory element
- [[flip-flop-vs-latch|Flip-Flops vs Latches]] — the two memory device families
