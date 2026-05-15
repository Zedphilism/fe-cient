---
title: "IP Fragmentation and Reassembly"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# IP Fragmentation and Reassembly

When an IP datagram is larger than the Maximum Transmission Unit (MTU) of a link, the router splits it into fragments, each with the same identification number, a fragment offset, and a "more fragments" flag, and the destination host reassembles them into the original datagram.

> [!concept] Core Claim
> Fragmentation lets IP work across heterogeneous links with different MTUs — the cost is increased header overhead and the complexity of reassembly at the destination.

## Explanation

Every link has a maximum frame size it can carry — the **MTU (Maximum Transmission Unit)**. Ethernet's MTU is 1500 bytes. If an IP datagram (header + data) exceeds the MTU of the next link, the router must fragment it or drop it (and send an ICMP "Destination Unreachable — Fragmentation Needed" message if the "Don't Fragment" (DF) bit is set).

When fragmenting, the router divides the data portion into chunks, each small enough that chunk + 20-byte IP header ≤ MTU. Each fragment becomes an independent IP datagram with:
- The same **Identification (ID)** number — ties all fragments of the same original datagram together
- **Fragment Offset** — the byte position of this fragment's data in the original payload, expressed in **8-byte units** (so a 1480-byte first fragment has offset 0; the next has offset 1480/8 = 185)
- **More Fragments (MF) flag** — set to 1 in all fragments except the last, which has MF=0

Reassembly happens **only at the destination host**, not at intermediate routers. The destination holds received fragments in a buffer (keyed by source IP, ID, and protocol) and waits until all fragments have arrived. It then reassembles the original datagram in offset order. If any fragment is lost, the entire datagram must be retransmitted (by the transport layer).

IPv6 does not allow intermediate fragmentation at routers. Instead, path MTU discovery (PMTUD) runs first, and the source reduces its datagram size to the path MTU before sending.

## Key Points

- MTU: max datagram size a link can carry; Ethernet MTU = 1500 bytes
- Fragmentation occurs at routers when datagram > outgoing link MTU
- ID field: same value in all fragments of one datagram
- Fragment offset: byte position ÷ 8 (must be in 8-byte units)
- MF flag: 1 = more fragments follow; 0 = this is the last fragment
- Reassembly: only at destination host, not intermediate routers
- IPv6: no router fragmentation — PMTUD required

## Example

A 4000-byte datagram (20-byte header + 3980 bytes data) enters a router with a 1500-byte MTU outgoing link. Fragment 1: 20B header + 1480B data, offset=0, MF=1. Fragment 2: 20B header + 1480B data, offset=185 (1480÷8), MF=1. Fragment 3: 20B header + 1020B data, offset=370 (2960÷8), MF=0. The destination reassembles using the ID and offsets.

> [!recall] A 3000-byte datagram (20-byte header + 2980 bytes data) needs to cross a link with MTU = 1500 bytes. How many fragments are created, and what is the offset of the second fragment?

## See Also

- [[ip-datagram-format|An IP Datagram Has a 20-Byte Header Carrying Addressing and Control Fields]]
- [[ipv4-addressing-and-subnets|IPv4 Addresses Identify Interfaces and Are Grouped into Subnets]]
- [[ipv6-addressing-and-format|IPv6 Uses 128-Bit Addresses and a Simplified Fixed-Length Header]]
