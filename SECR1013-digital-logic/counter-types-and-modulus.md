---
title: "Counter Types and Modulus"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Counter Types and Modulus

A counter is a sequential circuit that cycles through a prescribed sequence of binary states with each clock pulse; its modulus is the total number of states in the sequence before it recycles.

> [!concept] Core Claim
> A counter's modulus (MOD-n) defines how many states it visits before wrapping back to 0; an n-bit counter has a maximum modulus of 2ⁿ and can be truncated to any smaller modulus.

## Explanation

Think of a counter as an odometer: each click of the wheel advances the count by one, and after reaching the maximum, it wraps back to zero. The key design dimensions are: count direction (up, down, or up-down), synchronous vs asynchronous clocking, and modulus (how many states before recycling).

The modulus determines counting range. An n-bit counter using n flip-flops has 2ⁿ maximum states (MOD-2ⁿ). A 2-bit counter is MOD-4 (counts 0,1,2,3,0,1,...); a 4-bit counter is MOD-16 (counts 0–15). When a full MOD-2ⁿ counter is designed to stop early — say MOD-10 — it is called a truncated counter. Truncation is achieved by decoding the target state and forcing all flip-flops to clear asynchronously.

The two major architecture types are asynchronous (ripple) counters, where each flip-flop clocks the next — simple but slow — and synchronous counters, where all flip-flops share one clock — faster and easier to analyse timing for.

## Key Points

- Modulus = number of unique states in the count sequence
- n-bit counter: max MOD = 2ⁿ
- Truncated counter: MOD < 2ⁿ, achieved by forced early reset
- Up counter: 0 → 2ⁿ⁻¹ → 0; Down counter: 2ⁿ⁻¹ → 0 → 2ⁿ⁻¹
- State diagram shows the cyclic sequence of states

## Example

MOD-6 counter using 3 bits: counts 000 → 001 → 010 → 011 → 100 → 101 → (reset to 000). States 110 and 111 are skipped. Six states, three flip-flops — a classic BCD hour counter in a clock circuit.

> [!recall] You need a counter that counts seconds from 0 to 59 (60 states). What is the minimum number of flip-flops required? What is the natural modulus of that many FFs, and how must you truncate it?

## See Also

- [[asynchronous-ripple-counter|Asynchronous Ripple Counter]] — simplest architecture; each FF clocks the next
- [[synchronous-counter|Synchronous Counter]] — all FFs share one clock; faster and timing-clean
- [[truncated-modulus-counter|Truncated-Modulus Counter]] — MOD < 2ⁿ using NAND decode and CLR
- [[t-flip-flop|T Flip-Flop]] — the FF used in toggle-mode counter stages
