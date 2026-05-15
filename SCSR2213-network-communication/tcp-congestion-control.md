---
title: "TCP Congestion Control"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP Congestion Control

TCP infers network congestion from packet loss events and reacts by reducing its sending rate, using Additive Increase / Multiplicative Decrease (AIMD) to converge toward a fair allocation of bottleneck link bandwidth.

> [!concept] Core Claim
> TCP treats packet loss as a congestion signal and cuts its window multiplicatively, then probes for more bandwidth by growing linearly — this AIMD pattern makes TCP self-regulating and network-friendly.

## Explanation

TCP maintains a **congestion window (cwnd)** — the maximum number of unacknowledged bytes the sender may have in flight in addition to the flow control constraint. The sender's actual in-flight limit is `min(cwnd, rwnd)`. TCP grows and shrinks cwnd based on observed network feedback.

**Slow Start:** When a connection begins (or after a timeout), cwnd starts at 1 MSS (Maximum Segment Size, typically 1460 bytes) and doubles each RTT — exponential growth. It continues doubling until cwnd reaches the **slow start threshold (ssthresh)**, after which TCP switches to Congestion Avoidance.

**Congestion Avoidance (AIMD linear increase):** cwnd grows by 1 MSS per RTT (additive increase). This is the steady-state probing phase. On detecting congestion:
- **Timeout (severe):** ssthresh = cwnd/2, cwnd = 1 MSS → back to Slow Start. Exponential backoff of the timeout interval also applies.
- **3 duplicate ACKs (moderate, TCP Reno/CUBIC):** ssthresh = cwnd/2, cwnd = ssthresh → enter Congestion Avoidance immediately (fast recovery). No slow start needed.

The **multiplicative decrease** on loss (÷2) means TCP aggressively backs off, while additive increase ensures it cautiously probes back up. This AIMD behaviour causes cwnd to oscillate in a saw-tooth pattern around the available bandwidth — which is precisely the efficient, fair steady state.

Multiple TCP connections sharing a bottleneck link each run AIMD independently and converge to equal shares of the bandwidth over time.

## Key Points

- cwnd: sender-side congestion window (bytes); limit = min(cwnd, rwnd)
- Slow Start: cwnd doubles each RTT from 1 MSS until ssthresh
- Congestion Avoidance: cwnd += 1 MSS/RTT (linear/additive increase)
- Timeout response: cwnd → 1 MSS, ssthresh = cwnd/2 (back to slow start)
- 3 dup ACK response: cwnd = ssthresh = cwnd/2 (fast recovery, skip slow start)
- AIMD saw-tooth: efficient and fair under shared bottleneck

## Example

ssthresh = 8 MSS. Connection starts: cwnd = 1, 2, 4, 8 (slow start, doubles each RTT). At 8 MSS, switches to congestion avoidance: 9, 10, 11 … At cwnd = 12, 3 dup ACKs detected (packet loss). ssthresh = 6, cwnd = 6. Linear increase resumes: 7, 8, 9 … saw-tooth continues.

> [!recall] What is the difference between how TCP reacts to a timeout versus three duplicate ACKs, and why treat them differently?

## See Also

- [[tcp-fast-retransmit|TCP Fast Retransmit Uses Duplicate ACKs to Retransmit Before Timeout]]
- [[tcp-flow-control|TCP Flow Control Uses the Receive Window to Prevent Buffer Overflow]]
- [[throughput-and-bottleneck-links|Throughput Is Constrained by the Slowest Link — the Bottleneck — on the End-to-End Path]]
