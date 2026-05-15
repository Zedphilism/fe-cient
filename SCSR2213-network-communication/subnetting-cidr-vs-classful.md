---
title: "CIDR vs Classful Addressing"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# CIDR vs Classful Addressing

Classless Inter-Domain Routing (CIDR) generalises IP address allocation by allowing any prefix length, enabling ISPs to assign address blocks that precisely match an organisation's needs rather than forcing them into oversized Class A, B, or C blocks.

> [!concept] Core Claim
> CIDR's variable-length prefixes let the global routing system aggregate millions of routes into compact entries and give organisations exactly as many addresses as they need — classful addressing could do neither.

## Explanation

Under **classful addressing** (pre-1993), the prefix length was fixed by the first few bits of the address: addresses starting 0xxx were Class A (/8, ~16M hosts), 10xx were Class B (/16, ~65K hosts), 110x were Class C (/24, 254 hosts). A startup needing 1000 addresses had to request a Class B block, wasting 64,000 addresses. This accelerated address exhaustion and bloated routing tables.

**CIDR** (RFC 1519, 1993) removes fixed class boundaries. An ISP might hold `200.0.0.0/8` and allocate sub-blocks: `200.10.0.0/20` (4096 addresses) to one customer, `200.10.16.0/22` (1024 addresses) to another. Customers get exactly what they need.

**Route aggregation (supernetting)** is CIDR's greatest benefit for routers: an ISP that holds 256 contiguous /24 blocks can advertise a single /16 entry to the rest of the Internet instead of 256 separate routes. This drastically reduces the size of global routing tables.

Longest prefix matching determines which forwarding table entry to use when multiple prefixes match a destination. For example, both `200.10.0.0/16` and `200.10.16.0/22` match destination `200.10.16.5`, but the /22 is more specific and wins.

## Key Points

- Classful: prefix forced by address value (A=/8, B=/16, C=/24) — inflexible, wasteful
- CIDR: arbitrary /x prefix length — allocate exactly the right size block
- Route aggregation: one /x covers 2^(32-x) addresses → compact routing table entries
- Longest prefix match: most specific (longest) prefix wins in forwarding table
- CIDR notation: `a.b.c.d/x` — first x bits = network, remaining 32-x bits = host

## Example

ISP has `199.31.0.0/16`. It gives company A `199.31.0.0/22` (1024 addresses) and company B `199.31.4.0/23` (512 addresses). The ISP advertises only `199.31.0.0/16` to the rest of the Internet — one BGP route covers both customers. Routers worldwide see a single /16 entry rather than two separate entries. When company A adds a subnet `199.31.0.0/24`, that more-specific route only appears inside the ISP's network.

> [!recall] How does CIDR enable route aggregation, and why does this matter for the scalability of the Internet's routing system?

## See Also

- [[ipv4-addressing-and-subnets|IPv4 Addresses Identify Interfaces and Are Grouped into Subnets]]
- [[dhcp-dynamic-host-configuration|DHCP Automatically Assigns IP Addresses to Hosts on a Network]]
- [[bgp-inter-as-routing|BGP Is the Inter-AS Routing Protocol That Connects the Internet's Autonomous Systems]]
