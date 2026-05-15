---
title: "TCP Flow Control"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP Flow Control

TCP flow control is a speed-matching mechanism where the receiver advertises its available buffer space (rwnd) in every ACK, and the sender limits the amount of unacknowledged data in flight to that value, preventing the receiver's buffer from overflowing.

> [!concept] Core Claim
> Flow control protects the receiver's buffer from the sender sending too fast — it is receiver-driven, operating independently of network congestion control.

## Explanation

Each side of a TCP connection has a receive buffer — memory allocated in the OS to hold data that has arrived from the network but has not yet been read by the application. If the application is slow (perhaps doing database writes), the buffer can fill up. Without flow control, the sender would keep transmitting, new segments would be dropped by the OS, and those segments would have to be retransmitted — wasting both bandwidth and time.

TCP solves this by including the **receive window (rwnd)** in every segment header. rwnd reflects the currently free space in the receive buffer: `rwnd = RcvBuffer − (LastByteRcvd − LastByteRead)`. The sender enforces the constraint: `LastByteSent − LastByteAcked ≤ rwnd`. The sender never has more in-flight bytes than the receiver can hold.

When the receiver's buffer becomes completely full, it advertises rwnd = 0. The sender pauses. To avoid deadlock (sender stuck, receiver waiting for data to request), TCP requires the sender to periodically send 1-byte probe segments when rwnd = 0. If the receiver has freed buffer space, it will ACK the probe with a non-zero rwnd.

Flow control and **congestion control** are distinct mechanisms: flow control limits the sender based on the receiver's capacity; congestion control limits the sender based on the network's capacity. TCP uses the minimum of rwnd and cwnd (congestion window) to determine how much data may be in flight at any time.

## Key Points

- rwnd: free bytes in the receive buffer, advertised in every TCP segment header
- Sender constraint: bytes in flight ≤ rwnd
- rwnd = 0: sender pauses; uses 1-byte probes to detect buffer freeing
- Flow control ≠ congestion control (receiver vs. network capacity)
- Effective window = min(rwnd, cwnd)

## Example

A TCP receiver has a 4096-byte buffer. The application has read all data so far: rwnd = 4096. The sender transmits 3000 bytes; the app hasn't read them yet: rwnd drops to 1096. The sender can only send 1096 more bytes before pausing. When the app reads 2000 bytes, rwnd rises to 3096 and the sender resumes.

> [!recall] What happens when the receiver advertises rwnd = 0, and how does TCP avoid deadlock in this state?

## See Also

- [[tcp-segment-structure|TCP Segment Header Carries Sequence Numbers, ACKs, and Control Flags]]
- [[tcp-three-way-handshake|TCP Uses a Three-Way Handshake to Establish a Connection]]
- [[throughput-and-bottleneck-links|Throughput Is Constrained by the Slowest Link — the Bottleneck — on the End-to-End Path]]
