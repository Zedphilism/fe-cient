---
title: "NAT: Network Address Translation"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# NAT: Network Address Translation

Network Address Translation (NAT) allows an entire home or office network of devices with private IP addresses to share a single ISP-assigned public IP address by using a translation table that maps (private IP, port) pairs to (public IP, new port) pairs.

> [!concept] Core Claim
> NAT hides an entire network behind one public IP address by transparently rewriting IP and port fields on every packet — effectively multiplexing many connections through a single address using port numbers as identifiers.

## Explanation

The IPv4 address space (4.3 billion addresses) is nearly exhausted. Three private address ranges were reserved for internal use and are not routable on the public Internet: `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. A NAT router sits at the boundary between a private network and the Internet, holding one public IP address from the ISP.

When a host inside the network (`192.168.1.5:3345`) sends a packet to a server on the Internet (`128.119.40.186:80`), the NAT router intercepts the packet and rewrites the source address and port in its **NAT translation table**: `192.168.1.5:3345 → 138.76.29.7:5001` (where `138.76.29.7` is the NAT router's public IP). The server sees the packet as coming from `138.76.29.7:5001` — it has no idea about the private network.

When the server responds to `138.76.29.7:5001`, the NAT router looks up port 5001 in its table, translates the destination back to `192.168.1.5:3345`, and forwards the packet internally.

NAT is controversial: it violates the end-to-end principle of the Internet (routers should only examine IP headers, not rewrite them), it prevents incoming connections to private hosts without explicit port forwarding, and it makes peer-to-peer applications like VoIP and gaming more complex (requiring NAT traversal techniques). NAT is primarily a workaround for IPv4 address exhaustion — IPv6 eliminates the need for it.

## Key Points

- Private ranges (not routable): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- NAT table: maps (private IP, port) ↔ (public IP, new port)
- Outbound: rewrite source IP+port to public IP+new port
- Inbound: look up port in NAT table, rewrite destination back to private IP+port
- Enables ~65,535 simultaneous connections through one public IP
- Issues: breaks end-to-end, complicates P2P, prevents unsolicited inbound connections

## Example

A home has three devices: laptop (192.168.0.2), phone (192.168.0.3), tablet (192.168.0.4), all behind a router with public IP 203.0.113.5. All three browse simultaneously. NAT assigns ports 10001, 10002, 10003 to their respective connections in its table. Three separate TCP connections appear on the Internet as originating from 203.0.113.5 — the servers never know there are three separate devices.

> [!recall] What happens when an external server tries to initiate a connection to a host inside a NAT network, and why is this a problem?

## See Also

- [[ipv4-addressing-and-subnets|IPv4 Addresses Identify Interfaces and Are Grouped into Subnets]]
- [[dhcp-dynamic-host-configuration|DHCP Automatically Assigns IP Addresses to Hosts on a Network]]
- [[ipv6-addressing-and-format|IPv6 Uses 128-Bit Addresses and a Simplified Fixed-Length Header]]
