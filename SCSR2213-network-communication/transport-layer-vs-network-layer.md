---
title: "Transport Layer vs Network Layer"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Transport Layer vs Network Layer

The transport layer provides logical communication between application processes on different hosts, extending the network layer's host-to-host delivery down to the process level.

> [!concept] Core Claim
> The network layer moves packets between hosts; the transport layer moves data between the specific processes running on those hosts.

## Explanation

The Internet has two main transport protocols: TCP and UDP. The network layer (IP) only guarantees best-effort delivery between machines — it does not distinguish between the dozens of processes that may be running on a single host. The transport layer bridges this gap. Using port numbers embedded in transport-layer segments, the OS demultiplexes incoming data to the correct process (e.g., port 80 for a web server, port 53 for DNS).

TCP (Transmission Control Protocol) provides reliable, ordered, byte-stream delivery with congestion and flow control. UDP (User Datagram Protocol) provides an unreliable, connectionless service with minimal overhead. Neither protocol makes any guarantees about timing or bandwidth — those would require network-layer support that the IP best-effort model does not offer.

From an application's perspective, the transport layer creates the illusion that the two processes are directly connected, regardless of the physical infrastructure between them. This is why the transport layer is sometimes described as providing logical end-to-end communication.

## Key Points

- Network layer: logical communication between **hosts** (IP addresses)
- Transport layer: logical communication between **processes** (port numbers)
- TCP: reliable, ordered, congestion-controlled, connection-oriented
- UDP: unreliable, connectionless, low-overhead
- Neither TCP nor UDP guarantees delay or minimum bandwidth (IP limitation)

## Example

A laptop running a browser (port 49152), a video call app (port 5004), and a background sync tool (port 8080) all share the same IP address. When a packet arrives from the network, the transport layer reads the destination port number and hands the data to the correct process — without the network layer ever needing to know which application is which.

> [!recall] What service does the network layer provide, and how does the transport layer extend it?

## See Also

- [[multiplexing-and-demultiplexing|Multiplexing Uses Port Numbers to Direct Segments to the Right Process]]
- [[udp-connectionless-transport|UDP Provides Bare-Bones Transport with No Delivery Guarantees]]
- [[tcp-segment-structure|TCP Segment Header Carries Sequence Numbers, ACKs, and Control Flags]]
