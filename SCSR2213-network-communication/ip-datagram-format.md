---
title: "IP Datagram Format"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# IP Datagram Format

An IPv4 datagram begins with a minimum 20-byte header containing version, header length, service type, total length, fragmentation fields, TTL, protocol, checksum, and 32-bit source and destination addresses.

> [!concept] Core Claim
> The IP header encodes everything a router needs to forward a datagram — destination address for lookup, TTL to prevent infinite loops, protocol to tell the destination how to handle the payload, and fragmentation fields to reassemble split packets.

## Explanation

The IPv4 header has these key fields:

**Version (4 bits):** IP version — 4 for IPv4, 6 for IPv6. Routers check this first.

**Header Length (4 bits):** length of the IP header in 32-bit words. Minimum is 5 (= 20 bytes). Values above 5 indicate optional fields.

**Type of Service / DSCP (8 bits):** differentiated services code point — used to mark packets for QoS (e.g., priority queuing for VoIP).

**Total Length (16 bits):** total datagram size in bytes (header + data). Maximum 65,535 bytes, though practical MTU limits it to ~1500 bytes on Ethernet.

**Identification, Flags, Fragment Offset (32 bits combined):** used for fragmentation and reassembly. If a datagram must be split to fit a smaller-MTU link, the identification field ties all fragments together, the "more fragments" flag (bit) indicates whether more fragments follow, and the fragment offset (in 8-byte units) tells the destination where to place the fragment.

**Time to Live (TTL, 8 bits):** decremented by each router. When it reaches 0, the datagram is discarded and an ICMP "time exceeded" message is sent back. Prevents infinite routing loops.

**Protocol (8 bits):** identifies the transport-layer protocol in the payload: 6 = TCP, 17 = UDP, 1 = ICMP. This is the network-layer equivalent of a port number.

**Header Checksum (16 bits):** 1s-complement sum of the header only (not the data). Recomputed at every router (because TTL changes), which is costly — IPv6 eliminates this field.

**Source and Destination IP Address (32 bits each):** identifies the sending and receiving hosts. Routers use the destination address for forwarding table lookup.

## Key Points

- Minimum header: 20 bytes (no options)
- TTL: decremented per hop; prevents routing loops; max 255
- Protocol field: 6=TCP, 17=UDP, 1=ICMP
- Fragmentation: ID (same for all fragments) + Flags (more frags?) + Offset (÷8)
- Header checksum: covers header only, not data; recomputed at every router

## Example

A packet enters a router with TTL=64. The router decrements TTL to 63, recomputes the header checksum (because TTL changed), looks up the destination IP in the forwarding table, and forwards the packet. If TTL reaches 0 at a router, the router drops the packet and sends ICMP type 11 ("time exceeded") back to the source — used by traceroute.

> [!recall] Why must a router recompute the IP header checksum for every packet it forwards?

## See Also

- [[ip-fragmentation-and-reassembly|IP Fragmentation Splits Large Datagrams to Fit Link MTU]]
- [[ipv4-addressing-and-subnets|IPv4 Addresses Identify Interfaces and Are Grouped into Subnets]]
- [[router-architecture-overview|A Router Has Input Ports, a Switching Fabric, and Output Ports]]
- [[icmp-internet-control-message-protocol|ICMP Reports Network Errors and Is Used by Ping and Traceroute]]
