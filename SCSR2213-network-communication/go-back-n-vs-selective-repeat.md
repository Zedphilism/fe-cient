---
title: "Go-Back-N and Selective Repeat"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Go-Back-N and Selective Repeat

Go-Back-N (GBN) retransmits an entire window of packets after a loss, while Selective Repeat (SR) retransmits only the specific lost or corrupted packet, trading sender simplicity for receiver complexity.

> [!concept] Core Claim
> Both GBN and SR use sliding windows to pipeline multiple in-flight packets; they differ in how aggressively they retransmit on a loss event — GBN wastes bandwidth, SR wastes buffer space.

## Explanation

In **Go-Back-N**, the sender maintains a window of up to N unacknowledged packets. The receiver uses **cumulative ACKs**: it only acknowledges in-order packets. If packet k is lost, the receiver discards all subsequent packets (k+1, k+2, …) and sends repeated ACKs for the last correctly received packet. When the sender's timer for packet k expires, it retransmits packet k and all packets up to the end of the window. The receiver needs no buffer — out-of-order packets are thrown away.

In **Selective Repeat**, the receiver buffers out-of-order packets and sends **individual ACKs** for each correctly received packet, even if earlier packets are missing. The sender only retransmits the specific unacknowledged packet when its timer expires. This dramatically reduces unnecessary retransmissions on lossy links, but the receiver must maintain a buffer of size N for out-of-order packets.

A crucial constraint: the window size N must be ≤ 2^(n-1) for SR (where n is the number of bits in the sequence number field) to avoid ambiguity between old and new packets. For GBN, the window size must be ≤ 2^n − 1.

TCP uses a hybrid approach closer to Selective Repeat: receivers buffer out-of-order segments, and fast retransmit allows the sender to retransmit a specific segment on receiving three duplicate ACKs, without waiting for a timeout.

## Key Points

- GBN: window size N, cumulative ACKs, receiver discards out-of-order packets
- GBN: on loss/timeout, retransmit all N packets in window — wastes bandwidth
- SR: individual ACKs, receiver buffers out-of-order packets
- SR: retransmits only the lost packet — wastes buffer instead of bandwidth
- SR window size constraint: N ≤ 2^(n-1) to prevent sequence number ambiguity

## Example

A GBN window of size 4 is in flight: packets 0, 1, 2, 3. Packet 1 is lost. The receiver discards packets 2 and 3 (already received!) and ACKs packet 0 repeatedly. The sender retransmits 1, 2, 3. With SR, the receiver buffers 2 and 3, and the sender retransmits only packet 1 — then delivers 1, 2, 3 in order.

> [!recall] Why must Selective Repeat's window size be at most half the sequence number space?

## See Also

- [[reliable-data-transfer-principles|Reliable Data Transfer Builds Correctness on Top of an Unreliable Channel]]
- [[tcp-fast-retransmit|TCP Fast Retransmit Uses Duplicate ACKs to Retransmit Before Timeout]]
- [[tcp-segment-structure|TCP Segment Header Carries Sequence Numbers, ACKs, and Control Flags]]
