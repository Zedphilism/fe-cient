---
title: "Router Architecture"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Router Architecture

A router consists of input ports that perform line-termination and lookup, a switching fabric that moves datagrams from input to output, and output ports that queue and transmit datagrams — all operating independently at hardware speed.

> [!concept] Core Claim
> The router's key architectural challenge is to look up a destination in the forwarding table and switch the datagram to the right output port fast enough to keep up with line-rate input traffic.

## Explanation

**Input ports** perform three functions: physical-layer bit reception (line termination), data-link-layer frame processing, and — most critically — a forwarding table lookup to determine the correct output port. To avoid the routing processor being a bottleneck, modern routers use **shadow copies** of the forwarding table stored in each input port's memory. Lookup uses TCAM (Ternary Content-Addressable Memory), which can match thousands of prefixes in a single clock cycle using **longest prefix matching**.

**The switching fabric** connects input ports to output ports and is the heart of the router. Three architectures exist: (1) **Switching via memory** — the oldest design, where the routing processor copies the datagram from input to output via main memory; limited to memory bus bandwidth. (2) **Switching via a bus** — a shared bus connects all ports; only one datagram can traverse the bus at a time; bus bandwidth is the bottleneck. (3) **Switching via a crossbar (interconnection network)** — a non-blocking NxN crossbar allows up to N datagrams to be switched simultaneously. Modern high-capacity routers use crossbar or multi-stage crossbar fabrics.

**Output ports** buffer datagrams waiting to be transmitted onto the outgoing link. When the fabric delivers packets faster than the link can transmit them, output queues form. If the queue grows beyond the port's buffer, packets are dropped — this is **tail-drop** (or, with AQM, random early detection). **Head-of-Line (HOL) blocking** can also occur at input ports in crossbar routers: a datagram at the head of an input queue destined for a busy output port blocks all datagrams behind it, even those destined for free output ports.

## Key Points

- Input ports: line termination + forwarding table lookup (TCAM, shadow copy)
- Longest prefix matching: select the most specific matching prefix in the table
- Switching fabric types: memory (slow), bus (shared bottleneck), crossbar (parallel)
- Output ports: queue, schedule, and transmit datagrams onto outgoing link
- HOL blocking: input-queued crossbar routers; head packet blocks queue behind it
- Packet loss: output port buffer overflow → tail-drop or AQM (RED)

## Example

A router with 40 Gbps input ports and a crossbar fabric can switch up to 40 packets in parallel. However, if 5 input ports all have datagrams destined for the same output port simultaneously, only 1 can be switched at a time — 4 wait. The head of the other queues may also stall (HOL blocking) even if their destinations are free.

> [!recall] What is HOL blocking and in which type of switching fabric does it occur?

## See Also

- [[network-layer-data-vs-control-plane|The Network Layer Has Two Planes — Data Plane Forwards, Control Plane Routes]]
- [[ip-datagram-format|An IP Datagram Has a 20-Byte Header Carrying Addressing and Control Fields]]
- [[four-sources-of-packet-delay|Packets Experience Four Types of Delay at Every Router Along Their Path]]
