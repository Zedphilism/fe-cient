---
title: "ICMP: Internet Control Message Protocol"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# ICMP: Internet Control Message Protocol

ICMP (Internet Control Message Protocol) is a network-layer companion to IP that carries error and informational messages between routers and hosts — it cannot deliver application data but enables tools like ping and traceroute to diagnose network connectivity and path issues.

> [!concept] Core Claim
> ICMP is the network's error-reporting mechanism — when IP cannot deliver a datagram (no route, TTL expired, unreachable port), a router or host sends an ICMP message back to the source explaining why.

## Explanation

ICMP messages are carried in IP datagrams (protocol number 1). Each ICMP message has a **type** and **code** field that together identify the specific condition, plus (for error messages) the IP header and first 8 bytes of the failing datagram so the source can identify which packet caused the problem.

**Key ICMP message types:**
- **Type 0 (Echo Reply) / Type 8 (Echo Request):** used by **ping**. The sender transmits a type 8 (Echo Request) to a target host. If the target is reachable and not blocking ICMP, it returns a type 0 (Echo Reply). Round-trip time is measured.
- **Type 3 (Destination Unreachable):** sent by a router or destination host when a datagram cannot be delivered. Code field specifies the reason: code 0 = network unreachable, code 1 = host unreachable, code 3 = port unreachable (common for UDP to a closed port), code 4 = fragmentation needed but DF bit set.
- **Type 11 (Time Exceeded):** sent when a router decrements TTL to 0. This is the foundation of **traceroute**.
- **Type 12 (Parameter Problem):** malformed IP header.

**Traceroute** exploits Type 11. It sends a series of UDP datagrams to an unlikely port, starting with TTL=1. The first router decrements TTL to 0 and sends Type 11 back — revealing its identity and RTT. The next probe uses TTL=2, revealing the second router, and so on. When a probe finally reaches the destination, the destination (with no app listening on that port) sends ICMP Type 3 Code 3 (port unreachable) — signalling that the path is complete.

## Key Points

- ICMP: network-layer protocol, carried in IP datagrams (protocol = 1)
- Type 8 / Type 0: Echo Request / Echo Reply — used by ping
- Type 3: Destination Unreachable (network/host/port/fragmentation needed)
- Type 11: Time Exceeded — sent when TTL reaches 0; used by traceroute
- Traceroute: sends probes with increasing TTL; collects Type 11 replies to map the path
- ICMP carries error info only — no application data

## Example

`traceroute google.com` sends 3 UDP probes with TTL=1 → the first router returns ICMP Type 11 (revealing 10.0.0.1, RTT ~1ms). TTL=2 probes → second router replies (203.12.1.1, RTT ~8ms). This continues until the destination returns ICMP Type 3 Code 3 (port unreachable). Each line of traceroute output is one hop, with three RTT measurements.

> [!recall] How does traceroute use ICMP Type 11 and Type 3 messages to discover the path to a destination?

## See Also

- [[ip-datagram-format|An IP Datagram Has a 20-Byte Header Carrying Addressing and Control Fields]]
- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Every Router Along Their Path]]
- [[network-security-threats|The Internet's Major Security Threats Are Malware, DoS, Packet Sniffing, and IP Spoofing]]
