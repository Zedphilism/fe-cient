---
title: "Evolution of Transport Layer Functionality"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Evolution of Transport Layer Functionality

The transport layer has evolved beyond TCP and UDP to address limitations exposed by modern applications — new protocols like QUIC move reliability and connection setup to the application layer over UDP, achieving lower latency, multiplexed streams, and better performance over lossy and mobile networks.

> [!concept] Core Claim
> TCP's design assumptions (reliable ordered delivery, head-of-line blocking, slow handshake) are increasingly mismatched to modern use cases like HTTP/3, mobile connectivity, and real-time video, driving the development of new transport-layer functionality built on top of UDP.

## Explanation

**Traditional TCP limitations that motivated evolution:**

1. **Head-of-line (HOL) blocking in HTTP/2:** HTTP/2 multiplexes many requests over one TCP connection, but a single lost TCP segment stalls ALL streams until it is retransmitted. The loss affects streams that didn't need the missing data.

2. **Connection setup overhead:** TCP requires 1 RTT for the three-way handshake + 1 RTT for TLS 1.2 = 2 RTTs before any application data flows. For short connections (e.g., a DNS lookup, a small API call), this overhead is significant.

3. **Ossification:** TCP is implemented in OS kernels. Upgrading TCP (e.g., adding new congestion control or handshake optimisations) requires OS upgrades across billions of devices — very slow in practice.

**QUIC (HTTP/3):** Developed by Google, standardised as RFC 9000. QUIC runs over UDP, implementing its own reliability, congestion control, and multiplexing in user space (so it can be updated independently of the OS). Key advantages:
- **0-RTT or 1-RTT connection setup:** on a returning connection, QUIC can send application data in the very first packet (0-RTT).
- **Stream-level reliability:** each HTTP stream has its own sequence number space — a lost packet only blocks the stream it belongs to, not all streams.
- **Connection migration:** a QUIC connection is identified by a Connection ID (not IP:port), so mobile devices can switch from Wi-Fi to cellular without dropping the connection.

**Multipath TCP (MPTCP):** allows a single TCP connection to use multiple paths (e.g., Wi-Fi + cellular simultaneously), improving throughput and resilience.

**DCCP (Datagram Congestion Control Protocol):** provides congestion control without reliability, for real-time media.

## Key Points

- TCP limitations: HOL blocking, slow handshake (1–2 RTTs), kernel-level ossification
- QUIC: UDP-based; user-space implementation; 0/1-RTT handshake; stream-level loss isolation
- QUIC = transport for HTTP/3; standardised as RFC 9000
- QUIC connection ID: enables seamless Wi-Fi ↔ cellular migration
- MPTCP: one TCP connection over multiple physical paths
- General trend: move transport intelligence to user space for faster evolution

## Example

A smartphone streams a video on HTTP/3 (QUIC) while riding a bus. When it switches from Wi-Fi to 4G, the QUIC connection continues seamlessly — the Connection ID is unchanged. If one video chunk is lost, only that stream's delivery is delayed; the audio stream continues unaffected. On HTTP/2 over TCP, the same switch would require a new TCP connection (new 3-way handshake), and the lost packet would block all streams.

> [!recall] What is head-of-line blocking in HTTP/2 over TCP, and how does QUIC address it?

## See Also

- [[congestion-control-principles|Principles of Congestion Control]]
- [[tcp-connection-oriented-transport|TCP: Connection-Oriented Transport]]
- [[udp-connectionless-transport|UDP: Connectionless Transport]]
- [[tcp-three-way-handshake|TCP: Three-Way Handshake and Close]]
