---
title: "IPv6: Addressing and Format"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# IPv6: Addressing and Format

IPv6 replaces IPv4's 32-bit addresses with 128-bit addresses (providing 3.4×10^38 addresses) and redesigns the IP header as a fixed 40-byte structure that removes fragmentation fields, eliminates the checksum, and adds a flow label for QoS support.

> [!concept] Core Claim
> IPv6 solves IPv4 address exhaustion with a vastly larger address space and simplifies router processing by fixing the header length, removing per-hop checksum computation, and banning intermediate fragmentation.

## Explanation

An IPv6 address is 128 bits written as eight groups of four hexadecimal digits separated by colons, e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`. Leading zeros within a group can be omitted, and one contiguous run of all-zero groups can be replaced by `::` (e.g., `2001:db8::1`). The staggering address space means every device — and every grain of sand on Earth — could have its own globally unique address.

**IPv6 header (fixed 40 bytes):**
- **Version (4 bits):** = 6
- **Traffic Class (8 bits):** analogous to IPv4 DSCP/ToS for QoS marking
- **Flow Label (20 bits):** identifies a flow (sequence of packets from same source to same dest) for special handling (e.g., low-latency routing) — a new IPv6 concept
- **Payload Length (16 bits):** length of the payload after the 40-byte header
- **Next Header (8 bits):** identifies the type of header following (TCP=6, UDP=17, ICMPv6=58, or an extension header)
- **Hop Limit (8 bits):** equivalent to IPv4 TTL — decremented each hop, discard at 0
- **Source Address (128 bits)** and **Destination Address (128 bits)**

**Key changes from IPv4:**
- **No fragmentation at routers:** routers drop oversized packets and send an ICMPv6 "Packet Too Big" message; the source uses Path MTU Discovery to determine the correct size.
- **No header checksum:** eliminated to speed up per-hop processing (transport and link layers already provide error detection).
- **No options in the base header:** options are handled via extension headers chained via the Next Header field.

**Transition — IPv6 tunneling over IPv4:** Since IPv4 and IPv6 coexist during the transition, IPv6 datagrams are encapsulated inside IPv4 datagrams (the IPv6 packet becomes the payload of an IPv4 packet) to cross IPv4-only networks. The tunnel endpoints decapsulate and re-inject the IPv6 packet.

## Key Points

- 128-bit addresses: 3.4×10^38 unique addresses — eliminates exhaustion
- Fixed 40-byte header: simplifies router processing, enables line-rate forwarding
- No fragmentation at routers — source must use Path MTU Discovery
- No header checksum — removed to speed per-hop processing
- Flow Label (20 bits): new field for QoS/traffic engineering
- Transition: tunneling encapsulates IPv6 in IPv4 to cross IPv4-only networks

## Example

A router running IPv6 processes packets without recomputing a checksum (IPv4 required this every hop because TTL changes). With a fixed 40-byte header, the router always knows where the payload starts — no header-length field needed. A 1500-byte Ethernet MTU path forces a source to send IPv6 packets ≤1460 bytes (40-byte header + 1460 bytes payload); the source discovers this via Path MTU Discovery before sending.

> [!recall] Why does IPv6 prohibit fragmentation at intermediate routers, and what mechanism does it use instead?

## See Also

- [[ip-datagram-format|An IP Datagram Has a 20-Byte Header Carrying Addressing and Control Fields]]
- [[ip-fragmentation-and-reassembly|IP Fragmentation Splits Large Datagrams to Fit Link MTU]]
- [[nat-network-address-translation|NAT Maps Many Private Addresses to One Public IP Using Port Numbers]]
