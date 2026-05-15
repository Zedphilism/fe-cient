---
title: "Multiplexing and Demultiplexing"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Multiplexing and Demultiplexing

Multiplexing gathers data from multiple application sockets and passes it to the network layer; demultiplexing delivers incoming segments to the correct socket using port numbers embedded in the transport-layer header.

> [!concept] Core Claim
> Port numbers are the mechanism by which one host can support many simultaneous network conversations — multiplexing on send, demultiplexing on receive.

## Explanation

Every transport-layer segment carries a source port and a destination port (each 16 bits, range 0–65535). On the sending side, the transport layer collects data from all open sockets (multiplexing) and tags each segment with the appropriate port numbers. On the receiving side, the OS reads the destination port and routes the segment to the matching socket (demultiplexing).

UDP uses a **2-tuple** for demultiplexing: only the destination IP address and destination port matter. Two segments arriving at port 9999 from different senders both go to the same socket. This is why a single UDP server socket can serve many clients simultaneously.

TCP uses a **4-tuple**: source IP, source port, destination IP, destination port. All four values must match for a segment to reach a given socket. This means each individual TCP connection has its own dedicated socket on the server, allowing the OS to distinguish between thousands of simultaneous clients even if they all connect to port 443 (HTTPS).

Port numbers 0–1023 are well-known (reserved for system services like HTTP=80, HTTPS=443, DNS=53, SMTP=25). Ephemeral ports (1024–65535) are assigned dynamically to client sockets by the OS.

## Key Points

- Source port + destination port: both 16-bit fields in every TCP/UDP segment
- UDP demultiplexing: 2-tuple (dst IP, dst port) — one socket per port
- TCP demultiplexing: 4-tuple (src IP, src port, dst IP, dst port) — one socket per connection
- Well-known ports: 0–1023 (reserved); ephemeral ports: 1024–65535 (dynamic)

## Example

A web server on port 80 receives three simultaneous HTTP connections from clients at 10.0.0.1:50001, 10.0.0.2:50001, and 10.0.0.3:50001. Although all three use the same destination port (80), TCP's 4-tuple creates three distinct sockets because the source IPs differ. The server handles all three independently without mixing up the data streams.

> [!recall] Why does TCP need a 4-tuple for demultiplexing while UDP only needs a 2-tuple?

## See Also

- [[transport-layer-vs-network-layer|The Transport Layer Extends Network Delivery from Hosts to Processes]]
- [[udp-connectionless-transport|UDP Provides Bare-Bones Transport with No Delivery Guarantees]]
- [[tcp-three-way-handshake|TCP Uses a Three-Way Handshake to Establish a Connection]]
