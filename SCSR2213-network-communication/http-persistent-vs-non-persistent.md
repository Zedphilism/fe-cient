---
title: "HTTP: Persistent vs Non-Persistent Connections"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# HTTP: Persistent vs Non-Persistent Connections

HTTP has two connection modes: non-persistent (HTTP/1.0) opens and closes a TCP connection for each object, costing 2 RTTs per object; persistent (HTTP/1.1) keeps the connection open for multiple objects, reducing overhead to as little as 1 RTT for all subsequent objects.

## Explanation

Because HTTP runs over TCP, a TCP connection must be established before any HTTP data can flow. The time for a small packet to travel from client to server and back is one **RTT (Round-Trip Time)**. Connection mode determines how many TCP connections are used.

**Non-Persistent HTTP (HTTP/1.0):**
- Step 1: Client sends TCP SYN to server → 1 RTT to establish connection
- Step 2: Client sends HTTP GET; server responds with the object → 1 RTT + file transmission time
- Total per object: **2 RTT + file transmission time**
- For a page with 10 images: 10 × (2 RTT + transmission time) connections → very costly

Additionally, each TCP connection has OS overhead (buffers, sockets), and browsers often open multiple parallel TCP connections to fetch images simultaneously.

**Persistent HTTP (HTTP/1.1):**
- Server keeps the TCP connection open after sending a response
- Subsequent GET requests for other objects on the same server are sent over the same open connection
- Requests can be **pipelined**: client sends multiple GETs without waiting for each response
- Cost for the first object: 2 RTT (1 for TCP, 1 for HTTP); subsequent objects: as little as **1 RTT each**
- This roughly halves the total response time compared to non-persistent HTTP

**HTTP/2 (RFC 7540):** Extends HTTP/1.1 by allowing the server to choose transmission order of requested objects (not just FCFS), dividing objects into **frames** and interleaving them to avoid **Head-of-Line (HOL) blocking** — where a large object blocks smaller objects behind it.

**HTTP/3:** Adds per-object error control and security over UDP (via QUIC protocol), avoiding TCP's all-or-nothing retransmission that stalls all streams when one packet is lost.

## Key Points

- Non-persistent: 2 RTT per object + transmission time; new TCP connection each time
- Persistent (HTTP/1.1): keeps connection open; pipelining; ~1 RTT for subsequent objects
- HOL blocking: small objects stuck behind large ones in HTTP/1.1 FCFS ordering
- HTTP/2: frame interleaving solves HOL blocking within one TCP connection
- HTTP/3: uses QUIC over UDP; per-object congestion and error control

## Example

Page with 1 HTML base file + 10 JPEG images, RTT = 100 ms, each file ~1 ms to transmit:

**Non-persistent HTTP:**
- 11 objects × (2 × 100 ms + 1 ms) = 11 × 201 ms ≈ **2.2 seconds**

**Persistent HTTP (pipelined):**
- TCP setup: 1 RTT = 100 ms
- HTTP request for HTML: 1 RTT = 100 ms
- Pipeline all 10 images: ~1 RTT = 100 ms
- Total ≈ **~0.3 seconds** (dramatic improvement)

## See Also

- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol for Web Object Transfer]] — HTTP fundamentals
- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Every Router]] — RTT is a key timing concept
