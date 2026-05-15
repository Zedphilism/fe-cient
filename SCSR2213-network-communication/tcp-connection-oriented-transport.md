---
title: "TCP: Connection-Oriented Transport"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP: Connection-Oriented Transport

TCP (Transmission Control Protocol) is a connection-oriented, reliable, full-duplex byte-stream transport protocol — before any data flows, both sides establish a connection and agree on initial sequence numbers, and all data is acknowledged and retransmitted if lost.

> [!concept] Core Claim
> TCP is "connection-oriented" because shared state (sequence numbers, window sizes, buffers) must be set up at both endpoints before data transfer begins — this state is what makes reliability possible.

## Explanation

**Connection-oriented** means the protocol maintains state at both sender and receiver. Before sending a single byte of application data, TCP performs a **three-way handshake** (SYN → SYN-ACK → ACK) to: (1) establish that both sides are reachable and willing to communicate; (2) exchange Initial Sequence Numbers (ISNs) so both sides know where the other's byte stream starts; (3) allocate send and receive buffers.

During data transfer, TCP provides: **reliability** via acknowledgements and retransmission; **ordering** via sequence numbers (the receiver buffers and reorders out-of-sequence segments before delivering to the application); **full-duplex** communication (data can flow in both directions simultaneously on the same connection); **byte-stream** service (the application writes bytes, not packets — TCP decides how to segment them).

TCP is defined in RFC 793 (original) and updated by many subsequent RFCs. It is the transport protocol underlying the web (HTTP/HTTPS), email (SMTP, IMAP), file transfer (FTP), and secure shell (SSH).

**Connection teardown** uses a four-way exchange (FIN → ACK, FIN → ACK) since each direction is closed independently. After the final ACK, the closing side enters TIME_WAIT (2 × MSL) to ensure delayed packets expire before the port is reused.

**TCP vs UDP at a glance:**

| Feature | TCP | UDP |
|---|---|---|
| Connection | Yes (3-way handshake) | No |
| Reliability | Yes (ACK + retransmit) | No |
| Ordering | Yes | No |
| Flow control | Yes (rwnd) | No |
| Congestion control | Yes (cwnd) | No |
| Overhead | ~20 byte header | 8 byte header |

## Key Points

- Connection-oriented: state (buffers, seq numbers) established before data transfer
- Three-way handshake: SYN → SYN-ACK → ACK
- Full-duplex: simultaneous bidirectional data flow
- Byte-stream: application sees continuous stream, not packets
- Reliability: ACKs + retransmission; ordering: seq# reordering at receiver
- Defined in RFC 793; uses IP protocol number 6

## Example

A browser and web server establish a TCP connection. The browser's OS allocates a send buffer (16 KB) and receive buffer (16 KB). The ISN=1000 is exchanged in the SYN. The server responds SYN-ACK with its ISN=5000. After ACK, the HTTP GET is sent in the first TCP segment starting at seq=1001. The server replies with HTTP 200 starting at seq=5001. Both sides acknowledge every byte received.

> [!recall] What three things does the TCP three-way handshake accomplish before data transfer begins?

## See Also

- [[tcp-three-way-handshake|TCP: Three-Way Handshake and Close]]
- [[tcp-segment-structure|TCP Segment Structure]]
- [[tcp-flow-control|TCP Flow Control]]
- [[tcp-congestion-control|TCP Congestion Control]]
- [[udp-connectionless-transport|UDP: Connectionless Transport]]
