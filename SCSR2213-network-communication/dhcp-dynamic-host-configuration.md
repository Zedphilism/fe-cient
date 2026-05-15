---
title: "DHCP: Dynamic Host Configuration"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# DHCP: Dynamic Host Configuration

DHCP (Dynamic Host Configuration Protocol) is a client-server application-layer protocol that automatically provides a host with an IP address, subnet mask, default gateway, and DNS server address when it joins a network, using a four-step broadcast exchange over UDP.

> [!concept] Core Claim
> DHCP eliminates manual IP configuration by letting a server dynamically assign addresses from a pool — addresses are leased, not permanent, so they return to the pool when devices leave.

## Explanation

When a host connects to a network, it has no IP address and doesn't know the DHCP server's address. DHCP uses **broadcast messages** to bootstrap the process. The four-step exchange (sometimes called DORA) is:

1. **DHCP Discover** — The client broadcasts `255.255.255.255` (UDP port 67) on the local subnet: "Is there a DHCP server? I need an IP address." Source IP = `0.0.0.0` (no address yet).

2. **DHCP Offer** — The DHCP server replies with a broadcast offer: "I propose IP address `192.168.1.42`, subnet mask `/24`, default gateway `192.168.1.1`, DNS server `8.8.8.8`, lease time 86400s." The offer is broadcast because the client still has no IP.

3. **DHCP Request** — The client broadcasts a request: "I'd like to accept the offered address `192.168.1.42`." Broadcast is used again so other DHCP servers (if multiple responded) know their offer was declined.

4. **DHCP ACK** — The server confirms with a broadcast ACK, officially binding the address to the client's MAC address for the lease duration.

DHCP also provides the **default gateway** (the router for off-subnet traffic) and **DNS server** addresses, making it a complete network configuration service. Addresses are leased for a fixed period; clients renew before expiry. DHCP servers can be on the local subnet or reached via a **DHCP relay agent** (a router that forwards DHCP broadcasts to a remote server).

## Key Points

- 4-step DORA: Discover → Offer → Request → ACK
- Client uses source IP `0.0.0.0`; broadcasts to `255.255.255.255`
- UDP: client port 68, server port 67
- Server provides: IP address, subnet mask, default gateway, DNS server, lease time
- Addresses are leased, not permanent; client renews before expiry
- DHCP relay: router forwards DHCP broadcasts to a remote server

## Example

A laptop joins a café Wi-Fi. It broadcasts DHCP Discover on the local subnet. The router (acting as DHCP server) offers `10.0.0.55/24`, gateway `10.0.0.1`, DNS `8.8.8.8`, lease 1 hour. The laptop accepts, receives ACK, and is now fully configured — all in milliseconds, without any user input.

> [!recall] Why does DHCP use broadcast messages for all four steps rather than unicast?

## See Also

- [[ipv4-addressing-and-subnets|IPv4 Addresses Identify Interfaces and Are Grouped into Subnets]]
- [[nat-network-address-translation|NAT Maps Many Private Addresses to One Public IP Using Port Numbers]]
- [[dns-hierarchy-and-resolution|DNS Translates Hostnames to IP Addresses via a Distributed Hierarchy of Name Servers]]
