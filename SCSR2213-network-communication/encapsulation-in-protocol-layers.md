---
title: "Encapsulation in Protocol Layers"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Encapsulation in Protocol Layers

Encapsulation is the process by which each layer in the protocol stack adds its own header to the payload it receives from the layer above, creating a layered packet structure that is progressively unwrapped at the destination.

## Explanation

When an application sends data, that data must travel through all five layers before it is transmitted on the physical medium. At each layer, a header is prepended (and sometimes a trailer is appended) to form a new **protocol data unit (PDU)**:

- **Application layer** produces a **message** (M)
- **Transport layer** adds a TCP/UDP header → **segment** (H_t | M)
- **Network layer** adds an IP header → **datagram** (H_n | H_t | M)
- **Link layer** adds a MAC header (and trailer) → **frame** (H_l | H_n | H_t | M | T_l)
- **Physical layer** converts the frame to bits and transmits them

At intermediate routers, only the Network and Link layer headers are examined. The router strips the link-layer frame, reads the IP datagram to determine the next hop, then re-encapsulates the datagram in a new frame for the outgoing link.

At the destination host, the process reverses: **de-encapsulation** strips each header as the data moves up the stack, until the original application message is delivered.

This design means that a router does not need to understand HTTP; it only understands IP. A link-layer switch does not understand IP; it only understands MAC addresses. Each device only processes the layers it needs — the rest is opaque payload.

## Key Points

- Encapsulation: each layer adds its header (PDU wrapping)
- De-encapsulation: each layer strips its header at the receiver
- Routers process only Network + Link headers; they ignore the payload
- Switches (link-layer) process only Link headers
- PDU names: message → segment → datagram → frame → bits

## Example

Sending "Hello" over HTTP from your laptop to a web server:

```
[App]       M = HTTP message ("GET / HTTP/1.1")
[Transport] Ht | M    ← TCP header (src port 54321, dst port 80)
[Network]   Hn | Ht | M   ← IP header (src IP, dst IP)
[Link]      Hl | Hn | Ht | M   ← Ethernet header (src MAC, dst MAC)
[Physical]  10110100...  ← bits on wire
```

A router along the path reads Hn (IP header) to decide where to send the packet, then strips Hl and wraps the IP datagram in a new link frame for the next hop.

## See Also

- [[tcp-ip-internet-stack|The TCP/IP Stack Has Five Layers from Physical Bits to Application Messages]] — the layers themselves
- [[osi-model-seven-layers|The OSI Model Organises Network Communication into Seven Layers]] — conceptual model
- [[network-protocols-defined|Protocols Govern All Network Communication]] — each header implements a protocol
