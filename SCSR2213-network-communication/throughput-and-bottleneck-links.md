---
title: "Throughput and Bottleneck Links"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Throughput and Bottleneck Links

End-to-end throughput is the rate at which bits are successfully transferred from sender to receiver, and it equals the minimum transmission rate among all links on the path — this minimum-rate link is called the bottleneck.

## Explanation

**Throughput** is the actual delivery rate, measured in bits per second. It can be instantaneous (at a given moment) or average (over a longer period). It is always ≤ the rate of every link on the path.

For a path with links of rates R₁, R₂, ..., Rₙ:
- **Throughput = min{R₁, R₂, ..., Rₙ}**

The link with the lowest rate is the **bottleneck link** — it constrains the flow just as a narrow section constrains water flow through a pipe.

In practice, the bottleneck is almost always either the server's access link (Rs) or the client's access link (Rc), not the network core, because the core links have very high bandwidth shared among many flows.

**Time to transfer a file:**
- Transfer time = F / min{Rs, Rc}
where F is file size in bits, Rs is server upload rate, Rc is client download rate.

When multiple connections share a backbone link R, each connection gets at most R/N of that shared bandwidth, so throughput per connection = min{Rc, Rs, R/N}.

## Key Points

- Throughput = rate of bit delivery between sender and receiver
- Bottleneck link = link with lowest rate on path
- End-to-end throughput = min(R₁, R₂, ..., Rₙ)
- Transfer time of F-bit file = F / Throughput
- In practice bottleneck is usually at the access network edge, not the core

## Example

**Example 1:** F = 32 million bits, Rs = 2 Mbps, Rc = 1 Mbps
- Bottleneck = min(2 Mbps, 1 Mbps) = 1 Mbps
- Transfer time = 32 × 10⁶ / 1 × 10⁶ = **32 seconds**

**Example 2:** Rs = 2 Mbps, Rc = 1 Mbps, shared backbone R = 5 Mbps, 10 connections
- Each connection gets at most R/10 = 500 kbps from backbone
- Bottleneck = min(2 Mbps, 1 Mbps, 500 kbps) = **500 kbps**

**Example 3:** Three links R₁ = 150 kbps, R₂ = 2 Mbps, R₃ = 1 Mbps, file = 4 MB = 32 million bits
- Throughput = min(150 kbps, 2 Mbps, 1 Mbps) = **150 kbps**
- Transfer time = 32 × 10⁶ / 150,000 = **213.3 seconds**

## See Also

- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Every Router]] — delay is a different metric from throughput
- [[packet-vs-circuit-switching|Packet Switching Supports More Users Than Circuit Switching]] — how sharing affects throughput
