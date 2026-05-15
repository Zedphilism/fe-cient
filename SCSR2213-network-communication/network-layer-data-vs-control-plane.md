---
title: "Data Plane vs Control Plane"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# Data Plane vs Control Plane

The network layer is divided into a data plane, which performs per-router forwarding of individual datagrams in nanoseconds, and a control plane, which computes the network-wide routing tables that determine forwarding decisions.

> [!concept] Core Claim
> Forwarding is a local, fast, per-packet operation; routing is a global, slow, per-destination computation — separating them lets each be optimized independently.

## Explanation

**The data plane** is the fast path inside each router. When a datagram arrives on an input port, the router looks up the destination IP address in its **forwarding table** (also called the FIB — Forwarding Information Base) and moves the datagram to the correct output port. This happens in hardware at line rate — nanoseconds per packet. The forwarding table is a data structure computed by the control plane and loaded into the router's hardware.

**The control plane** determines how forwarding tables are populated. It runs routing algorithms (like OSPF or BGP) to compute paths through the network and builds the routing table. The control plane operates on a timescale of milliseconds to seconds and involves communication between routers across the network. It can run either as **distributed routing** (each router runs the algorithm locally, exchanging information with neighbors) or as **centralized SDN routing** (a remote controller computes all routes and pushes forwarding rules to each router via a protocol like OpenFlow).

The **key functions** of the network layer at every router are: (1) forwarding — moving a datagram from input to output port based on the forwarding table; and (2) routing — computing paths end-to-end through the network. A third function, connection setup (virtual circuits), applies only to connection-oriented networks like ATM, not to the IP-based Internet.

## Key Points

- Data plane: per-router, per-datagram, hardware-speed forwarding using FIB
- Control plane: network-wide, algorithm-driven routing table computation
- Data plane timescale: nanoseconds; control plane timescale: milliseconds–seconds
- Two approaches to control plane: distributed (traditional) or centralized (SDN)
- Network layer key functions: forwarding (data plane) + routing (control plane)

## Example

When a router receives a packet destined for 8.8.8.8, the data plane looks up 8.8.8.8 in the TCAM forwarding table (nanoseconds) and forwards the packet to output port 3. The entry in that forwarding table was placed there by the OSPF routing daemon in the control plane — which took hundreds of milliseconds to converge when the network topology last changed.

> [!recall] What is the difference between routing and forwarding, and which network layer plane performs each?

## See Also

- [[router-architecture-overview|A Router Has Input Ports, a Switching Fabric, and Output Ports]]
- [[link-state-routing-dijkstra|Link-State Routing Uses Dijkstra's Algorithm on a Global Topology Map]]
- [[sdn-control-plane|SDN Separates the Control Plane from Data Plane Hardware]]
