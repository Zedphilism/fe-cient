---
title: "SECR1013 — Digital Logic"
date: 2026-04-18
tags: [hub, semester-3, digital-logic, secr1013]
---

# SECR1013 — Digital Logic

Topics: Number systems, data codes, arithmetic, logic gates, Boolean algebra, combinational circuits, sequential circuits, Verilog HDL.

## Notes

### Signals and Representation
- [[analog-vs-digital|Analog vs Digital Signals]]
- [[binary-digits-and-logic-levels|Binary Digits and Logic Levels]]
- [[active-high-vs-active-low|Active-High vs Active-Low]]

### Waveforms and Timing
- [[digital-waveforms-and-signal-behavior|Digital Waveforms and Signal Behavior]]
- [[duty-cycle-concept|Duty Cycle]]
- [[timing-diagrams|Timing Diagrams]]

### Conversion
- [[analog-digital-conversion|Analog-to-Digital and Digital-to-Analog Conversion]]
- [[sampling-and-nyquist-theorem-concept|Sampling and Nyquist Theorem]]

### Number Systems (Module 2a)
- [[positional-number-systems-assign-value-based-on-place|Positional Number Systems]]
- [[binary-representation-uses-base-two-with-weighted-bits|Binary Representation]]
- [[number-system-conversion-uses-division-and-multiplication|Number System Conversion]]
- [[binary-to-hexadecimal-conversion-uses-grouping-of-four-bits|Binary-to-Hexadecimal Conversion]]
- [[binary-to-octal-conversion-uses-grouping-of-three-bits|Binary-to-Octal Conversion]]

### Data Codes (Module 2b)
- [[binary-coded-decimal-represents-digits-separately-in-binary|Binary Coded Decimal (BCD)]]
- [[gray-code-ensures-only-one-bit-changes-between-values|Gray Code]]
- [[parity-bit-detects-errors-using-even-or-odd-counts|Parity Bit]]
- [[ascii-encodes-characters-as-binary-values|ASCII Encoding]]

### Arithmetic and Signed Numbers (Module 2c)
- [[unsigned-binary-integers-represent-only-non-negative-values|Unsigned Binary Integers]]
- [[sign-magnitude-representation-separates-sign-and-value|Sign-Magnitude Representation]]
- [[ones-complement-inverts-bits-to-represent-negative-values|Ones Complement]]
- [[twos-complement-enables-subtraction-using-addition|Two's Complement]]
- [[binary-overflow-occurs-when-results-exceed-bit-capacity|Binary Overflow]]

### Logic Gates (Module 3)
- [[logic-gates-implement-boolean-operations-using-binary-inputs|Logic Gates]]
- [[truth-tables-enumerate-all-possible-input-output-combinations|Truth Tables]]
- [[and-gate-outputs-high-only-when-all-inputs-are-high|AND Gate]]
- [[or-gate-outputs-high-when-any-input-is-high|OR Gate]]
- [[not-gate-inverts-the-input-logic-level|NOT Gate]]
- [[nand-gate-is-a-universal-gate-built-from-and-and-not|NAND Gate]]
- [[nor-gate-is-a-universal-gate-built-from-or-and-not|NOR Gate]]
- [[xor-gate-outputs-high-when-inputs-are-different|XOR Gate]]
- [[xnor-gate-outputs-high-when-inputs-are-equal|XNOR Gate]]

### Boolean Algebra (Module 4a)
- [[boolean-algebra-simplifies-logic-expressions-without-changing-output|Boolean Algebra]]
- [[boolean-variables-and-complements-define-binary-logic-behavior|Boolean Variables and Complements]]
- [[commutative-associative-and-distributive-laws-preserve-logic-equivalence|Laws of Boolean Algebra]]
- [[boolean-rules-provide-direct-simplification-shortcuts|Boolean Simplification Rules]]
- [[demorgans-theorems-transform-between-and-or-forms|DeMorgan's Theorems]]
- [[combinational-logic-circuits-depend-only-on-current-inputs|Combinational Logic Circuits]]
- [[logic-circuits-implement-boolean-expressions-physically|Logic Circuits and Boolean Expressions]]
- [[boolean-expression-to-truth-table-maps-all-inputs-to-output|Boolean Expressions to Truth Tables]]

### Supplemental (Thomas Floyd)
- [[active-low-signals-provide-fail-safe-behavior|Active-Low Signals and Fail-Safe Behavior]]
- [[propagation-delay-limits-digital-circuit-speed|Propagation Delay]]

### Latches and Flip-Flops (Module 7)
- [[sequential-logic-circuits|Sequential Logic Circuits]]
- [[sr-latch|SR Latch]]
- [[gated-sr-latch|Gated SR Latch]]
- [[gated-d-latch|Gated D Latch]]
- [[flip-flop-vs-latch|Flip-Flops vs Latches]]
- [[sr-flip-flop|SR Flip-Flop]]
- [[jk-flip-flop|JK Flip-Flop]]
- [[d-flip-flop|D Flip-Flop]]
- [[t-flip-flop|T Flip-Flop]]
- [[asynchronous-inputs-preset-clear|Asynchronous Inputs: PRE and CLR]]

### Counters (Module 8a)
- [[counter-types-and-modulus|Counter Types and Modulus]]
- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]]
- [[synchronous-counter|Synchronous Counter]]
- [[truncated-modulus-counter|Truncated-Modulus Counter]]

## See Also

- [[Glossary/_Index|Glossary]]
- [[semester-03/SECI1113-computational-mathematic/_Index|Computational Mathematics]] — Boolean algebra is shared ground
- [[semester-03/SCSR2213-network-communication/_Index|Network Communication]] — hardware layer → protocol layer
