---
title: "Asynchronous Inputs: PRE and CLR"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# Asynchronous Inputs: PRE and CLR

PRE (Preset) and CLR (Clear) are asynchronous override inputs on a flip-flop that force Q immediately to 1 or 0 respectively, without waiting for the clock edge — they have the highest priority of any flip-flop input.

> [!concept] Core Claim
> PRE and CLR bypass the clock entirely: asserting PRE immediately sets Q=1; asserting CLR immediately resets Q=0, regardless of J, K, D, T, or clock state.

## Explanation

Think of PRE and CLR as an emergency override — like a fire alarm that overrides the building's normal schedule. No matter what the clock or data inputs are doing, asserting PRE forces Q HIGH immediately, and asserting CLR forces Q LOW immediately. The normal synchronous inputs (J, K, D, T) are completely ignored while an asynchronous override is active.

On real flip-flop ICs (and in textbooks), PRE and CLR are typically active-LOW: PRE=0 presets the FF; CLR=0 clears it. Both are released to HIGH for normal (synchronous) clock operation. Asserting both PRE=0 and CLR=0 simultaneously is an invalid condition — it forces both Q=1 and Q'=1 and is undefined when released.

The priority hierarchy is: (1) Asynchronous inputs (highest) → (2) Clock edge → (3) Synchronous inputs (lowest). This hierarchy means PRE/CLR are used for system initialisation and reset — guaranteeing known state at power-on — while normal operation runs purely through the clock and synchronous inputs.

## Key Points

| PRE | CLR | Effect on Q | Priority |
|-----|-----|-------------|----------|
| 0   | 1   | Q = 1 (SET) | Immediate, overrides clock |
| 1   | 0   | Q = 0 (RST) | Immediate, overrides clock |
| 0   | 0   | Invalid     | Both Q and Q' forced to same state |
| 1   | 1   | Normal clock operation | — |

(PRE and CLR shown as active-LOW: 0 = asserted)

## Example

A microcontroller reset circuit uses CLR (active-LOW). At power-up, a capacitor holds CLR=0 for ≈100 ms while the supply voltage stabilises, forcing all flip-flops to Q=0. Once CLR releases to 1, the CPU begins fetching instructions from the reset vector address — a known, guaranteed starting state.

> [!recall] A JK flip-flop (positive edge, J=K=1) is running with CLK at 1 MHz. Mid-operation, PRE is asserted (pulled LOW). What is Q immediately? What happens when the next clock rising edge arrives while PRE is still LOW?

## See Also

- [[jk-flip-flop|JK Flip-Flop]] — the most common FF with PRE/CLR inputs
- [[d-flip-flop|D Flip-Flop]] — also includes PRE/CLR for initialisation
- [[active-low-signals-provide-fail-safe-behavior|Active-Low Signals]] — PRE and CLR are typically active-low for fail-safe reset
