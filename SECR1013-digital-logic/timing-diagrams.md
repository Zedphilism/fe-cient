---
title: "Timing Diagrams"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Timing Diagrams

A timing diagram plots the HIGH/LOW state of multiple digital signals on a shared time axis, making cause-and-effect relationships between signals visible at a glance.

> [!concept] Core Claim
> A timing diagram is the multi-signal version of a waveform plot: by aligning all signals on the same time axis, it reveals which signal changes cause which responses — indispensable for sequential circuit analysis and IC timing verification.

## Explanation

Think of a timing diagram as a conductor's score: each instrument (signal) has its own staff (row), but they all share the same time axis so you can see which note triggers which response at exactly what moment. Reading down a vertical line at any point in time shows the complete state of every signal simultaneously.

In a digital system, many signals operate concurrently and dependently. A clock edge triggers a flip-flop, which changes its output, which enables a logic gate, which changes a bus line. None of these relationships are visible from a single waveform — you need all signals aligned in time to trace the chain. A timing diagram provides exactly this: each signal row shows HIGH as a raised line and LOW as a depressed line, with vertical transitions marking edges.

Timing diagrams have two critical uses. The first is analysis: engineers use them to verify that a data signal is stable before the clock edge that captures it (setup time requirement), that signals don't glitch at the wrong moment, and that sequential state machines transition in the correct order. The second is specification: IC datasheets define every timing requirement — minimum pulse width, setup time, hold time, propagation delay — using timing diagrams, making them the universal language of hardware timing across the industry.

## Key Points

- Each signal gets its own horizontal row; all rows share one time axis
- Reading down a vertical line = the complete logic state at that instant
- Critical analysis uses: clock-to-output delay, setup/hold time, glitch detection, state sequencing
- Standard format in datasheets for specifying timing requirements (setup, hold, propagation delay)

## Example

D flip-flop with CLK, data input D, and output Q:

```
Time:  0    1    2    3    4    5  (arbitrary units)

CLK:   _____|    |____|    |____
       Lo   Hi   Lo   Hi   Lo

D:     __________||________|
       Lo         Hi       Lo

Q:          |____|         |____
       Lo    Hi   Lo        Hi
```

Reading the diagram:
- At t=1: rising CLK edge captures D=1 → Q goes HIGH
- At t=3: rising CLK edge captures D=0 → Q returns LOW
- Q always updates exactly one clock edge after D changes — the diagram makes this one-cycle latency visible immediately

> [!recall] A designer draws a timing diagram and notices that the data signal D changes at the same instant as the rising CLK edge. Explain why this is dangerous, what timing parameter defines the minimum required gap between them, and what the circuit will likely do if this constraint is violated.

## See Also

- [[digital-waveforms-and-signal-behavior|Digital Waveforms and Signal Behavior]] — individual waveform properties shown in each row
- [[duty-cycle-concept|Duty Cycle]] — a measurable property directly visible on a timing diagram
