---
title: "OSPF: Intra-AS Routing"
date: 2026-04-19
tags: [semester-3, scsr2213, networking]
---

# OSPF: Intra-AS Routing

OSPF (Open Shortest Path First) is the standard link-state intra-AS (interior gateway) routing protocol that floods link-state advertisements directly over IP, runs Dijkstra's algorithm to compute shortest paths, and scales to large networks through hierarchical area decomposition.

> [!concept] Core Claim
> OSPF brings link-state routing into production networks by running directly over IP (not UDP/TCP), using fast flooding for rapid convergence, and dividing large ASes into areas to limit the scope of topology flooding.

## Explanation

OSPF routers flood **Link-State Advertisements (LSAs)** to every router in the Autonomous System (AS), not just neighbors. LSAs are carried directly in IP datagrams (protocol number 89), bypassing TCP and UDP. This makes OSPF self-contained and fast — it doesn't wait for transport-layer timers. Each router builds a complete topology map from the LSA database and runs Dijkstra to compute the shortest-path tree and forwarding table.

OSPF supports multiple link cost metrics simultaneously (e.g., cost based on bandwidth, delay, or hop count) and can compute separate shortest-path trees for different types of service.

For large networks, OSPF supports **hierarchical areas**: the AS is divided into areas, each with its own OSPF topology and flooding. **Area Border Routers (ABRs)** sit at the boundary between areas and advertise summary routes between them. The **backbone area (Area 0)** is the hub — all inter-area traffic passes through it. This two-level hierarchy drastically reduces the number of LSAs each router must store and process.

OSPF also supports **authentication** (routers verify neighbors' identity before accepting LSAs), multiple shortest paths of equal cost (ECMP — traffic is load-balanced across them), and fast reroute for failure recovery.

## Key Points

- OSPF: link-state, intra-AS (IGP), open standard (RFC 2328)
- LSAs flooded to all routers in the AS; carried directly over IP (protocol 89)
- Each router runs Dijkstra on the complete topology database
- Hierarchical areas: local flooding within area, summary routes between areas
- Area 0 (backbone): all inter-area traffic must pass through it
- Area Border Routers (ABRs): summarize and advertise inter-area routes
- Supports authentication, ECMP, and multiple metrics

## Example

A large ISP divides its network into Area 0 (backbone, 20 routers), Area 1 (east, 30 routers), and Area 2 (west, 25 routers). Routers inside Area 1 only flood LSAs to the other 29 Area 1 routers + its ABRs — not to the 45 routers in Areas 0 and 2. The ABRs advertise area summaries into the backbone. Each router stores ~30 LSAs, not 75, making Dijkstra computation much faster.

> [!recall] Why does OSPF use hierarchical areas, and what is the role of the backbone area (Area 0)?

## See Also

- [[link-state-routing-dijkstra|Link-State Routing Uses Dijkstra's Algorithm on a Global Topology Map]]
- [[bgp-inter-as-routing|BGP Is the Inter-AS Routing Protocol That Connects the Internet's Autonomous Systems]]
- [[network-layer-data-vs-control-plane|The Network Layer Has Two Planes — Data Plane Forwards, Control Plane Routes]]
