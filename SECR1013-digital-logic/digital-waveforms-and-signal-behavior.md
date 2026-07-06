---
title: "Digital Waveforms and Signal Behavior"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic]
---

# Digital Waveforms and Signal Behavior

A digital waveform is the graphical record of a binary signal over time — a rectangular wave that shows exactly when the signal is HIGH, when it is LOW, and the edges where transitions occur.

> [!concept] Core Claim
> Digital waveforms are defined by four parameters: period, frequency, rise/fall edges, and duty cycle — together they fully characterize a periodic clock or data signal and determine whether the circuit it drives will work correctly.

## Explanation

Think of a digital waveform as a flip book where each page is either all black (HIGH) or all white (LOW): the story unfolds as the pages flip, but every single page is one of only two states. The timing between page flips — how long you hold each page — is the waveform's duty cycle and period.

A digital waveform consists of flat horizontal segments at HIGH or LOW voltage connected by transitions called edges. A rising edge marks the LOW-to-HIGH transition; a falling edge marks the HIGH-to-LOW transition. In ideal analysis edges are instantaneous, but in real silicon they have finite rise time and fall time — the time it takes the voltage to swing from 10% to 90% of its full range. These real-world edge times limit the maximum operating frequency of a circuit.

The two types of waveforms are periodic and non-periodic. A periodic waveform repeats the same pattern with a fixed period T (measured in seconds). Its frequency f = 1/T (measured in hertz) tells you how many complete cycles occur per second — a 1 MHz clock completes one million cycles per second with T = 1 μs. Clock signals are always periodic: they are the heartbeat that tells every flip-flop in the system when to read its input and update its output. Non-periodic waveforms carry irregular data — address lines, data buses, and control signals change on demand rather than on a fixed schedule.

## Key Points

- Rising edge: LOW → HIGH transition
- Falling edge: HIGH → LOW transition
- Period (T): duration of one complete cycle (seconds)
- Frequency (f): cycles per second; f = 1/T (hertz)
- Periodic waveforms: fixed repeating pattern (clocks, PWM)
- Non-periodic waveforms: irregular pattern (data lines, control signals)

## Example

A clock signal running at 1 kHz:

```
f = 1,000 Hz  →  T = 1/1,000 = 1 ms

HIGH --|‾‾‾|   |‾‾‾|   |‾‾‾|
       |   |   |   |   |   |
LOW  --|   |___|   |___|   |___
       0   0.5 1   1.5 2   2.5  (ms)

Rising edges at: 0 ms, 1 ms, 2 ms ...
Falling edges at: 0.5 ms, 1.5 ms, 2.5 ms ...
```

A processor at 3 GHz: T = 1 / 3,000,000,000 = 0.333 ns per clock cycle.

> [!recall] A digital clock signal has period T = 4 μs. Calculate its frequency. If the signal is HIGH for 1 μs of every cycle, what is its duty cycle, and what would happen to power consumption in a PWM-driven motor if you doubled the frequency while keeping the duty cycle the same?

## See Also

- [[duty-cycle-concept|Duty Cycle]] — the proportion of each period that the signal is HIGH
- [[timing-diagrams|Timing Diagrams]] — multiple waveforms drawn together to show inter-signal relationships
