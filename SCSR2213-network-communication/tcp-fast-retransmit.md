---
title: "TCP Fast Retransmit"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP Fast Retransmit

TCP fast retransmit allows the sender to infer a lost segment from three duplicate ACKs and retransmit it immediately, without waiting for the full retransmission timeout to expire.

> [!concept] Core Claim
> Three duplicate ACKs are a strong signal that a specific segment was lost; fast retransmit acts on this signal immediately rather than waiting for a slow timeout — dramatically improving throughput on lossy links.

## Explanation

In TCP, a receiver cannot deliver out-of-order segments to the application — it must wait for the missing segment to fill the gap. However, when out-of-order segments arrive, TCP sends a duplicate ACK for the last in-order byte it received. This alerts the sender that something later in the stream may be missing.

A single duplicate ACK could just be caused by network reordering (packets arriving out of order naturally). Two could also be reordering. But **three consecutive duplicate ACKs** for the same byte offset are a reliable enough indicator of a true loss that TCP acts without waiting for the timeout.

On receiving the third duplicate ACK, TCP immediately retransmits the segment that starts at the ACK number + 1. This is fast retransmit. Because it fires long before the timeout would expire (timeouts can be hundreds of milliseconds), the sender recovers much faster.

Fast retransmit is paired with **fast recovery**: instead of dropping the congestion window (cwnd) all the way back to 1 MSS (as a timeout would), TCP halves cwnd and enters congestion avoidance directly. This preserves more of the connection's throughput after a moderate loss event. The combination of fast retransmit + fast recovery is part of TCP Reno and TCP CUBIC.

## Key Points

- Duplicate ACK: receiver re-ACKs the last in-order byte when an out-of-order segment arrives
- 3 duplicate ACKs: strong signal of a lost segment → trigger fast retransmit
- Fast retransmit: retransmit the missing segment immediately (no timeout wait)
- Fast recovery: set cwnd = cwnd/2, enter congestion avoidance (not slow start)
- Timeout still triggers slow start (cwnd → 1 MSS) — a more severe response

## Example

The sender transmits segments 1–5. Segment 3 is lost; segments 4 and 5 arrive at the receiver. The receiver sends ACK 3 (duplicate) for each of segments 4 and 5. After the third duplicate ACK (counting the original), the sender retransmits segment 3 immediately. The receiver then delivers 3, 4, 5 in sequence and sends ACK 6.

> [!recall] Why does TCP treat 3 duplicate ACKs differently from a timeout, and what does it do to the congestion window in each case?

## See Also

- [[reliable-data-transfer-principles|Reliable Data Transfer Builds Correctness on Top of an Unreliable Channel]]
- [[tcp-rtt-estimation-and-timeout|TCP Estimates RTT with EWMA to Set a Dynamic Retransmission Timeout]]
- [[go-back-n-vs-selective-repeat|Go-Back-N and Selective Repeat Are Pipelined Protocols with Different Retransmission Strategies]]
