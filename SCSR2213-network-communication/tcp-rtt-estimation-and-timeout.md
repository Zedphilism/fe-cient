---
title: "TCP RTT Estimation and Timeout"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP RTT Estimation and Timeout

TCP continuously estimates the round-trip time (RTT) using an exponentially weighted moving average (EWMA) and adds a safety margin based on RTT variance to compute a retransmission timeout (RTO) that is neither too short (causing spurious retransmits) nor too long (causing slow recovery).

> [!concept] Core Claim
> TCP's RTO must track the dynamic, variable RTT of the internet — EWMA smooths out fluctuations, while the variance term provides a buffer against spikes.

## Explanation

TCP measures **SampleRTT**: the time from sending a segment until its ACK is received. Because network conditions fluctuate, a single sample is noisy. TCP uses an **Exponentially Weighted Moving Average (EWMA)** to smooth RTT estimates:

**EstimatedRTT = (1 − α) · EstimatedRTT + α · SampleRTT**

The recommended value is α = 0.125 (⅛). This means recent samples have more influence than old ones, but the estimate doesn't overreact to individual spikes. Note: TCP does *not* sample RTT for retransmitted segments (Karn's algorithm) to avoid ambiguity about which transmission the ACK acknowledges.

Because EstimatedRTT is a smoothed average, the actual RTT may still deviate from it. TCP also tracks **DevRTT** — an EWMA of the absolute deviation between SampleRTT and EstimatedRTT:

**DevRTT = (1 − β) · DevRTT + β · |SampleRTT − EstimatedRTT|**

Recommended β = 0.25 (¼). The timeout is then:

**TimeoutInterval = EstimatedRTT + 4 · DevRTT**

On a stable network with consistent RTTs, DevRTT ≈ 0 and the timeout ≈ EstimatedRTT (tight). On a congested or variable network, DevRTT grows and the timeout expands — preventing premature retransmissions. TCP also doubles the timeout interval on each successive retransmission event (exponential backoff), stopping when an ACK is received.

## Key Points

- SampleRTT: time from segment send to ACK receipt (not measured on retransmits)
- EstimatedRTT = (1 − α) · EstimatedRTT + α · SampleRTT, α = 0.125
- DevRTT = (1 − β) · DevRTT + β · |SampleRTT − EstimatedRTT|, β = 0.25
- TimeoutInterval = EstimatedRTT + 4 · DevRTT
- Exponential backoff: timeout doubles after each retransmission event

## Example

EstimatedRTT = 100 ms, DevRTT = 10 ms → TimeoutInterval = 100 + 4×10 = 140 ms. A new sample arrives: SampleRTT = 120 ms. New EstimatedRTT = 0.875×100 + 0.125×120 = 102.5 ms. New DevRTT = 0.75×10 + 0.25×|120−100| = 12.5 ms. New TimeoutInterval = 102.5 + 4×12.5 = 152.5 ms.

> [!recall] Why does TCP use EstimatedRTT + 4·DevRTT rather than just EstimatedRTT as the timeout?

## See Also

- [[reliable-data-transfer-principles|Reliable Data Transfer Builds Correctness on Top of an Unreliable Channel]]
- [[tcp-fast-retransmit|TCP Fast Retransmit Uses Duplicate ACKs to Retransmit Before Timeout]]
- [[tcp-segment-structure|TCP Segment Header Carries Sequence Numbers, ACKs, and Control Flags]]
