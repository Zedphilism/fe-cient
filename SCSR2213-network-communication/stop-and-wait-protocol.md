---
title: "Stop-and-Wait Protocol"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Stop-and-Wait Protocol

In a stop-and-wait protocol, the sender transmits one packet and then halts — it does not send the next packet until it receives an acknowledgement (ACK) for the one just sent, making it correct but highly inefficient on links with large bandwidth-delay products.

> [!concept] Core Claim
> Stop-and-wait is the simplest reliable-transfer mechanism: one packet in flight at any time means the sender is idle for almost the entire RTT, making link utilisation extremely low on fast or long-distance links.

## Explanation

**How it works:** the sender sends packet 0 and starts a timer. The receiver, if it receives the packet correctly, sends ACK 0. The sender receives ACK 0, stops the timer, and sends packet 1. If the timer expires before ACK 0 arrives (packet or ACK was lost), the sender retransmits packet 0.

**Sequence numbers:** stop-and-wait only needs 1-bit sequence numbers (alternating 0 and 1). This is because at any time there is at most one unacknowledged packet in flight. The sequence number lets the receiver distinguish a new packet from a retransmission of the previous one. This alternating-bit version is called the **Alternating-Bit Protocol**.

**Utilisation formula:**

```
U = (L/R) / (RTT + L/R)
```

Where L = packet size in bits, R = link rate in bps, L/R = transmission time, RTT = round-trip propagation time. The sender is only "busy" for L/R seconds out of every RTT + L/R seconds.

**Example:** 1 Gbps link, RTT = 30 ms, packet = 1000 bytes (8000 bits).
- L/R = 8000 / 10⁹ = 0.008 ms
- U = 0.008 / (30 + 0.008) ≈ 0.00027 = **0.027%**

This is catastrophically inefficient — the link is idle 99.97% of the time. This is why pipelining (Go-Back-N or Selective Repeat) exists: to keep more packets in flight and fully utilise the link.

**Stop-and-wait in the rdt series:** rdt 1.0 is stop-and-wait over a perfect channel. rdt 2.x and rdt 3.0 add error handling (checksums, ACK/NAK, sequence numbers, timers) but remain stop-and-wait — one packet in flight at a time.

## Key Points

- One packet in flight at a time; sender waits for ACK before next packet
- 1-bit sequence number (0/1 alternating) is sufficient
- Utilisation = (L/R) / (RTT + L/R) — very low for fast/long-distance links
- On 1 Gbps + 30 ms RTT: utilisation ≈ 0.027%
- Motivation for pipelining: send N packets per RTT → utilisation × N
- rdt 1.0–3.0 are stop-and-wait protocols (one packet in flight)

## Example

Sender → [PKT 0] → Receiver
Receiver → [ACK 0] → Sender
Sender → [PKT 1] → Receiver
(PKT 1 lost)
Timer expires → Sender → [PKT 1 retransmit] → Receiver
Receiver → [ACK 1] → Sender
Sender → [PKT 0] → Receiver (next, sequence wraps back to 0)

> [!recall] Calculate the link utilisation for a stop-and-wait protocol on a 1 Mbps link with RTT = 20 ms and packet size = 1000 bytes.

## See Also

- [[reliable-data-transfer-principles|Principles of Reliable Data Transfer]]
- [[rdt-1-0-to-3-0|rdt 1.0 to rdt 3.0: Detailed Process]]
- [[go-back-n-vs-selective-repeat|Go-Back-N and Selective Repeat]]
