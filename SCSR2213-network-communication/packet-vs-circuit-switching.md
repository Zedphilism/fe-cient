---
title: "Packet Switching vs Circuit Switching"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# Packet Switching vs Circuit Switching

Packet switching allows more users to share a link than circuit switching because it only uses bandwidth when there is actual data to send, exploiting the bursty nature of most network traffic.

## Explanation

Circuit switching reserves resources regardless of actual use, which makes it inefficient for data traffic. Most application data (web, email, file transfer) is **bursty** — users send in short bursts with long idle periods. Packet switching exploits this by sharing capacity on demand.

**Classic comparison example:**
- 1 Mbps link
- Each user is active 10% of the time at 100 kbps when active

With **circuit switching**: each user needs 100 kbps reserved → only **10 users** can be supported on the 1 Mbps link.

With **packet switching**: with 35 users, the probability that more than 10 are simultaneously active is less than 0.0004 (< 0.04%). So 35 users can share the same 1 Mbps link with essentially the same quality of service — a 3.5× improvement.

The trade-off is that packet switching does **not guarantee** performance. Under heavy load, packets may experience variable delays or be dropped. Audio and video applications that need consistent, low-latency delivery struggle with this.

| Property | Circuit Switching | Packet Switching |
|----------|-------------------|-----------------|
| Resources | Dedicated/reserved | Shared/on-demand |
| Setup | Requires call setup | No setup needed |
| Guarantees | Bandwidth & QoS | None |
| Efficiency on bursty data | Poor | Good |
| Fault tolerance | Single path | Multiple possible paths |
| Used in | Telephone (PSTN) | Internet |

## Key Points

- Packet switching is better for bursty data traffic (web, email, files)
- Circuit switching guarantees QoS — needed for real-time voice/video
- Packet switching allows statistical multiplexing — more users per link
- Congestion is possible with packet switching; protocols manage this

## Example

With 35 users on a 1 Mbps packet-switched link (each active 10% at 100 kbps):
- Expected simultaneous active users = 35 × 0.1 = 3.5 users
- Probability > 10 active simultaneously ≈ 0.0004
- So the link is almost never congested — 35 users get the experience of 10 dedicated users

## See Also

- [[packet-switching-store-and-forward|Packet Switching Forwards Data in Chunks Using Store-and-Forward]] — how packet switching works
- [[circuit-switching-fdm-tdm|Circuit Switching Reserves Dedicated Resources Using FDM or TDM]] — how circuit switching works
- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Each Router]] — the cost of packet switching congestion
