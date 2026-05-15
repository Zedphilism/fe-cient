---
title: "Principles of Congestion Control"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Principles of Congestion Control

Congestion occurs when too many sources send too much data for the network to handle, causing router buffers to overflow and packets to be dropped; congestion control is the set of mechanisms used to detect congestion and reduce sending rates before (or after) this collapse.

> [!concept] Core Claim
> Congestion control is a network-wide problem — it requires senders to infer network state from indirect signals (loss, delay) and voluntarily reduce their rates, since IP provides no explicit congestion notification to the transport layer.

## Explanation

**Why congestion happens:** routers have finite buffer memory. When the arrival rate at a router's input exceeds its output capacity for long enough, the queue fills and new arrivals are dropped. This is **congestion**. Unlike flow control (which protects the receiver's buffer), congestion control protects the network's infrastructure.

**Costs of congestion:**
- Large queuing delays as router buffers fill
- Packet loss when buffers overflow (tail-drop)
- Wasted retransmissions: a sender retransmits a packet that was delayed (not lost), consuming more bandwidth and making congestion worse
- At extreme congestion (congestion collapse), throughput drops to near zero even as link utilisation is near 100% — all bandwidth wasted on retransmissions of dropped packets

**Two approaches:**

**End-to-end congestion control (TCP's approach):** the network provides no explicit congestion signal. Senders infer congestion from packet loss (timeout or 3 duplicate ACKs) and voluntarily reduce their sending rate. This is the Internet's design — IP is simple and "dumb"; intelligence is at the edges.

**Network-assisted congestion control:** routers actively participate by setting a bit (ECN — Explicit Congestion Notification) in the datagram header to warn senders before buffers actually overflow. The receiver echoes this signal to the sender via the TCP header ECE bit. ECN is supported in modern TCP/IP but not universally deployed.

**The fundamental tension:** each sender wants to use as much bandwidth as possible; but if all do simultaneously, the network collapses. Congestion control achieves a stable equilibrium by having all senders back off on loss — collectively self-regulating the Internet.

## Key Points

- Congestion: too many sources, too much data → buffer overflow → packet loss
- Costs: queuing delay, packet loss, wasted retransmissions, potential congestion collapse
- End-to-end (TCP): infer congestion from loss; no network signal needed
- Network-assisted (ECN): routers set ECN bit before buffers overflow; more proactive
- Congestion control ≠ flow control: congestion = network capacity; flow = receiver buffer
- Goal: stable fair allocation of bottleneck bandwidth among all competing flows

## Example

Without congestion control: 100 hosts each send 10 Mbps on a shared 100 Mbps link. All 100 streams arrive simultaneously, buffers overflow, all packets are dropped. Hosts retransmit, making it worse — congestion collapse. With TCP congestion control: each host reduces cwnd on loss; they collectively converge to ~1 Mbps each, fully utilising the link without collapse.

> [!recall] What is the difference between congestion control and flow control, and what signals does TCP use to detect congestion?

## See Also

- [[tcp-congestion-control|TCP Congestion Control]]
- [[tcp-flow-control|TCP Flow Control]]
- [[tcp-fast-retransmit|TCP Fast Retransmit]]
- [[transport-layer-evolution|Evolution of Transport Layer Functionality]]
