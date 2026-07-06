---
title: "Asynchronous Ripple Counter"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Asynchronous Ripple Counter

An asynchronous (ripple) counter is a binary counter in which the external clock drives only the LSB flip-flop, and each subsequent flip-flop is clocked by the output of the one before it, so the carry signal "ripples" through the chain with accumulating propagation delay.

> [!concept] Core Claim
> In a ripple counter, the clock reaches each stage one flip-flop delay later than the stage before it — simple to build, but the accumulated delay limits the maximum operating frequency.

## Explanation

Think of ripple counter stages as dominoes: knocking the first one (LSB flip-flop clocked by external CLK) starts a chain reaction, each domino taking a moment to fall before it tips the next. By the time the carry reaches the MSB flip-flop, N × tpd nanoseconds have elapsed since the original clock edge. This delay is called ripple delay.

All flip-flops operate in toggle mode (J=K=1 for JK FFs). To build a count-up counter with positive-edge triggered FFs: connect Q of each FF to CLK of the next — each stage changes state when its source goes from HIGH to LOW (effectively using the falling edge of Q). For a count-down counter: connect Q' to the next CLK input instead.

The key limitation is frequency. Because all N stages must settle before the output is valid, the maximum clock frequency is f_max = 1 / (N × tpd). A 4-bit ripple counter with 10 ns per stage allows at most 25 MHz. Adding more bits reduces maximum frequency proportionally. Synchronous counters avoid this by changing all bits simultaneously.

## Key Points

- CLK connects only to FF₀ (LSB)
- Each FFₙ's CLK comes from FFₙ₋₁'s Q (count-up) or Q' (count-down)
- All FFs in toggle mode: J=K=1
- Ripple delay: total = N × tpd
- Maximum frequency: f_max = 1 / (N × tpd)
- Also called: asynchronous counter, ripple counter

## Example

2-bit count-up ripple counter (JK, negative-edge triggered, Q clocks next):

| CLK pulse | Q₁ (MSB) | Q₀ (LSB) | Decimal |
|-----------|----------|----------|---------|
| Initial   | 0        | 0        | 0       |
| 1         | 0        | 1        | 1       |
| 2         | 1        | 0        | 2       |
| 3         | 1        | 1        | 3       |
| 4         | 0        | 0        | 0 (recycle) |

> [!recall] A 4-bit ripple counter uses JK flip-flops with tpd = 8 ns each. What is the maximum operating frequency? If you double the bit width to 8 bits, what happens to f_max? What architectural change would fix this?

## See Also

- [[counter-types-and-modulus|Counter Types and Modulus]] — overview of counter classifications
- [[synchronous-counter|Synchronous Counter]] — all FFs share CLK; eliminates ripple delay
- [[t-flip-flop|T Flip-Flop]] — toggle mode flip-flop used in each counter stage
- [[propagation-delay-limits-digital-circuit-speed|Propagation Delay]] — the per-gate delay that accumulates in ripple counters
