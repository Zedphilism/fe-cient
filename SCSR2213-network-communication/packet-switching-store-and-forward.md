---
title: "Packet Switching: Store and Forward"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Packet Switching: Store and Forward

In packet switching, a host breaks application messages into fixed-size chunks called packets, which are forwarded independently from router to router across the network — each router must receive and store an entire packet before forwarding it onward.

## Explanation

The Internet's network core is a mesh of interconnected routers. Instead of reserving a continuous circuit between two hosts (as telephone networks do), the Internet uses **packet switching**: data is divided into packets of L bits, and each packet is transmitted at the full capacity R of each link along the path.

The key mechanism is **store-and-forward**: a router must receive all L bits of a packet before it can begin transmitting it on the outgoing link. This is because the router must verify the packet is complete and error-free before forwarding it. The delay introduced at each hop due to this process is the **transmission delay**: d_trans = L / R.

For a source sending one packet to a destination with 2 links (one intermediate router), the total end-to-end delay is:
- d_end-to-end = 2 × (L / R) (ignoring propagation delay)

Each router performs two key functions:
- **Forwarding (local):** moves a packet from an input port to the correct output port using a local forwarding table.
- **Routing (global):** a routing algorithm determines the best path from source to destination and populates forwarding tables across all routers.

When packets arrive faster than they can be transmitted, they queue in a **buffer**. If the buffer fills up, packets are **dropped (lost)** — this is packet loss.

## Key Points

- Packets = fixed-size chunks of L bits
- Store-and-forward: entire packet must arrive at router before it's forwarded
- Transmission delay per hop: d_trans = L / R
- Two core functions at each router: forwarding (local) and routing (global)
- Excess packets queue in buffers; if buffer full → packet loss

## Example

L = 7.5 Mbits, R = 1.5 Mbps, one intermediate router (2 hops):
- Transmission delay per hop = 7.5 Mbits / 1.5 Mbps = 5 seconds
- End-to-end delay = 2 × 5 = **10 seconds**

Smaller example: L = 10 Kbits, R = 100 Mbps:
- Transmission delay = 10,000 bits / 100,000,000 bps = **0.1 ms**

## See Also

- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Each Router]] — full breakdown of all delay types
- [[circuit-switching-fdm-tdm|Circuit Switching Reserves Dedicated Resources for Each Connection]] — the alternative to packet switching
- [[packet-vs-circuit-switching|Packet Switching Supports More Users Than Circuit Switching on Bursty Traffic]] — comparison
