---
title: "Propagation Delay"
date: 2026-04-18
tags: [semester-3, secr1013, digital-logic, supplemental, thomas-floyd]
---

# Propagation Delay

Propagation delay (tpd) is the time that elapses between a change at a gate's input and the corresponding stable change appearing at its output — it accumulates through gate chains and directly limits how fast a circuit can operate.

> [!concept] Core Claim
> Propagation delay is the speed limit of digital logic: signals travel at finite speed through transistors, so the clock period must be long enough for the slowest signal path (the critical path) to fully settle before the next clock edge captures the result.

## Explanation

Think of propagation delay like traffic flowing through a series of toll booths: each booth (gate) takes a small amount of time to process each car (signal change), and the total journey time is the sum of all booth delays along the route. Choosing the slowest route through the city determines how long the entire trip takes — that is the critical path.

The mechanism is transistor switching time: when an input changes, the gate's output transistors must switch from conducting to non-conducting (or vice versa). Charging and discharging the capacitance at the output node takes real time — typically 1 to 50 nanoseconds in standard CMOS logic families. This delay is measured from when the input crosses its threshold to when the output crosses its threshold. Two values are specified: tpLH (input causes output to transition low-to-high) and tpHL (output transitions high-to-low) — they are often unequal because NMOS and PMOS transistors switch at different speeds.

In a combinational circuit with multiple gate levels, delays accumulate in series. The critical path is the longest total delay from any input to any output in the circuit. The circuit cannot produce a valid output until the critical path has fully settled, so the critical path delay sets the minimum valid clock period: minimum T_clk = critical path delay. Maximum operating frequency = 1 / critical path delay. Every additional gate level in the critical path directly reduces the maximum clock speed — this is why hardware designers obsess over gate-level optimization for high-performance processors.

## Key Points

- tpd = time from input change to stable output change (nanoseconds)
- Two values: tpLH (output rises) and tpHL (output falls) — often unequal
- Delays accumulate additively through series gates
- Critical path = longest delay from any input to any output
- Maximum clock frequency = 1 / critical path delay

## Example

Circuit: Input → Gate A → Gate B → Gate C → Output

```
tpd(A) = 5 ns, tpd(B) = 7 ns, tpd(C) = 3 ns

Critical path delay = 5 + 7 + 3 = 15 ns
Maximum clock frequency = 1 / 15 ns = 66.7 MHz
```

If Gate B is optimized from 7 ns to 3 ns:

```
New critical path = 5 + 3 + 3 = 11 ns
New maximum frequency = 1 / 11 ns = 90.9 MHz (36% improvement)
```

> [!recall] A 4-level combinational circuit has gate delays: 4 ns, 6 ns, 5 ns, 3 ns on the critical path. A second path has delays: 8 ns, 2 ns. Calculate the maximum operating frequency. Then explain: if you redesign the critical path to add one extra gate (3 ns) that saves 6 ns on the original last gate, is the modification worthwhile?

## See Also

- [[combinational-logic-circuits-depend-only-on-current-inputs|Combinational Logic Circuits]] — the circuit type where propagation delay accumulates and determines performance
- [[digital-waveforms-and-signal-behavior|Digital Waveforms and Signal Behavior]] — timing diagrams visualize propagation delay effects
