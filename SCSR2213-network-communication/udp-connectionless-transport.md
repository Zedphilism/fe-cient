---
title: "UDP: Connectionless Transport"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# UDP: Connectionless Transport

UDP (User Datagram Protocol) is a connectionless transport protocol that adds only port-based multiplexing and an optional checksum on top of IP, offering no reliability, ordering, or flow control.

> [!concept] Core Claim
> UDP is the "no frills" transport — it gets data to the right process with minimum overhead, but makes no promise that the data arrives at all.

## Explanation

A UDP segment has an 8-byte header: source port (2 bytes), destination port (2 bytes), length (2 bytes), and checksum (2 bytes). Everything beyond the header is the application's data payload. There is no handshake before sending and no connection teardown afterward — each datagram is sent independently, which is why UDP is connectionless.

Because UDP skips connection setup, reliability mechanisms, and congestion control, it has significantly lower latency and overhead than TCP. Lost packets are simply lost; out-of-order packets are delivered out of order. Applications that use UDP either tolerate loss (streaming video, VoIP) or implement their own reliability at the application layer (DNS retries, QUIC).

The UDP checksum detects errors (bit flips) in the segment. The sender computes a 1s-complement sum over the header and data; the receiver recomputes it. If the values differ, the segment is discarded. Critically, the checksum only detects errors — it does not correct them or request retransmission.

DNS uses UDP (port 53) because a query–response exchange is a single round trip; TCP's three-way handshake would double the latency for no benefit. Streaming media uses UDP because stale data (a late video frame) is worse than lost data.

## Key Points

- UDP header: 8 bytes total — source port, destination port, length, checksum
- No connection establishment (no handshake)
- No reliability: no ACKs, no retransmission, no ordering
- No congestion control: sender can transmit at any rate
- Checksum: detects errors but does not correct them
- Applications: DNS (port 53), SNMP, VoIP, video streaming, online gaming

## Example

A DNS resolver sends a UDP query (port 53) asking for the IP of `example.com`. If the response is lost in the network, the resolver's application-layer timeout fires and it resends the query. This retry logic is entirely in the application — UDP itself does nothing to recover the lost datagram.

> [!recall] Why do real-time applications like VoIP prefer UDP over TCP even though UDP can lose packets?

## See Also

- [[transport-layer-vs-network-layer|The Transport Layer Extends Network Delivery from Hosts to Processes]]
- [[multiplexing-and-demultiplexing|Multiplexing Uses Port Numbers to Direct Segments to the Right Process]]
- [[reliable-data-transfer-principles|Reliable Data Transfer Builds Correctness on Top of an Unreliable Channel]]
