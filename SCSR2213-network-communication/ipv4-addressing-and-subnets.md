---
title: "IPv4 Addressing and Subnets"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# IPv4 Addressing and Subnets

An IPv4 address is a 32-bit number written in dotted-decimal notation that identifies a network interface; addresses are allocated in blocks called subnets, defined by a prefix (network portion) and a host portion.

> [!concept] Core Claim
> An IP address doesn't identify a device — it identifies an interface. The subnet prefix identifies which network the interface belongs to, enabling routers to aggregate routes and forward efficiently.

## Explanation

Every network interface on a device (not the device itself) has an IP address. A router with four links has four IP addresses. The 32 bits of an IPv4 address are written as four decimal octets (e.g., `192.168.1.42`), ranging from 0.0.0.0 to 255.255.255.255.

A **subnet** is a set of interfaces whose IP addresses share the same high-order bits. The **subnet mask** defines which bits are the network prefix and which are the host identifier. CIDR (Classless Inter-Domain Routing) notation writes this as `a.b.c.d/x` where x is the number of prefix bits. For example, `192.168.1.0/24` means the first 24 bits are the network prefix — this subnet can hold 2^8 − 2 = 254 hosts (subtracting the network address and broadcast address).

Historically, IP addresses were divided into **classful** ranges: Class A (/8, ~16M hosts), Class B (/16, ~65K hosts), Class C (/24, 254 hosts). This was wasteful — a company needing 300 addresses got an entire Class B (/16) of 65K. **CIDR** replaced classful addressing by allowing arbitrary prefix lengths, enabling precise allocation.

**Subnetting** divides a large block into smaller sub-blocks by borrowing bits from the host portion to extend the prefix. The more bits borrowed, the more subnets, but the fewer hosts per subnet.

Special addresses: `0.0.0.0/0` = default route (matches everything); `255.255.255.255` = broadcast to all hosts on the local subnet; `127.0.0.1` = loopback.

## Key Points

- 32-bit address; dotted-decimal; identifies an interface, not a device
- CIDR: `a.b.c.d/x` — x bits are the network prefix
- Subnet: all interfaces sharing the same /x prefix; connected without a router
- Usable hosts per /x subnet: 2^(32-x) − 2
- Classful: A=/8, B=/16, C=/24 (deprecated by CIDR)
- Subnetting: extend prefix by borrowing from host bits → more subnets, fewer hosts each

## Example

A university is given the block `200.23.16.0/20` (4096 addresses). It subdivides into 8 departments, each needing ~500 addresses. Borrow 3 bits: `/20 + 3 = /23` — each /23 gives 512 addresses (510 usable). The eight department subnets are `200.23.16.0/23`, `200.23.18.0/23`, …, `200.23.30.0/23`.

> [!recall] How many usable host addresses does a /26 subnet provide, and how many /26 subnets can you carve from a /24?

## See Also

- [[subnetting-cidr-vs-classful|CIDR Replaced Classful Addressing to Eliminate Wasteful Address Allocation]]
- [[dhcp-dynamic-host-configuration|DHCP Automatically Assigns IP Addresses to Hosts on a Network]]
- [[nat-network-address-translation|NAT Maps Many Private Addresses to One Public IP Using Port Numbers]]
