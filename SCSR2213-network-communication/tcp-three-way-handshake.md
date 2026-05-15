---
title: "TCP: Three-Way Handshake and Close"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# TCP: Three-Way Handshake and Close

A TCP connection is established by exchanging three segments (SYN → SYN-ACK → ACK) that synchronise sequence numbers on both sides, and terminated by four segments (FIN → ACK, FIN → ACK) that allow each side to close independently.

> [!concept] Core Claim
> The three-way handshake is not bureaucracy — it bootstraps the shared state (sequence numbers, buffer sizes) that reliable, ordered byte-stream delivery depends on.

## Explanation

**Connection establishment (3-way handshake):**

1. **SYN** — The client sends a segment with the SYN flag set and a randomly chosen initial sequence number (ISN), e.g., client_isn = 42. This "synchronises" the server to the client's starting byte number.
2. **SYN-ACK** — The server allocates buffers, picks its own ISN (e.g., server_isn = 200), and replies with SYN+ACK. The ACK number is client_isn + 1 = 43, confirming receipt of the client's SYN.
3. **ACK** — The client sends an ACK with ACK number = server_isn + 1 = 201. At this point, both sides know each other's ISNs and the connection is established. The client may include data in this segment.

The random ISN prevents stale segments from a previous connection being misinterpreted as valid data in the new connection.

**Connection teardown (4-way close):**

1. Client sends **FIN** → signals "I'm done sending data"
2. Server sends **ACK** → acknowledges the client's FIN
3. Server sends **FIN** → signals "I'm also done sending data" (may be combined with step 2)
4. Client sends **ACK** → final acknowledgement

After sending the final ACK, the client enters **TIME_WAIT** for 2 × MSL (Maximum Segment Lifetime, typically 60–120 s). This ensures the final ACK reaches the server and that stale segments from this connection expire before a new connection reuses the same port pair.

## Key Points

- SYN: client → server, carries client ISN
- SYN-ACK: server → client, carries server ISN and ACKs client ISN+1
- ACK: client → server, ACKs server ISN+1, connection open
- Connection teardown: 4 segments (FIN, ACK, FIN, ACK) — each side closes independently
- TIME_WAIT: client waits 2×MSL after final ACK to prevent stale segment confusion

## Example

A browser connects to a web server on port 80. Client sends SYN(seq=1000). Server replies SYN-ACK(seq=5000, ack=1001). Client sends ACK(ack=5001) — possibly with the HTTP GET attached. The server now has a fully established TCP connection and begins processing the request.

> [!recall] Why does TCP use a three-way handshake rather than a two-way handshake to establish a connection?

## See Also

- [[tcp-segment-structure|TCP Segment Header Carries Sequence Numbers, ACKs, and Control Flags]]
- [[multiplexing-and-demultiplexing|Multiplexing Uses Port Numbers to Direct Segments to the Right Process]]
- [[tcp-flow-control|TCP Flow Control Uses the Receive Window to Prevent Buffer Overflow]]
