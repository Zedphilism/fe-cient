---
title: "D Flip-Flop"
date: 2026-04-26
tags: [semester-3, secr1013, digital-logic]
---

# D Flip-Flop

The D flip-flop captures the value of a single data input D at the active clock edge and holds it at output Q until the next active edge, making it the standard building block for registers, pipelines, and all forms of synchronous data storage.

> [!concept] Core Claim
> On the active clock edge, Q becomes D; between edges, Q holds its value and D is ignored — Q "follows D" one clock cycle behind.

## Explanation

Think of the D flip-flop as a post office box: the mail (data on D) is only collected at a specific pickup time (clock edge). Whatever letter is in the slot at collection time goes into the box and stays there until the next collection — even if the sender swaps letters ten times in between.

The mechanism extends the gated D latch: Q follows D while EN is HIGH, but if you make EN a very narrow pulse (only the clock edge), then Q only captures D at that instant. In practice, a master-slave configuration achieves edge-triggering using two latches: the master latch opens on one phase of the clock and captures D; the slave latch opens on the other phase and captures master's output. The final Q only changes at the defined edge.

The D flip-flop is the dominant flip-flop in VLSI design because of its simplicity: one data input, no invalid state, no toggle ambiguity. Every shift register, pipeline stage, state register, and synchronous counter element is essentially an array of D flip-flops. Setup time and hold time constraints apply: D must be stable for a minimum time before and after the clock edge for reliable capture.

## Key Points

| CLK ↑ | D | Q next | Comment          |
|-------|---|--------|------------------|
| ↑     | 0 | 0      | Captures D = 0   |
| ↑     | 1 | 1      | Captures D = 1   |

- Setup time (tsu): D must be stable before the clock edge
- Hold time (th): D must remain stable after the clock edge
- Q changes to D value exactly at the active edge

## Example

An 8-bit register: eight D flip-flops, all sharing one CLK and one active-low load enable (/LD). On the rising edge when /LD=0, all 8 bits of the data bus are simultaneously captured. The register holds those 8 bits stable through the next bus transactions.

> [!recall] A D flip-flop has D=1 at the rising edge, then D drops to 0 ten nanoseconds later. What is Q? Six clock cycles pass with D=0 the whole time. What is Q after those six cycles?

## See Also

- [[gated-d-latch|Gated D Latch]] — the level-sensitive version
- [[flip-flop-vs-latch|Flip-Flops vs Latches]] — why edge-triggering matters for reliability
- [[t-flip-flop|T Flip-Flop]] — the toggling variant used in counters
- [[asynchronous-inputs-preset-clear|Asynchronous Inputs PRE and CLR]] — override the clock to force a state
