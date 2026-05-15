---
title: "Principles of Reliable Data Transfer"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Principles of Reliable Data Transfer

Reliable data transfer (rdt) protocols use acknowledgements, negative acknowledgements, sequence numbers, and timeouts to guarantee that data is delivered correctly and in order, even when the underlying channel can corrupt or lose packets.

> [!concept] Core Claim
> Because IP provides best-effort delivery, the transport layer must implement its own mechanisms — ACKs, sequence numbers, and retransmission — to make communication reliable.

## Explanation

Reliable data transfer is studied through a progression of protocol models (rdt 1.0 → rdt 3.0) that incrementally introduce the mechanisms needed to handle real network impairments.

**rdt 1.0** assumes a perfectly reliable channel — no errors, no loss. The sender simply sends; the receiver simply receives. This is unrealistic but establishes the baseline.

**rdt 2.0** adds error detection via checksums and introduces ACK/NAK feedback. If the receiver detects a corrupted packet, it sends a NAK and the sender retransmits. If correct, it sends an ACK. The flaw: if the ACK/NAK itself is corrupted, the sender doesn't know whether to retransmit. **rdt 2.1** fixes this by adding 1-bit sequence numbers (0 or 1) so the receiver can detect a duplicate retransmission. **rdt 2.2** eliminates NAKs: a duplicate ACK for packet 0 means "packet 1 was bad," making the protocol NAK-free.

**rdt 3.0** adds loss handling with a countdown timer. If the sender doesn't receive an ACK within the timeout period, it retransmits. Combined with sequence numbers, this handles both corruption and loss. The limitation is efficiency: the sender must wait for an ACK before sending the next packet (stop-and-wait), leaving the channel largely idle on high-bandwidth-delay-product links.

This stop-and-wait limitation motivates pipelining, where multiple unacknowledged packets are in flight simultaneously. Two pipelined reliable-transfer protocols — Go-Back-N and Selective Repeat — extend rdt 3.0 to high-throughput environments.

## Key Points

- rdt 1.0: perfect channel — no mechanisms needed
- rdt 2.x: error detection (checksum) + ACK/NAK + sequence numbers
- rdt 3.0: adds timer for loss detection → retransmit on timeout
- Stop-and-wait: one packet in flight at a time — inefficient on long links
- Pipelining: multiple packets in flight → requires buffering and windowing

## Example

On a link with RTT = 30 ms and bandwidth = 1 Gbps, a 1500-byte packet takes just 0.012 ms to transmit. Stop-and-wait keeps the link busy only 0.012 / 30 ≈ 0.04% of the time. Pipelining with a window of 1000 packets raises utilisation to near 100%.

> [!recall] What two problems does rdt 3.0 handle that rdt 2.2 cannot, and what mechanism addresses each?

## See Also

- [[go-back-n-vs-selective-repeat|Go-Back-N and Selective Repeat Are Pipelined Protocols with Different Retransmission Strategies]]
- [[tcp-rtt-estimation-and-timeout|TCP Estimates RTT with EWMA to Set a Dynamic Retransmission Timeout]]
- [[udp-connectionless-transport|UDP Provides Bare-Bones Transport with No Delivery Guarantees]]
